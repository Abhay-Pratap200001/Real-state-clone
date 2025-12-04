import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

// creating the main Redux store
export const store = configureStore({
  // all reducers go here
  reducer: { 
    user: userReducer 
  },

  // disabling serializable check to avoid warnings (useful when storing non-serializable data)
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false }),
});
