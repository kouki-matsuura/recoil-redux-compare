import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
    },
    reducers: {
        increase: (state) => {
            state.count ++;
        },
        decrease: (state) => {
            state.count --;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload
        }
    }
});

export const { increase, decrease, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;