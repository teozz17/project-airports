import { configureStore } from "@reduxjs/toolkit";
import airportsReducer from "../pages/Lists/AirportsSlice";

export const store = configureStore({
    reducer: {
        airports: airportsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
