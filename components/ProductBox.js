import Link from "next/link";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductBox = ({ _id, title, description, price, images }) => {
  const { addProducts } = useContext(CartContext);
  const url = "/product/" + _id;

  return (
    <div className="flex flex-col">
      <div className="bg-white w-full h-40 flex justify-center items-center rounded-lg">
        <Link href={url}>
          <img
            src={images[0]}
            alt="image"
            className="w-full h-36 object-contain p-3 transform transition duration-500 hover:scale-110"
          />
        </Link>
      </div>
      <Link
        href={url}
        className="text-xl mt-2"
      >
        {title}
      </Link>
      <div className="mt-2 flex justify-between items-center gap-2">
        <span className="text-xl font-bold italic">${price}</span>
        <button
          className="text-sm text-blue-500 border border-blue-500"
          onClick={() => addProducts(_id)}
        >
          <CartIcon />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductBox;
