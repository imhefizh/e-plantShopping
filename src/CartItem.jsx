/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateCartStatus, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    if (cart.length != 0) {
      const pricesOnCart = cart.map(
        (item) => item.cost.substr(1) * item.quantity
      );
      const TotalAmount = pricesOnCart.reduce((total, num) => (total += num));
      return TotalAmount;
    } else {
      return "0";
    }
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    const setQuantity = item.quantity + 1;
    const updatedItem = { ...item, quantity: setQuantity };
    dispatch(updateQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const setQuantity = item.quantity - 1;
      const updatedItem = { ...item, quantity: setQuantity };
      dispatch(updateQuantity(updatedItem));
    } else {
      dispatch(removeItem(item));
      dispatch(updateCartStatus(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    dispatch(updateCartStatus(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const total = item.cost.substr(1) * item.quantity;
    return total;
  };

  const calculateTotalPlant = () => {
    if (cart.length != 0) {
      const quantities = cart.map((item) => item.quantity);
      const TotalPlant = quantities.reduce((total, num) => (total += num));
      return TotalPlant;
    } else {
      return "0";
    }
  };

  const handleCheckoutShopping = () => {
    if (cart.length != 0) {
      alert("Functionality to be added for future reference, Thank You!");
    } else {
      alert("Take some plants into the cart please!");
    }
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()} | Total Plants:{" "}
        {calculateTotalPlant(cart)}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
