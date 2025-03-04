

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Post } from '../../types/ProfileScreentype';
import {ProfileState} from '../../types/types';



const initialProfileState = {
  username: '',
  bio: '',
  profileImage: '',
  email: '',
  phone: '',
  website: '',
  gender: '',
  posts: [] as Post[],
  loading: false,
  error: null as string | null,
  name: '',
};


export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (uid: string, { rejectWithValue }) => {
    try {
      const userDocRef = doc(getFirestore(), 'users', uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        return rejectWithValue('User not found');
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (
    { uid, name, username, bio, email, phone, website, gender,}: 
    { uid: string; name:string, username: string; bio: string; email: string; phone: string; website: string; gender: string },
    { rejectWithValue }
  ) => {
    try {
      const userDocRef = doc(getFirestore(), 'users', uid);
      await updateDoc(userDocRef, {  name, username, bio, email, phone, website, gender });
      return {    name,username, bio, email, phone, website, gender };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const updateUserProfilePicture = createAsyncThunk(
  'profile/updateUserProfilePicture',
  async ({ uid, profileImage }: { uid: string; profileImage: string }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(getFirestore(), 'users', uid);
      await updateDoc(userDocRef, { profileImage });
      return { profileImage };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const profileSlice = createSlice({
  name: 'profile',
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
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.name = action.payload.name || '';
        state.username = action.payload.username || '';
        state.bio = action.payload.bio || '';
        state.email = action.payload.email || '';
        state.phone = action.payload.phone || '';
        state.website = action.payload.website || '';
        state.gender = action.payload.gender || '';
        state.profileImage = action.payload.profileImage || ''; 
        state.posts = action.payload.posts || [];
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.bio = action.payload.bio;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.website = action.payload.website;
        state.gender = action.payload.gender;
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

const initialPostState = {
  posts: [] as Post[],
  loading: false,
  error: null as string | null,
};


const postSlice = createSlice({
  name: 'posts',
  initialState: initialPostState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // Add new post at the beginning
    },
  },
});

export const { setPosts, addPost } = postSlice.actions;
export const { updateProfilePicture } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const postReducer = postSlice.reducer;
