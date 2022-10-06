import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartSlice, searchSlice, authSlice } from "../slice"

const store = configureStore({
    reducer: combineReducers({
      cart: cartSlice,
      search: searchSlice,
      auth: authSlice
    })
  });

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export default store