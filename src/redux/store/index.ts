import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cartSlice, connectionSlice } from "../slice"

const store = configureStore({
    reducer: combineReducers({
      cart: cartSlice,
      connection: connectionSlice
    })
  });

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export default store