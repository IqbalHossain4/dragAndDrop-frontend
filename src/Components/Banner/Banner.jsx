import React, { useState, useEffect } from "react";
import imageOne from "/src/assets/img(1).jpg";
import imageTwo from "/src/assets/img(2).jpg";
const images = [imageOne, imageTwo];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Manage Image and Image Change Time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 mt-24 mb-28  bg-black ">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-0 left-0 w-full h-full p-4 bg-black bg-opacity-30">
        <div className="ps-16 pt-16">
          <h1 className="md:text-6xl text-xl font-[600] text-white">
            Upload Your Favorite Font
          </h1>
          <h2 className="text-md text-white my-4 md:w-1/2 w-3/4 md:text-sm text-[12px]">
            If you want to Upload any Font to the TTF file system, You can
            easily Upload it in Tech Charm. The Tech Charm Provides you best
            services. I hope if you use it you won't be unsatisfied. If you have
            any queries you can feel free to ask about us.
          </h2>
          <button className="mt-4 bg-[#7BFF29]  text-black text-[18px] font-[600] duration-200 hover:bg-black hover:border border-[#7BFF29] hover:text-[#7BFF29] md:py-2 py-1 md:px-4  px-2 rounded-lg ">
            Learn More!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
