import Link from "next/link";
import Center from "./Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const [responsive, setResponsive] = useState("hidden");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu === true) {
      setResponsive(
        "flex flex-col fixed right-0 top-0 gap-2 bg-zinc-700 pt-5 pl-16 pr-10 h-full z-10 text-right",
      );
    } else {
      setResponsive("hidden");
    }
  }, [showMenu]);

  return (
    <div className="bg-zinc-900 fixed top-0 w-full h-16 z-50">
      <Center>
        <div className="flex justify-between py-5 text-white">
          <Link href={"/"}>Ecommerce</Link>
          <div className="sm:hidden absolute right-20">
            <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
          </div>
          <nav className={"sm:flex sm:gap-4 text-gray-300 " + responsive}>
            {showMenu && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute top-5 right-36 z-20 cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>All products</Link>
            <Link href={"/categories"}>Categories</Link>
            <Link href={"/account"}>Account</Link>
            <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
          </nav>
          <button className="block sm:hidden p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => setShowMenu(!showMenu)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </Center>
    </div>
  );
};

export default Header;
