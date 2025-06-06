import React from "react";
import { assets } from "../assets/assets";

function Policy() {
  function handleSubmit(e) {
    e.preventDefault();
    // handle subscription
  }

  return (
    <>
      {/* Key Features Section */}
      <div
        style={{ backgroundColor: "#f4f6fc", color: "#121212" }}
        className="py-5"
      >
        <div className="row text-center container mx-auto">
          <div className="col-12 col-sm-4 mb-4 mb-sm-0">
            <img
              src={assets.exchange_icon}
              className="img-fluid mb-3"
              alt="Verified Products"
              width="50"
              style={{ filter: 'none' }}
            />
            <p className="fw-bold" style={{ color: "#492009" }}>
              Verified Ingredients
            </p>
            <p>
              All data is based on Open Food Facts verified sources.
            </p>
          </div>
          <div className="col-12 col-sm-4 mb-4 mb-sm-0">
            <img
              src={assets.quality_icon}
              className="img-fluid mb-3"
              alt="Transparency Icon"
              width="50"
              style={{ filter: 'none' }}
            />
            <p className="fw-bold" style={{ color: "#492009" }}>
              Nutritional Transparency
            </p>
            <p>Know what’s inside every food item you explore.</p>
          </div>
          <div className="col-12 col-sm-4">
            <img
              src={assets.support_img}
              className="img-fluid mb-3"
              alt="Support Icon"
              width="50"
              style={{ filter: 'none' }}
            />
            <p className="fw-bold" style={{ color: "#492009" }}>
              Community Support
            </p>
            <p>
              Built with open data, powered by a growing food-aware community.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div
        style={{ backgroundColor: "#f4f6fc", color: "#121212" }}
        className="text-center py-5"
      >
        <h1 className="mb-3 fw-semibold">
          Subscribe to{" "}
          <span style={{ color: "#492009", fontWeight: "700" }}>
            healthy food insights
          </span>
        </h1>
        <p className="mb-4">
          Get updates on nutrition, product alerts, and food awareness tips.
        </p>
        <form
          onSubmit={handleSubmit}
          className="row justify-content-center align-items-center g-3 container mx-auto"
        >
          <div className="col-auto">
            <input
              required
              type="email"
              className="form-control rounded-pill px-4"
              placeholder="Your email address"
              style={{
                backgroundColor: "#fff",
                color: "#492009",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn rounded-pill px-4 text-uppercase"
              style={{
                backgroundColor: "#ffbe76",
                border: "none",
                color: "#492009",
                fontWeight: "700",
              }}
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Policy;
