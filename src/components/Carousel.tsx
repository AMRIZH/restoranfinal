'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const images = [
    '/images/DisplayMenu1.png',
    '/images/DisplayMenu2.png',
    '/images/DisplayMenu3.png',
    '/images/DisplayMenu4.png',
    '/images/DisplayMenu5.png',
    '/images/DisplayMenu6.png',
    '/images/DisplayMenu7.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slower transition speed (1 second)
    autoplay: true,
    autoplaySpeed: 3000, // Delay between transitions (3 seconds)
    slidesToShow: 1, // Show 1 image at a time
    slidesToScroll: 1, // Scroll 1 image at a time
    centerMode: true,  // Ensures the center image gets more focus
    focusOnSelect: true,  // Allows the user to click to select a slide
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={image}
              alt={`Menu Image ${index + 1}`}
              className="w-full h-[350px] object-cover"  // Adjusted width to full
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;