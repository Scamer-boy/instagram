import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { ProfileState, UserProfileUpdate, UserProfilePictureUpdate, PostState, Post } from "../../types/types";

const initialProfileState: ProfileState = {
  uid: "",
  name: "",
  username: "",
  bio: "",
  profileImage: "",
  email: "",
  phone: "",
  website: "",
  gender: "",
  posts: [],
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (uid: string, { rejectWithValue }) => {
    try {
      const userDocRef = doc(getFirestore(), "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data() as ProfileState;
      } else {
        return rejectWithValue("User not found");
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An error occurred");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (userData: UserProfileUpdate, { rejectWithValue }) => {
    try {
      const { uid, ...updateData } = userData;
      const userDocRef = doc(getFirestore(), "users", uid);
      await updateDoc(userDocRef, updateData);
      return updateData;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An error occurred");
    }
  }
);

export const updateUserProfilePicture = createAsyncThunk(
  "profile/updateUserProfilePicture",
  async ({ uid, profileImage }: UserProfilePictureUpdate, { rejectWithValue }) => {
    try {
      const userDocRef = doc(getFirestore(), "users", uid);
      await updateDoc(userDocRef, { profileImage });
      return { profileImage };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "An error occurred");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<ProfileState>) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<Omit<UserProfileUpdate, 'uid'>>) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfilePicture.fulfilled, (state, action: PayloadAction<{ profileImage: string }>) => {
        state.profileImage = action.payload.profileImage;
      })
      .addCase(updateUserProfilePicture.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

const initialPostState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
  },
});

export const { setPosts, addPost } = postSlice.actions;
export const { updateProfilePicture } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const postReducer = postSlice.reducer;
