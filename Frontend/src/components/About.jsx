import React from "react";
import img1 from '../assets/image5.webp';
import img2 from '../assets/image6.jpeg';
import img3 from '../assets/image7.jpeg';
import img4 from '../assets/image8.webp';
import Footer from "./Footer";
import Nav from "./Nav";

export default function About() {
  return (
    <>
      <Nav />
      <div className="about text-center py-5" style={{ backgroundColor: '#f4f6fc', color: '#121212' }}>
        <div className="container">
          {/* Title and Introduction */}
          <h2 className="mb-4 fw-bold" style={{ fontSize: "2.5rem", color: '#492009' }}>
            Nourishing Your Life with Quality & Care
          </h2>
          <p className="text mb-5" style={{ fontSize: "1.1rem", color: '#492009' }}>
            At <strong>Open Food</strong>, we believe that good food is the foundation of a happy life.
            Our mission is to provide fresh, healthy, and delicious products tailored to your lifestyle and taste.
          </p>

          {/* Text + Image Section */}
          <div className="row">
            {/* Text Section */}
            <div className="col-md-6 px-5 text-start pt-5">
              <h3 className="fw-semibold mb-3" style={{ color: '#492009' }}>Who We Are</h3>
              <p style={{ color: '#121212' }}>
                Open Food is dedicated to sourcing the finest food products from trusted producers.
                We combine quality, sustainability, and innovation to bring you a curated selection that supports a healthier lifestyle.
              </p>
              <h3 className="fw-semibold mb-3" style={{ color: '#492009' }}>Join Our Community</h3>
              <p style={{ color: '#121212' }}>
                Whether you're looking for organic fruits, artisanal products, or everyday essentials, Open Food helps you make mindful choices.
                Explore our offerings and enjoy fresh food delivered to your doorstep.
              </p>
            </div>

            {/* Image Section */}
            <div className="col-md-6">
              <div className="row g-3">
                {[img1, img2, img3, img4].map((src, idx) => (
                  <div
                    className={`col-6 ${idx >= 2 ? 'mt-5' : ''}`}
                    key={idx}
                  >
                    <img
                      src={src}
                      alt={`Food Inspiration ${idx + 1}`}
                      className="img-fluid rounded shadow-lg"
                      style={{ filter: 'brightness(100%)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
