import fs from "fs/promises";
import path from "path";

const ProductDetailPage = ({ loadedProduct }) => {
  const { title, description } = loadedProduct;
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export async function getStaticProps({ params }) {
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => {
    return product.id === productId;
  });

  return {
    props: { loadedProduct: product },
  };
}

export default ProductDetailPage;