import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    owner: null,
}

const ownerSlice = createSlice ({
    name: "owner",
    initialState,
    reducers: {
        setOwner: (state, action) => {
            state.owner = action.payload;
        },
        clearOwner: (state) => {
            state.owner = null;
        },
    },
});

export const { setOwner, clearOwner } = ownerSlice.actions;
export default ownerSlice.reducer