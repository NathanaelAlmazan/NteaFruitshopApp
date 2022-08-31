import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartSlice } from "../slice"

const store = configureStore({
    reducer: combineReducers({
      cart: cartSlice,
    })
  });

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export default store