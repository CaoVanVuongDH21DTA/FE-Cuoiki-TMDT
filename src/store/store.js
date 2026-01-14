import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
    cartState: cartReducer,
})

const store = configureStore({
    reducer : rootReducer
})

export default store;