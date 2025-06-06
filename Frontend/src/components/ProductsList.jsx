import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);

  // Dynamic filter options
  const [sugarLevels, setSugarLevels] = useState([]);
  const [saltLevels, setSaltLevels] = useState([]);
  const [fiberLevels, setFiberLevels] = useState([]);
  const [energyLevels, setEnergyLevels] = useState([]);
  const [alcoholPresences, setAlcoholPresences] = useState([]);
  const [cholesterolLevels, setCholesterolLevels] = useState([]);

  // Selected filter values
  const [selectedSugarLevel, setSelectedSugarLevel] = useState("");
  const [selectedSaltLevel, setSelectedSaltLevel] = useState("");
  const [selectedFiberLevel, setSelectedFiberLevel] = useState("");
  const [selectedEnergyLevel, setSelectedEnergyLevel] = useState("");
  const [selectedAlcoholPresence, setSelectedAlcoholPresence] = useState("");
  const [selectedCholesterolLevel, setSelectedCholesterolLevel] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      const params = {
        page,
        page_size: 20,
        category: selectedCategory,
        country: selectedCountry,
        search: searchTerm,
        sugar_level: selectedSugarLevel,
        salt_level: selectedSaltLevel,
        fiber_level: selectedFiberLevel,
        energy_level: selectedEnergyLevel,
        alcohol_presence: selectedAlcoholPresence,
        cholesterol_level: selectedCholesterolLevel,
      };
      const res = await api.get(`/api/products/`, { params });
      setProducts(res.data.products);
      console.log(res.data)
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await api.get("/api/filters/");
      setCategories(res.data.categories);
      setCountries(res.data.countries);
      setSugarLevels(res.data.sugar_levels);
      setSaltLevels(res.data.salt_levels);
      setFiberLevels(res.data.fiber_levels);
      setEnergyLevels(res.data.energy_levels);
      setAlcoholPresences(res.data.alcohol_presences);
      setCholesterolLevels(res.data.cholesterol_levels);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [
    page,
    selectedCategory,
    selectedCountry,
    searchTerm,
    selectedSugarLevel,
    selectedSaltLevel,
    selectedFiberLevel,
    selectedEnergyLevel,
    selectedAlcoholPresence,
    selectedCholesterolLevel,
  ]);

  return (
    <div
      className="py-5 px-5"
      style={{ backgroundColor: "#f4f6fc", minHeight: "100vh" }}
    >
      <h2
        className="mb-4 fw-bold"
        style={{ color: "#492009", textAlign: "center" }}
      >
        Product List
      </h2>

      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Left Filters */}
        <aside
          style={{
            flex: "0 0 280px",
            padding: "1rem",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow:
              "0 4px 8px rgba(73, 32, 9, 0.15), 0 0 10px rgba(73, 32, 9, 0.1)",
            height: "fit-content",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <h5 style={{ color: "#492009", marginBottom: "1rem" }}>Filters</h5>

          {/* Search */}
          <div className="mb-3">
            <label
              htmlFor="searchInput"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Search Products
            </label>
            <input
              id="searchInput"
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: "#492009" }}
            />
          </div>

          {/* Categories */}
          <div className="mb-3">
            <label
              htmlFor="categorySelect"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Categories
            </label>
            <select
              id="categorySelect"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ borderColor: "#492009" }}
            >
              <option value="">All Categories</option>
              {categories.map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Countries */}
          <div className="mb-3">
            <label
              htmlFor="countrySelect"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Countries
            </label>
            <select
              id="countrySelect"
              className="form-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{ borderColor: "#492009" }}
            >
              <option value="">All Countries</option>
              {countries.map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Filters */}

          {/* Sugar Level */}
          <div className="mb-3">
            <label
              htmlFor="sugarLevelSelect"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Sugar Level
            </label>
            <select
              id="sugarLevelSelect"
              className="form-select"
              value={selectedSugarLevel}
              onChange={(e) => setSelectedSugarLevel(e.target.value)}
              style={{ borderColor: "#492009" }}
            >
              <option value="">All</option>
              {sugarLevels.map((level, idx) => (
                <option key={idx} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Salt Level */}
          <div className="mb-3">
            <label
              htmlFor="saltLevelSelect"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Salt Level
            </label>
            <select
              id="saltLevelSelect"
              className="form-select"
              value={selectedSaltLevel}
              onChange={(e) => setSelectedSaltLevel(e.target.value)}
              style={{ borderColor: "#492009" }}
            >
              <option value="">All</option>
              {saltLevels.map((level, idx) => (
                <option key={idx} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Fiber Level */}
          <div className="mb-3">
            <label
              htmlFor="fiberLevelSelect"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Fiber Level
            </label>
            <select
              id="fiberLevelSelect"
              className="form-select"
              value={selectedFiberLevel}
              onChange={(e) => setSelectedFiberLevel(e.target.value)}
              style={{ borderColor: "#492009" }}
            >
              <option value="">All</option>
              {fiberLevels.map((level, idx) => (
                <option key={idx} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Energy Level */}
          <div className="mb-3">
            <label
              htmlFor="energyLevelSelect"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Energy Level
            </label>
            <select
              id="energyLevelSelect"
              className="form-select"
              value={selectedEnergyLevel}
              onChange={(e) => setSelectedEnergyLevel(e.target.value)}
              style={{ borderColor: "#492009" }}
            >
              <option value="">All</option>
              {energyLevels.map((level, idx) => (
                <option key={idx} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Alcohol Presence */}
          <div className="mb-3">
            <label
              htmlFor="alcoholPresenceSelect"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Alcohol Presence
            </label>
            <select
              id="alcoholPresenceSelect"
              className="form-select"
              value={selectedAlcoholPresence}
              onChange={(e) => setSelectedAlcoholPresence(e.target.value)}
              style={{ borderColor: "#492009" }}
            >
              <option value="">All</option>
              {alcoholPresences.map((presence, idx) => (
                <option key={idx} value={presence}>
                  {presence}
                </option>
              ))}
            </select>
          </div>

          {/* Cholesterol Level */}
          <div className="mb-3">
            <label
              htmlFor="cholesterolLevelSelect"
              className="form-label"
              style={{ color: "#492009" }}
            >
              Cholesterol Level
            </label>
            <select
              id="cholesterolLevelSelect"
              className="form-select"
              value={selectedCholesterolLevel}
              onChange={(e) => setSelectedCholesterolLevel(e.target.value)}
              style={{ borderColor: "#492009" }}
            >
              <option value="">All</option>
              {cholesterolLevels.map((level, idx) => (
                <option key={idx} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Right Products */}
        <section style={{ flex: 1 }}>
          {products.length === 0 ? (
            <div
              className="no-results"
              style={{
                padding: "4rem",
                textAlign: "center",
                color: "#492009",
                fontWeight: "600",
                fontSize: "1.5rem",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow:
                  "0 4px 8px rgba(73, 32, 9, 0.15), 0 0 10px rgba(73, 32, 9, 0.1)",
              }}
            >
              <p>No products match your selected filters.</p>
              <p>Please try adjusting your filter options.</p>
            </div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  {/* Product card */}
                  <div
                    className="card h-100 border-0 shadow rounded-4"
                    style={{ backgroundColor: "#121212", color: "#f4f6fc" }}
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        className="card-img-top rounded-top-4"
                        alt={product.product_name}
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                    ) : (
                      <div
                        className="card-img-top d-flex align-items-center justify-content-center bg-secondary rounded-top-4"
                        style={{ height: "200px" }}
                      >
                        <span style={{ color: "#ddd" }}>No Image</span>
                      </div>
                    )}
                    <div className="card-body">
                      <h5 style={{ color: "#ffbe76" }}>{product.product_name}</h5>
                      <p style={{ color: "#d7cfc3" }}>{product.brands}</p>
                      <Link
                        to={`/product/${product.code}`}
                        className="btn"
                        style={{
                          backgroundColor: "#492009",
                          color: "#f4f6fc",
                          fontWeight: "600",
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {products.length > 0 && (
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-secondary mx-2"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </button>
              <span className="mx-3" style={{ color: "#492009" }}>
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-secondary mx-2"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProductsList;
