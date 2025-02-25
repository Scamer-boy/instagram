import { createSlice } from "@reduxjs/toolkit";
import { 
  collection, 
  doc, 
  onSnapshot, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";
import { db } from "../firebaseconfig";
import { RootState } from "../Store";
import { ThunkDispatch } from "@reduxjs/toolkit";

// 🟢 Post Interface
interface Post {
  id: string;
  userId: string;
  username: string;
  country: string;
  profilepImage: string;
  imageUrl: string;
  caption: string;
  likes: string[];
  createdAt: any;
}

// 🟢 User Profile Interface
interface UserProfile {
  [key: string]: {
    uid: string;
    username: string;
    profileImage: string;
    bio: string;
  };
}

// 🟢 Redux State Interface
interface HomeState {
  posts: Post[];
  userProfiles: UserProfile;
  loading: boolean;
  error: string | null;
}

// 🔹 Initial State
const initialState: HomeState = {
  posts: [],
  userProfiles: {},
  loading: false,
  error: null,
};

// ✅ Real-time Listener for Posts & User Profiles
export const subscribeToPosts = () => {
  return (dispatch: ThunkDispatch<RootState, void, any>) => {
    dispatch(setLoading(true));

    const postsCollectionRef = collection(db, "posts");
    const usersCollectionRef = collection(db, "users");

    // 🔥 Listen to Posts Collection
    const unsubscribePosts = onSnapshot(postsCollectionRef, async (postsSnapshot) => {
      try {
        const postsData: Post[] = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
          likes: doc.data()?.likes || [],
        }));

        // Unique user IDs from posts
        const uniqueUserIds = [...new Set(postsData.map((post) => post.userId))];

        let userProfiles: UserProfile = {};

        if (uniqueUserIds.length > 0) {
          const usersQuery = query(usersCollectionRef, where("uid", "in", uniqueUserIds));
          const userDocs = await getDocs(usersQuery);

          userDocs.forEach((doc) => {
            userProfiles[doc.id] = doc.data() as UserProfile[string];
          });
        }

        dispatch(setPosts({ posts: postsData, userProfiles }));
      } catch (error) {
        dispatch(setError((error as Error).message || "Failed to fetch posts"));
      }
    });

    // 🔥 Listen to Users Collection for Profile Updates
    const unsubscribeUsers = onSnapshot(usersCollectionRef, (usersSnapshot) => {
      try {
        let updatedUserProfiles: UserProfile = {};

        usersSnapshot.docs.forEach((doc) => {
          updatedUserProfiles[doc.id] = doc.data() as UserProfile[string];
        });

        dispatch(updateUserProfiles(updatedUserProfiles));
      } catch (error) {
        console.error("Error updating user profiles in real-time:", error);
      }
    });

    // ✅ Return function to clean up both listeners
    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  };
};

// ✅ Handle Post Likes (🔥 Fixed Code)
export const handleLikeToggle = ({ postId, userId }: { postId: string; userId: string }) => {
  return async (dispatch: any, getState: any) => {
    try {
      const state = getState();
      const postRef = doc(db, "posts", postId);
      const post = state.HomeScreen.posts.find((p: Post) => p.id === postId); // 🔥 Fixed this line

      if (!post) return;

      const isLiked = post.likes.includes(userId);

      // Optimistically update UI
      dispatch(toggleLike({ postId, userId, isLiked }));

      // Update Firestore
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
      });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
};

// ✅ Redux Slice
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload.posts;
      state.userProfiles = action.payload.userProfiles;
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    toggleLike(state, action) {
      const { postId, userId, isLiked } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: isLiked ? post.likes.filter((id) => id !== userId) : [...post.likes, userId],
            }
          : post
      );
    },
    // 🆕 Update user profiles in real-time
    updateUserProfiles(state, action) {
      state.userProfiles = {
        ...state.userProfiles,
        ...action.payload, // Merge updated profiles
      };

      // 🆕 Update posts where userId matches, so profile changes reflect in posts
      state.posts = state.posts.map((post) => {
        if (action.payload[post.userId]) {
          return {
            ...post,
            username: action.payload[post.userId].username,
            profilepImage: action.payload[post.userId].profileImage, // Ensure this matches your Post interface
          };
        }
        return post;
      });
    },
  },
});

export const { setPosts, setError, setLoading, toggleLike, updateUserProfiles } = homeSlice.actions;
export default homeSlice.reducer;
