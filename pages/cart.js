import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const CartPage = () => {
  const { cartProducts, addProducts, removeProducts, clearCart } =
    useContext(CartContext);
  // console.log(cartProducts);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    // if (typeof window === "undefined") {
    //   return;
    // }
    if (window?.location.href.includes("success")) {
      // console.log("useEffect execute");
      setIsSuccess(true);
      clearCart();
      // !!! You must be clear a local storage if you did not, when you refresh your web in Homepage, items still show in your cart
      localStorage.clear();
    }
  }, []);

  const addQuantity = (id) => {
    addProducts(id);
  };

  const lessQuantity = (id) => {
    removeProducts(id);
  };

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      // console.log(response.data.url);
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <div className="bg-white rounded-lg p-7 mt-20 text-center">
            <h1>Thanks for your order!</h1>
            <p>We will email you when your order will be sent.</p>
          </div>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        {!cartProducts.length && (
          <div className="bg-white rounded-lg p-7 mt-20 text-center">
            Your cart is empty
          </div>
        )}

        {/* !! <= 2 of this do convert to boolean */}
        {!!cartProducts.length && (
          <div className="flex flex-col md:grid grid-cols-3 gap-5 mt-20">
            <div className="col-span-2 bg-white rounded-lg p-7">
              <h2>Cart</h2>
              {products.length > 0 && (
                <table className="w-full mt-4">
                  <thead className="text-center uppercase text-gray-400 text-sm">
                    <tr>
                      <th className="text-left">Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="flex items-center mt-2">
                          <div className="w-28 border rounded-lg flex justify-center mr-3 mb-2">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="max-h-20 p-1"
                            />
                          </div>
                          {product.title}
                        </td>
                        <td>
                          <div className="flex items-center justify-center">
                            <button
                              className="text-gray-400 p-2"
                              onClick={() => lessQuantity(product._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                            <button
                              className="text-gray-400 p-2"
                              onClick={() => addQuantity(product._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="text-center">
                          $
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-top">
                      <td></td>
                      <td></td>
                      <td className="flex justify-center text-xl italic font-bold">
                        ${total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            <div className="bg-white rounded-lg p-7">
              {/* <form
                method="POST"
                action="/api/checkout"
              > */}
              <h2 className="text-center mb-2">Order information</h2>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="PostalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <Input
                type="text"
                placeholder="StreetAddress"
                name="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {/* <input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              /> */}
              <button
                onClick={goToPayment}
                // type="submit"
                className="bg-blue-500 w-full flex justify-center mt-3 text-white"
              >
                Continue to payment
              </button>
              {/* </form> */}
            </div>
          </div>
        )}
      </Center>
    </>
  );
};

export default CartPage;
