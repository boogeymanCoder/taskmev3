import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Products = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  useEffect(() => {
    if (!user && !userLoading) router.push("/login");
  }, [user, userLoading]);

  return (
    <>
      <Head>
        <title>Products | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;