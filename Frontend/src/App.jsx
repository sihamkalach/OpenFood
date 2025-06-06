import React from 'react';
import { BrowserRouter,Routes, Route ,Navigate} from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import Contact from './components/Contact';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from "react-toastify";
import RecipeProducts from './components/RecipeProducts';
function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer /> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/recipe/" element={<RecipeProducts />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
