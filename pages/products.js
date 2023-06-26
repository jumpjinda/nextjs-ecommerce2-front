import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/libs/mongoose";
import { Product } from "@/models/Product";

export const getServerSideProps = async () => {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  // console.log(products);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

const ProductsPage = ({ products }) => {
  console.log({ products });
  return (
    <>
      <Header />
      <Center>
        <h1 className="pt-5 mt-16">All Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 py-5">
          {products.length > 0 &&
            products.map((product) => (
              <ProductBox
                {...product}
                key={product._id}
              />
            ))}
        </div>
      </Center>
    </>
  );
};

export default ProductsPage;
