import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/libs/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";

export const getServerSideProps = async (context) => {
  await mongooseConnect();
  // console.log(context.query);
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

const ProductPage = ({ product }) => {
  const { addProducts } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <div className="grid grid-cols-2 mt-10 gap-10">
          <div className="w-50 h-80 bg-white border rounded-lg flex items-center justify-center mr-3 mb-2 ">
            <ProductImages images={product.images} />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="">{product.title}</h1>
            <p>{product.description}</p>
            <div>
              <span className="text-2xl mr-5">${product.price}</span>
              <button
                className="bg-blue-500 text-sm text-white mt-2"
                onClick={() => addProducts(product._id)}
              >
                <CartIcon />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Center>
    </>
  );
};

export default ProductPage;
