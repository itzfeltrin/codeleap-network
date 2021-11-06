import { createSlice } from "@reduxjs/toolkit";
import { setCookie, destroyCookie } from "nookies";

export const usernameSlice = createSlice({
    name: "username",
    initialState: "",
    reducers: {
        signIn(_, { payload }) {
            setCookie(undefined, "codeleap.username", payload, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });

            return payload;
        },
        signOut() {
            destroyCookie(undefined, "codeleap.username");

            return "";
        },
    },
});
