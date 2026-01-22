import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk("cart/fetchGames", async () => {
  const res = await fetch("http://localhost:5000/api/games");
  return await res.json();
});

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
    extraReducers: (builder) => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.list = action.payload; // DB -> Redux
    })}
});

export const { addToCart, showDetails, removeFromCart, searchItems, setList } = cartSlice.actions;
export default cartSlice.reducer;