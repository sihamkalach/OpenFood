import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import api from "../api";
import { Link } from "react-router-dom";

function RecipeProducts() {
  const [recipeInput, setRecipeInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [sugarLevels, setSugarLevels] = useState([]);
  const [saltLevels, setSaltLevels] = useState([]);
  const [fiberLevels, setFiberLevels] = useState([]);
  const [energyLevels, setEnergyLevels] = useState([]);
  const [alcoholPresences, setAlcoholPresences] = useState([]);
  const [cholesterolLevels, setCholesterolLevels] = useState([]);

  const [selectedSugarLevel, setSelectedSugarLevel] = useState("");
  const [selectedSaltLevel, setSelectedSaltLevel] = useState("");
  const [selectedFiberLevel, setSelectedFiberLevel] = useState("");
  const [selectedEnergyLevel, setSelectedEnergyLevel] = useState("");
  const [selectedAlcoholPresence, setSelectedAlcoholPresence] = useState("");
  const [selectedCholesterolLevel, setSelectedCholesterolLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [page, setPage] = useState(1);

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const res = await api.get("/api/filters/");
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
    }
    fetchFilters();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/recommendation/", {
        recipe_input: recipeInput,
        category: selectedCategory,
        country: selectedCountry,
        sugar_level: selectedSugarLevel,
        salt_level: selectedSaltLevel,
        fiber_level: selectedFiberLevel,
        energy_level: selectedEnergyLevel,
        alcohol_presence: selectedAlcoholPresence,
        cholesterol_level: selectedCholesterolLevel,
      });

      console.log(res.data);
      setRecommendations(res.data.recommendations); // stocker les recommandations dans un state
    } catch (err) {
      console.error("Error sending recommendation request:", err);
    }
  };
  return (
    <>
      <Nav />
      <div className="py-5 px-5" style={{ backgroundColor: "#f4f6fc", minHeight: "100vh" }}>
        <h2 className="mb-4 fw-bold" style={{ color: "#492009", textAlign: "center" }}>
          Enter your recipe and select filters
        </h2>

        {/* Recipe input */}
        <div className="mb-4" style={{ maxWidth: 600, margin: "0 auto" }}>
          <label htmlFor="recipeInput" className="form-label fw-bold" style={{ color: "#492009" }}>
            Enter your recipe or ingredients
          </label>
          <textarea
            id="recipeInput"
            className="form-control"
            rows={4}
            placeholder="Type your recipe or ingredients here..."
            value={recipeInput}
            onChange={(e) => setRecipeInput(e.target.value)}
            style={{ borderColor: "#492009" }}
          />
        </div>

        {/* Filters */}
        <aside
          style={{
            margin: "0 auto",
            padding: "1rem",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(73, 32, 9, 0.15), 0 0 10px rgba(73, 32, 9, 0.1)",
          }}
        >
          <h5 style={{ color: "#492009", marginBottom: "1rem" }}>Filters</h5>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              padding: "1rem",
              justifyContent: "center",
            }}
          >
            {/* Country filter */}
            <div style={{ minWidth: 150 }}>
              <label htmlFor="countrySelect" className="form-label" style={{ color: "#492009" }}>
                Country
              </label>
              <select
                id="countrySelect"
                className="form-select"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setPage(1);
                }}
                style={{ borderColor: "#492009" }}
              >
                <option value="">All</option>
                {countries.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Repeat for sugar, salt, fiber, energy, alcohol, cholesterol filters... */}
            {/* Sugar */}
            <div style={{ minWidth: 120 }}>
              <label htmlFor="sugarLevelSelect" className="form-label" style={{ color: "#492009" }}>
                Sugar Level
              </label>
              <select
                id="sugarLevelSelect"
                className="form-select"
                value={selectedSugarLevel}
                onChange={(e) => {
                  setSelectedSugarLevel(e.target.value);
                  setPage(1);
                }}
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
            <div style={{ minWidth: 120 }}>
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
                onChange={(e) => {
                  setSelectedSaltLevel(e.target.value);
                  setPage(1);
                }}
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
            <div style={{ minWidth: 120 }}>
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
                onChange={(e) => {
                  setSelectedFiberLevel(e.target.value);
                  setPage(1);
                }}
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
            <div style={{ minWidth: 120 }}>
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
                onChange={(e) => {
                  setSelectedEnergyLevel(e.target.value);
                  setPage(1);
                }}
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
            <div style={{ minWidth: 120 }}>
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
                onChange={(e) => {
                  setSelectedAlcoholPresence(e.target.value);
                  setPage(1);
                }}
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
            <div style={{ minWidth: 120 }}>
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
                onChange={(e) => {
                  setSelectedCholesterolLevel(e.target.value);
                  setPage(1);
                }}
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

          </div>
        </aside>

        {/* Bouton d'envoi */}
        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2"
            style={{ backgroundColor: "#492009", borderColor: "#492009" }}
            onClick={handleSubmit}
          >
            Find Similar Products
          </button>
        </div>

        {/* Recommended Products */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
          {recommendations.length === 0 ? (
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
              <p>No recommended products found.</p>
              <p>Please revise your recipe or filters and try again.</p>
            </div>
          ) : (
            <>
              <h4 style={{ color: "#492009", fontWeight: "700", marginBottom: "1.5rem" }}>
                Recommended Products
              </h4>
              <div className="row">
                {recommendations.map((product, idx) => (
                  <div key={idx} className="col-md-4 mb-4">
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
                          to={`/product/${product.code}`} // Assure-toi que `code` est bien l’identifiant
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
            </>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default RecipeProducts;

