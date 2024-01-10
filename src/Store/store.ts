import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./reducer";





export const store = configureStore({
    reducer: {
        players:playerReducer
    },
})