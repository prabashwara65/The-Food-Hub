import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCount: 0,
  },
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
      state.totalCount = action.payload.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;