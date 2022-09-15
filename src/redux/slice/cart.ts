import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import { CartItem } from "../../pages/PointOfSale"

export interface CartStore {
    items: CartItem[],
    totalPrice: number
}

export interface CartIndex {
    code: string,
    type: string
}

const initialState: CartStore = {
    items: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        upsert: (state, action: PayloadAction<CartItem>) => {
            const price = action.payload.unitPrice - action.payload.product.discountedPrice
            const index = state.items.findIndex(i => i.product.productCode === action.payload.product.productCode && i.unitType === action.payload.unitType)

            if (index === -1) {
                state.items.push(action.payload)
                state.totalPrice += price
            }
            else {
                state.items[index].quantity += 1
                state.totalPrice += price
            }
        },
        addQuantity: (state, action: PayloadAction<CartIndex>) => {
            const index = state.items.findIndex(i => i.product.productCode === action.payload.code && i.unitType === action.payload.type)

            if (index !== -1) {
                const item = state.items[index]
                const price = item.unitPrice - item.product.discountedPrice

                state.items[index].quantity += 1
                state.totalPrice += price
            }
        },
        reduceQuantity: (state, action: PayloadAction<CartIndex>) => {
            const index = state.items.findIndex(i => i.product.productCode === action.payload.code && i.unitType === action.payload.type)

            const item = state.items[index]
            const price = item.unitPrice - item.product.discountedPrice

            if (index !== -1 && state.items[index].quantity > 1) {
                state.items[index].quantity -= 1
                state.totalPrice -= price
            }
            else {
                state.items.splice(index, 1)
                state.totalPrice -= price
            }  
        },
        removeAll: (state) => {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const { upsert, addQuantity, reduceQuantity, removeAll } = cartSlice.actions

export default cartSlice.reducer