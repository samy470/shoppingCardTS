import { createSlice } from "@reduxjs/toolkit";

interface Item {
    name: string;
    image: string;
    price: string;
    details: string;
}

interface CartState {
  original: Item[];
  list: Item[];
  details: Item[];
  cart: Item[];
}

const initialState: CartState = {
  original: [],
  list: [],
  details: [],
  cart: [],
};

const cartSlice = createSlice({

  name: "cart",
  initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        showDetails: (state, action) => {
            state.details = [];
            state.details = [action.payload];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.name !== action.payload);
        },
        searchItems: (state, action) => {
            const query = action.payload.toLowerCase();
            state.list = state.original.filter(item => item.name.toLowerCase().includes(query));
        },
        setList: (state, action) => {
            state.original = action.payload;
            state.list = action.payload;
        }

    },
});

export const { addToCart, showDetails, removeFromCart, searchItems, setList } = cartSlice.actions;
export default cartSlice.reducer;