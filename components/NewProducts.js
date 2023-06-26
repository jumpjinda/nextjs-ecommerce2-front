import Center from "./Center";
import ProductBox from "./ProductBox";

const NewProducts = ({ products }) => {
  // console.log(products);
  return (
    <Center>
      <h1 className="pt-5">New Arrivals</h1>
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
  );
};

export default NewProducts;
