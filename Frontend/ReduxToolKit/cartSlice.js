import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // array of cart items
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action) => {
        state.items.push(action.payload);
      },
      removeFromCart: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      },
      clearCart: (state) => {
        state.items = [];
      },
    },
  });
  
  export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;
  