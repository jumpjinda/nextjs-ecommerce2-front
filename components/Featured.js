import Link from "next/link";
import Center from "./Center";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Featured = ({ product }) => {
  const { addProducts } = useContext(CartContext);
  const addFeaturedToCart = () => {
    addProducts(product._id);
  };

  return (
    <div className="bg-zinc-900 text-white py-12 mt-12">
      <Center>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex items-center">
            <div>
              <h1 className="m-0 font-normal text-4xl">{product.title}</h1>
              <p className="text-sm text-gray-400 mt-5">
                {product.description}
              </p>
              <div className="flex gap-2.5 mt-6">
                <Link href={"/products/" + product._id}>
                  <button className="border border-solid  border-white text-sm">
                    Read more
                  </button>
                </Link>
                <button
                  className="bg-blue-500 text-xs md:text-sm"
                  onClick={addFeaturedToCart}
                >
                  <CartIcon className="hidden md:block" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="max-w-full"
              src="https://nextjs-ecommerce2.s3.amazonaws.com/1687302128207.png"
              alt="Macbook"
            />
          </div>
        </div>
      </Center>
    </div>
  );
};

export default Featured;
