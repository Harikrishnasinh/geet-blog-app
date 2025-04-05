import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./userSlice"
import adminUserReducer from "./admin.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminUserReducer,
});

export default rootReducer