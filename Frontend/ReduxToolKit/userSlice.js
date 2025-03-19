import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
      name: localStorage.getItem('name') || null,
      email: localStorage.getItem('email') || null,
    },
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state , action) => {
            state.user = action.payload
            localStorage.setItem('name', action.payload.name || '');
            localStorage.setItem('email', action.payload.email || '');
        },

        clearUser: (state) => {
            state.user = {
              name: null,
              email: null,
            };
            localStorage.removeItem('name');
            localStorage.removeItem('email');

          },
        },
      });


export const{setUser , clearUser} = userSlice.actions;
export default userSlice.reducer;