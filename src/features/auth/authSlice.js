import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    user: null, // Logged-in user data
    users: [], // All users
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginUserDataToRedux: (state, action) => {
            state.isLogin = true;
            state.user = action.payload;
        },
        setAllUsersToRedux: (state, action) => {
            state.users = action.payload; // Update all users list
        },
    },
});

export default authSlice.reducer;
export const { setLoginUserDataToRedux, setAllUsersToRedux } = authSlice.actions;
