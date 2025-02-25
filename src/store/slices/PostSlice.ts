
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  userId: string;
  caption: string;
  imageUrl: string;
  createdAt: number; // Store timestamp as number
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};
const postSlice = createSlice({
  name: 'posts',
  initialState,
  
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
export default postSlice.reducer;
