import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./userSlice"

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer