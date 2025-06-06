import React from 'react';
import img1 from '../assets/image1.webp';
import img2 from '../assets/image2.webp';
import img3 from '../assets/image3.webp';
import img4 from '../assets/image4.webp';

function Album() {
  const images = [
    { src: img1, text: "Fresh & Organic Choices" },
    { src: img2, text: "Know What You Eat" },
    { src: img3, text: "Smart Food Discovery" },
    { src: img4, text: "Tailored for Your Taste" }
  ];

  return (
    <div className="container album-section">
      <div className="row">
        {images.map((img, index) => (
          <div key={index} className="col-md-4 col-lg-3 album-image-wrapper px-3">
            <img src={img.src} alt={`Image ${index + 1}`} className="album-image" />
            <div className="album-overlay">
              {img.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Album;
