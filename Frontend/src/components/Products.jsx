import React from "react";
import { useParams } from "react-router-dom";  // Import useParams from react-router-dom
import Nav from "./Nav";
import ProductsList from './ProductsList';
import Footer from "./Footer";
function Products() {
    return (
        <>
            <Nav />
            <ProductsList></ProductsList>
            <Footer />
        </>
    );
}

export default Products;

