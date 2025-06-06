import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Footer from "./Footer";
import Nav from "./Nav";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/api/products/${id}/`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center my-5">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className=" py-5" style={{ backgroundColor: "#fdf7f0" }}>
        <div className="card mx-auto shadow-lg p-4 rounded-4" style={{ maxWidth: "900px", border: "none" }}>
          <div className="row g-4 align-items-center">
            {/* Image Section */}
            <div className="col-md-5 text-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="img-fluid rounded-4"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              ) : (
                <div className="bg-light border rounded-4 d-flex align-items-center justify-content-center" style={{ height: "300px" }}>
                  <span className="text-muted">No Image Available</span>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="col-md-7">
              <h2 className="fw-bold" style={{ color: "#492009" }}>
                {product.product_name}
              </h2>
              <p className="mb-1">
                <strong>Brand:</strong> {product.brands || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Category:</strong> {product.main_category || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Quantity:</strong> {product.quantity || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Stores:</strong> {product.stores || "N/A"}
              </p>
              <p className="mb-1">
                <strong>Countries:</strong> {product.countries || "N/A"}
              </p>

              {product.ingredients_text && (
                <p className="mt-3">
                  <strong>Ingredients:</strong> {product.ingredients_text}
                </p>
              )}
            </div>
          </div>

          {/* Nutrition Section */}
          <div className="mt-4">
            <h4 className="fw-semibold mb-3" style={{ color: "#492009" }}>
              Nutritional Information (per 100g)
            </h4>
            <div className="row row-cols-2 row-cols-md-3 g-3">
              {[
                { label: "Energy", value: product.energy_100g, unit: "kJ" },
                { label: "Fat", value: product.fat_100g, unit: "g" },
                { label: "Sugars", value: product.sugars_100g, unit: "g" },
                { label: "Fiber", value: product.fiber_100g, unit: "g" },
                { label: "Salt", value: product.salt_100g, unit: "g" },
                { label: "Saturated Fat", value: product.saturated_fat_100g, unit: "g" },
              ].map((item, index) => (
                <div key={index} className="col">
                  <div className="p-3 border rounded-3 text-center bg-white">
                    <strong>{item.label}</strong>
                    <div style={{ color: "#ffbe76", fontWeight: "bold", fontSize: "1.1rem" }}>
                      {item.value !== null && item.value !== "" ? `${item.value} ${item.unit}` : "N/A"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
