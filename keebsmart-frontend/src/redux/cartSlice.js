import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        userCarts: [],
        allChecked: false,
        cartMessege: '',
        cartMessegeColor: ''
    },
    reducers: {
        setCarts: (state, action) => {
            state.userCarts = action.payload;
        },
        setAllChecked: (state, action) => {
            state.allChecked = action.payload;
        },
        setCartMessege: (state, action) => {
            state.cartMessege = action.payload;
        },
        setCartMessegeColor: (state, action) => {
            state.cartMessegeColor = action.payload;
        }
    }
})

export const { setCarts, setAllChecked, setCartMessege, setCartMessegeColor } = cartSlice.actions;
export default cartSlice.reducer;