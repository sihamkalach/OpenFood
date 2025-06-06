import { useState } from "react";
import Navbar from "./Nav";
import Footer from "./Footer";
import image_form from "../assets/contact_img.webp";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message from ${formData.name} has been submitted!`);
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#f4f6fc", padding: "60px 0" }}>
        <div
          className="container d-flex flex-column flex-lg-row bg-white shadow rounded-4 overflow-hidden w-75 mx-auto"
          style={{ minHeight: "450px" }}
        >
          {/* Image Section */}
          <div className="col-lg-4 p-0 d-flex align-items-center">
            <img
              src={image_form}
              alt="Contact"
              className="img-fluid rounded-start"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                maxHeight: "450px",
                boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Form Section */}
          <div className="col-lg-8 p-5 d-flex flex-column justify-content-center">
            <h2
              className="mb-4 text-center fw-bold"
              style={{ color: "#c90000" }}
            >
              Contact Us
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label"
                  style={{ color: "#121212" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill px-4 py-2"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  style={{
                    backgroundColor: "#fff",
                    color: "#492009",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ color: "#121212" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-pill px-4 py-2"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  style={{
                    backgroundColor: "#fff",
                    color: "#492009",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="form-label"
                  style={{ color: "#121212" }}
                >
                  Message
                </label>
                <textarea
                  className="form-control rounded-4 px-4 py-3"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  style={{
                    backgroundColor: "#fff",
                    color: "#492009",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn w-100 py-2 rounded-pill fw-bold"
                style={{
                  backgroundColor: "#c90000",
                  color: "#fff",
                  fontSize: "16px",
                  letterSpacing: "0.5px",
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
