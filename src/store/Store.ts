
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import postReducer from "./slices/PostSlice";
import { profileReducer } from "./slices/ProfileSlice";
import homeReducer from "./slices/HomeSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: profileReducer,
    HomeScreen: homeReducer,
  
   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

