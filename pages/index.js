import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import {mongooseConnect} from "@/libs/mongoose";
import {Product} from "@/models/Product";

export const getServerSideProps = async () => {
  const featuredProductId = '64922d3b2fe5ef77c576c0d8';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    }
  };
};

const HomePage = ({featuredProduct, newProducts}) => {
  // console.log({featuredProduct});
  // console.log({newProduct});
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
};

export default HomePage;