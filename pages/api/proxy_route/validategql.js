// If you have the recommended extension installed, create a new page and type `createproxy` to generate proxy route boilerplate

import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

const handler = async (req, res) => {
  const { client } = await clientProvider.offline.graphqlClient({
    shop: req.user_shop,
  });

  const p = `query GetProducts($first: Int!) {
    products (first: $first) {
      edges {
        node {
          id
          title
          descriptionHtml
        }
      }
    }
  }`;

  const q = `query MyQuery($code: String = null) {
    codeDiscountNodeByCode(code: $code) {
      id
      codeDiscount {
        ... on DiscountCodeApp {
          endsAt
          status
          recurringCycleLimit
        }
        ... on DiscountCodeBasic {
          endsAt
          status
        }
        ... on DiscountCodeBxgy {
          endsAt
          usageLimit
          status
        }
        ... on DiscountCodeFreeShipping {
          endsAt
          status
        }
      }
    }
  }
  `;
  const response = await client.query({
    data: {
      query: q,
      variables: {
        code: req.body,
      },
    },
  });
  const codeStatus =
    response.body.data.codeDiscountNodeByCode.codeDiscount.status;
  console.log(
    response.body.data.codeDiscountNodeByCode.codeDiscount,
    "====================="
  );

  let exists = codeStatus === "ACTIVE" ? true : false;

  res.status(200).json({
    success: exists,
    content: exists ? "Discount Code is Valid" : "Discount Code is Invalid",
  });
};
export default withMiddleware("verifyProxy")(handler);
