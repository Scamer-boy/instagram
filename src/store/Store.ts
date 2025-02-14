
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import postReducer from "./slices/PostSlice";
import { profileReducer } from "./slices/ProfileSlice";
import HomeScreen from "../screens/HomeScreen";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: profileReducer,
  
   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

