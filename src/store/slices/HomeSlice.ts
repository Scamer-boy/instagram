import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebaseconfig";

interface Post {
  id: string;
  userId: string;
  username: string;
  country: string;
  profilePicture: string;
  imageUrl: string;
  caption: string;
  likes: number;
  createdAt: any;
}

interface HomeState {
  posts: Post[];
  lastVisible: any;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  posts: [],
  lastVisible: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "home/fetchPosts",
  async (lastDoc: any, { rejectWithValue }) => {
    try {
      let postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      
      if (lastDoc) {
        postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(10)
        );
      }

      const querySnapshot = await getDocs(postsQuery);
      const posts: Post[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { posts, lastVisible };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.posts];
        state.lastVisible = action.payload.lastVisible;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;