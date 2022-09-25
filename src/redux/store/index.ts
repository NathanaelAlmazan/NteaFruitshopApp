import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartSlice, searchSlice } from "../slice"

const store = configureStore({
    reducer: combineReducers({
      cart: cartSlice,
      search: searchSlice
    })
  });

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export default store