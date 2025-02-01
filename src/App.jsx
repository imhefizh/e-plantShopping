// eslint-disable-next-line no-unused-vars
import React from "react";
import ProductList from "./ProductList";
import "./App.css";
import AboutUs from "./AboutUs";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowProduct } from "./CartSlice";

function App() {
  const dispatch = useDispatch();
  const toggleStatus = useSelector((state) => state.cart.showProducts);

  const handleGetStartedClick = () => {
    dispatch(toggleShowProduct());
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${toggleStatus ? "fade-out" : ""}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>

            <button
              className="get-started-button"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>
      <div
        className={`product-list-container ${toggleStatus ? "visible" : ""}`}
      >
        <ProductList />
      </div>
    </div>
  );
}

export default App;
