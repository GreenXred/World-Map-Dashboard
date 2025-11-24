import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CountryState = {
    selectedCountry: string | null;
};

const initialState: CountryState = {
    selectedCountry: null,
};

export const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        setCountry(state, action: PayloadAction<string>) {
            state.selectedCountry = action.payload;
        }
    },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
