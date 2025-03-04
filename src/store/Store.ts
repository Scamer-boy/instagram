import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import homeReducer from "./slices/homeSlice";
import { profileReducer } from "./slices/profileSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: profileReducer,
    HomeScreen: homeReducer,
    
    
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

