import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/User/authSlice";
import { apiSlice } from "./apiSlice";
import productStatusSliceReducer from "../features/Products/productStatusSlice";
import cartSliceReducer from "../features/Products/cartSlice";
export const store = configureStore({
    reducer:{
        auth : authSliceReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
        productsStatus : productStatusSliceReducer,
        cart : cartSliceReducer
    },
    middleware : getDefault => getDefault().concat(apiSlice.middleware)
})