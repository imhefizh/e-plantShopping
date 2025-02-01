import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showProducts: false,
    addedToCart: {}, // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const { payload: product } = action;
      const index = state.items.findIndex((item) => item.name == product.name);
      if (index != -1) {
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name == name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    toggleShowProduct: (state) => {
      state.showProducts = !state.showProducts;
    },
    updateCartStatus: (state, action) => {
      const { name } = action.payload;
      if (state.addedToCart[name]) {
        delete state.addedToCart[name];
      } else {
        state.addedToCart[name] = true;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  toggleShowProduct,
  updateCartStatus,
} = CartSlice.actions;

export default CartSlice.reducer;
