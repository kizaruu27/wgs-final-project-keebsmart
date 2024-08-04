import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        userCarts: [],
        allChecked: false,
    },
    reducers: {
        setCarts: (state, action) => {
            state.userCarts = action.payload;
        },
        setAllChecked: (state, action) => {
            state.allChecked = action.payload;
        }
    }
})

export const { setCarts, setAllChecked } = cartSlice.actions;
export default cartSlice.reducer;