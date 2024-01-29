import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    //config
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            //redux toolkit uses immer library to directly mutate the state
            //mutating the state here. We are directly modifying the state here
            state.items.push(action.payload);
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            //Redux Toolkit says : Either you have to mutate the existing state or return a new State
            state.items.length = 0; //OriginalState = []
            //return {items:[]}
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
