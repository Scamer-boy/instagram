import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebaseconfig"; // Your Firebase config file import

// Firebase Auth instance
const auth = getAuth(app);

// Forgot Password Async Thunk
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

interface AuthState {
  user: any;
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
    setUser: (state, action: PayloadAction<any>) => {
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













// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { getAuth, sendPasswordResetEmail, updatePassword } from "firebase/auth";
// import app from "../firebaseconfig"; // Your Firebase config file import

// // Firebase Auth instance
// const auth = getAuth(app);

// // Forgot Password Async Thunk
// export const forgotPassword = createAsyncThunk(
//   "auth/forgotPassword",
//   async (email: string, { rejectWithValue }) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return "Password reset email sent successfully.";
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Reset Password Async Thunk
// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async ({ newPassword }: { newPassword: string }, { rejectWithValue }) => {
//     try {
//       const user = auth.currentUser;
//       if (!user) throw new Error("User not logged in.");
      
//       await updatePassword(user, newPassword);
//       return newPassword; // Return the new password for updating in the store
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// interface AuthState {
//   user: any;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<any>) => {
//       state.user = action.payload;
//     },
//     logoutUser: (state) => {
//       state.user = null;
//     },
//     updateUserPassword: (state, action: PayloadAction<string>) => {
//       if (state.user) {
//         state.user.password = action.payload; // Update password in store
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Forgot Password
//       .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Reset Password
//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         // Dispatching the password update in the state after successful reset
//         if (state.user) {
//           state.user.password = action.payload;
//         }
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setUser, logoutUser, updateUserPassword } = authSlice.actions;
// export default authSlice.reducer;

// // Separate Forgot Password Function (for direct use in components)
// export const forgotPasswordEmail = (email: string) => {
//   const auth = getAuth();
//   sendPasswordResetEmail(auth, email)
//     .then(() => {
//       console.log("reset email sent to " + email);
//       alert("reset email sent to " + email);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
