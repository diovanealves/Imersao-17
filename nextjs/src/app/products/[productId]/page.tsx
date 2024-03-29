import { Product } from "@/models";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/legacy/image";
import { QuantityForm } from "./QuantityForm";

const product: Product = {
  id: "1",
  name: "Product 1",
  description: "1",
  price: 1000,
  category_id: "1",
  image_url: "https://source.unsplash.com/random?product",
};
async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <Grid2 container spacing={2}>
      <Grid2
        xs={12}
        md={7}
        position={"relative"}
        sx={{ height: { xs: "360px", md: "unset" } }}
      >
        <Image
          src={product.image_url}
          layout="fill"
          objectFit="cover"
          priority
          alt={product.name}
        />
      </Grid2>
      <Grid2 xs={12} md={5}>
        <Typography variant="h4">{product.name}</Typography>
        <Box
          mt={2}
          sx={{
            color: "primary.main",
            display: "flex",
          }}
        >
          <DescriptionIcon />
          <Typography variant="button">Descrição</Typography>
        </Box>
        <Typography sx={{ mt: 2, ml: 3 }}>{product.description}</Typography>
        <Box
          mt={2}
          sx={{
            color: "primary.main",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocalOfferIcon />
          <Typography variant="button">Preço</Typography>
        </Box>
        <Typography sx={{ mt: 2, ml: 3 }}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </Typography>
        <Card sx={{ mt: 1 }} raised={true}>
          <CardContent>
            <QuantityForm product={product} />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default ProductDetailPage;
