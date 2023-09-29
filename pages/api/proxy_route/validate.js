// If you have the recommended extension installed, create a new page and type `createproxy` to generate proxy route boilerplate

import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

const handler = async (req, res) => {
  const { client, session } = await clientProvider.offline.restClient({
    shop: req.user_shop,
  });
  const {
    body: { price_rules },
  } = await client.get({
    path: "price_rules",
  });

  let exists = false;

  for (let PriceRule of price_rules) {
    const priceRuleId = PriceRule.id;
    const {
      body: { discount_codes },
    } = await client.get({
      path: `price_rules/${priceRuleId}/discount_codes`,
    });
    for (let discount of discount_codes) {
      if (discount.code === req.body) {
        exists = true;
        break;
      }
    }

    if (exists) {
      break;
    }
  }

  res.status(200).json({
    success: exists,
    content: exists ? "Discount Code is Valid" : "Discount Code is Invalid",
  });
};
export default withMiddleware("verifyProxy")(handler);
