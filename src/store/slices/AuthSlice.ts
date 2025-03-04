import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebaseConfig/firebaseConfig"; 


const auth = getAuth(app);


export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent successfully.";
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface User {
  uid: string;
  displayName?: string;
  email: string;
  emailVerified: boolean;
  photoURL?: string;
  phoneNumber?: string;
  providerData: object[];
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}



const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

// Separate Forgot Password Function outside Redux (for use in component)
export const forgotPasswordEmail = (email: string) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("reset email sent to " + email);
      alert("reset email sent to " + email);
    })
    .catch((error) => {
      console.error(error);
    });
};
