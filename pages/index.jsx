import isShopAvailable from "@/utils/middleware/isShopAvailable";
import { Card, Layout, Page, Text, VerticalStack } from "@shopify/polaris";
import { useRouter } from "next/router";

//On first install, check if the store is installed and redirect accordingly
export async function getServerSideProps(context) {
  return await isShopAvailable(context);
}

const HomePage = () => {
  const router = useRouter();

  return (
    <>
      <Page>
        <Layout>
          <Layout.Section fullWidth>
            <Card>
              <VerticalStack gap="2">
                <Text as="h2" variant="headingMd">
                  4080 Marketing Team
                </Text>
                <Text>
                  This app is developed by 4080 Marketing Team to validate the
                  redeem codes.
                </Text>
              </VerticalStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default HomePage;
