import { createSlice } from "@reduxjs/toolkit";

export const usernameSlice = createSlice({
    name: "username",
    initialState: "",
    reducers: {
        signIn(_, { payload }) {
            return payload;
        },
    },
});
