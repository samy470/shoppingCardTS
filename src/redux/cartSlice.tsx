import { createSlice } from "@reduxjs/toolkit";

interface Item {
    name: string;
    image: string;
    price: string;
    details: string;
}

interface CartState {
  list: Item[];
  details: Item[];
  cart: Item[];
}

const initialState: CartState = {
  list: [
        { name: "Batman™: Arkham Knight", image: "header.jpg", price: "19.99", details: "Batman™: Arkham Knight brings the award-winning Arkham trilogy from Rocksteady Studios to its epic conclusion. Developed exclusively for New-Gen platforms, Batman: Arkham Knight introduces Rocksteady's uniquely designed version of the Batmobile. The highly anticipated addition of this legendary vehicle, combined with the acclaimed gameplay of the Arkham series, offers gamers the ultimate and complete Batman experience as they tear through the streets and soar across the skyline of the entirety of Gotham City. In this explosive finale, Batman faces the ultimate threat against the city that he is sworn to protect, as Scarecrow returns to unite the super criminals of Gotham and destroy the Batman forever." },
        { name: "DOOM: The Dark Ages", image: "header_alt_assets_1.jpg", price: "24.99", "details": "DOOM: The Dark Ages is the prequel to the critically acclaimed DOOM (2016) and DOOM Eternal that tells an epic cinematic story worthy of the DOOM Slayer’s legend. In this third installment of the modern DOOM series, players will step into the blood-stained boots of the DOOM Slayer, in this never-before-seen dark and sinister medieval war against Hell." },
        { name: "HITMAN World of Assassination", image: "header_alt_assets_13.jpg", price: "13.19", "details": "Enter the world of the ultimate assassin. HITMAN World of Assassination brings together the best of HITMAN, HITMAN 2 and HITMAN 3 including the main campaign, contracts mode, escalations, elusive target arcades and featured live content." },
        { name: "Forza Horizon 5", image: "header1.jpg", price: "16.39", details: "Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars." },
        { name: "Hollow Knight: Silksong", image: "header2.jpg", price: "7.99", details: "As the lethal hunter Hornet, adventure through a kingdom ruled by silk and song! Captured and taken to this unfamiliar world, prepare to battle mighty foes and solve ancient mysteries as you ascend on a deadly pilgrimage to the kingdom’s peak." }
    ],
  details: [
    { name: "Hollow Knight: Silksong", image: "header2.jpg", price: "7.99", details: "As the lethal hunter Hornet, adventure through a kingdom ruled by silk and song! Captured and taken to this unfamiliar world, prepare to battle mighty foes and solve ancient mysteries as you ascend on a deadly pilgrimage to the kingdom’s peak." }
  ],
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
            state.list = initialState.list.filter(item => item.name.toLowerCase().includes(query));
        }
    },
});

export const { addToCart, showDetails, removeFromCart, searchItems } = cartSlice.actions;
export default cartSlice.reducer;