import React from 'react';
import './GridGallery.css';

const GridGallery = ({ images, handleClick }) => {
  return (
    <div className="grid-gallery">
      {images.map((image, index) => (
        <div className={`grid-item`} key={index}>
          <img src={image?.url} alt={''} onClick={() => handleClick(image?.url)}/>
        </div>
      ))}
    </div>
  );
};

export default GridGallery;