// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { db } from '../firebaseconfig';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';

// // Profile State Interface
// interface ProfileState {
//   username: string;
//   bio: string;
//   profilePicture: string;
//   posts: string[];
//   loading: boolean;
//   error: string | null;
// }

// // Post Interface
// export interface Post {
//   userId: string;
//   caption: string;
//   imageUrl: string;
//   createdAt: number; // Store timestamp as number
// }

// interface PostState {
//   posts: Post[];
// }

// // Initial State
// const initialProfileState: ProfileState = {
//   username: '',
//   bio: '',
//   profilePicture: '',
//   posts: [],
//   loading: false,
//   error: null,
// };

// const initialPostState: PostState = {
//   posts: [],
// };

// // ✅ Async thunk to fetch user profile
// export const fetchUserProfile = createAsyncThunk(
//   'profile/fetchUserProfile',
//   async (uid: string, { rejectWithValue }) => {
//     try {
//       const userDocRef = doc(db, 'users', uid);
//       const userDoc = await getDoc(userDocRef);
//       if (userDoc.exists()) {
//         return userDoc.data();
//       } else {
//         return rejectWithValue('User not found');
//       }
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // ✅ Async thunk to update profile (username & bio)
// export const updateUserProfile = createAsyncThunk(
//   'profile/updateUserProfile',
//   async ({ uid, username, bio }: { uid: string; username: string; bio: string }, { rejectWithValue }) => {
//     try {
//       const userDocRef = doc(db, 'users', uid);
//       await updateDoc(userDocRef, { username, bio });
//       return { username, bio };
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // ✅ Async thunk to update only profile picture
// export const updateUserProfilePicture = createAsyncThunk(
//   'profile/updateUserProfilePicture',
//   async ({ uid, profilePicture }: { uid: string; profilePicture: string }, { rejectWithValue }) => {
//     try {
//       const userDocRef = doc(db, 'users', uid);
//       await updateDoc(userDocRef, { profilePicture });
//       return { profilePicture };
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );



// // ✅ Profile Slice
// const profileSlice = createSlice({
//   name: 'profile',
//   initialState: initialProfileState,
//   reducers: {
//     updateProfilePicture: (state, action: PayloadAction<string>) => {
//       state.profilePicture = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.username = action.payload.username || '';
//         state.bio = action.payload.bio || '';
//         state.profilePicture = action.payload.profilePicture || '';
//         state.posts = action.payload.posts || [];
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(updateUserProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<{ username: string; bio: string }>) => {
//         state.loading = false;
//         state.username = action.payload.username;
//         state.bio = action.payload.bio;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(updateUserProfilePicture.fulfilled, (state, action: PayloadAction<{ profilePicture: string }>) => {
//         state.profilePicture = action.payload.profilePicture;
//       })
//       .addCase(updateUserProfilePicture.rejected, (state, action) => {
//         state.error = action.payload as string;
//       });
//   },
// });

// // ✅ Post Slice
// const postSlice = createSlice({
//   name: 'posts',
//   initialState: initialPostState,
//   reducers: {
//     setPosts: (state, action: PayloadAction<Post[]>) => {
//       state.posts = action.payload;
//     },
//     addPost: (state, action: PayloadAction<Post>) => {
//       state.posts.unshift(action.payload); // Add new post at the beginning
    
// },
//   },
// });

// export const { setPosts, addPost } = postSlice.actions;
// export const { updateProfilePicture } = profileSlice.actions;
// export const profileReducer = profileSlice.reducer;
// export const postReducer = postSlice.reducer;





//profile slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

// Profile State Interface
interface ProfileState {
  username: string;
  bio: string;
  profileImage: string; // Updated from profilePicture for consistency
  posts: string[];
  loading: boolean;
  error: string | null;
}

// Post Interface
export interface Post {
  userId: string;
  caption: string;
  imageUrl: string;
  createdAt: number; // Store timestamp as number
}

interface PostState {
  posts: Post[];
}

// Initial States
const initialProfileState: ProfileState = {
  username: '',
  bio: '',
  profileImage: '',
  posts: [],
  loading: false,
  error: null,
};

const initialPostState: PostState = {
  posts: [],
};

//  Async thunk to fetch user profile
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



//  Async thunk to update profile (username & bio)
export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async ({ uid, username, bio }: { uid: string; username: string; bio: string,profileImage: string }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(getFirestore(), 'users', uid);
      await updateDoc(userDocRef, { username, bio });
      return { username, bio };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Async thunk to update only profile image
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

// ✅ Profile Slice
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
        state.username = action.payload.username || '';
        state.bio = action.payload.bio || '';
        state.profileImage = action.payload.profileImage || ''; // Updated field
        state.posts = action.payload.posts || [];
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<{ username: string; bio: string }>) => {
        state.loading = false;
        state.username = action.payload.username;
        state.bio = action.payload.bio;
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

//  Post Slice
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
export const postReducer = postSlice.reducer; // Fixed naming issue
