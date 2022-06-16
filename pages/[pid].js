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

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: "p1",
        },
      },
      {
        params: {
          pid: "p2",
        },
      },
      {
        params: {
          pid: "p3",
        },
      },
    ],
    fallback: true,
    // fallback: "blocking",
  };
}

export default ProductDetailPage;
