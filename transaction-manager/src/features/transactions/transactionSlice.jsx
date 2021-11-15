import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transactions: [],
}

export const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        add: (state, action) => {
            state.transactions = [...state.transactions, action.payload]
        }
    }
})

export const { add } = transactionSlice.actions;

export default transactionSlice.reducer;