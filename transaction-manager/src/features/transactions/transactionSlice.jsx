import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
    name: "transactions",
    initialState: [{'place': 'Best Buy', 'date': '5-7-2021', 'total': '19.99', 'category': 'Business'}],
    reducers: {
        add: (state, action) => {
            const newTrans = action.payload
            return [...state, action.payload]
        }
    }
})

export const { add } = transactionSlice.actions;

export default transactionSlice.reducer;