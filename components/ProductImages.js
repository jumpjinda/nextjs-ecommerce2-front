import { useState } from "react";

const ProductImages = ({ images }) => {
  const BigImage = "max-h-52 p-3 cursor-pointer";
  // console.log(images);
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img
          src={activeImage}
          alt=""
          className={BigImage}
        />
      </div>
      <div className="flex justify-center gap-3">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt=""
              className={
                "max-h-20 p-2 mt-2 cursor-pointer transform transition duration-500 hover:scale-110"
              }
              onClick={() => setActiveImage(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
