import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlices"
import profileSlice from "../slices/profileSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileSlice

})
export default rootReducer