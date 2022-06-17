import fs from "fs/promises";
import path from "path";

const ProductDetailPage = ({ loadedProduct }) => {
  const { title, description } = loadedProduct;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps({ params }) {
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((product) => {
    return product.id === productId;
  });
  if (!product) {
    return { notFound: true };
  }
  return {
    props: { loadedProduct: product },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => {
    return product.id;
  });
  const pathWithParams = ids.map((id) => {
    return { params: { pid: id } };
  });
  return {
    paths: pathWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
