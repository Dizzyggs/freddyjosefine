import React from 'react';
import './GridGallery.css';

const GridGallery = ({ imageUrls, handleClick }) => {
  return (
    <div className="grid-gallery">
      {imageUrls.map((url, index) => (
        <div className={`grid-item`} key={index}>
          <img src={url} alt={''} onClick={() => handleClick(url)}/>
        </div>
      ))}
    </div>
  );
};

export default GridGallery;