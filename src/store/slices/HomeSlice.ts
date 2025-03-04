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
import { db } from "../../firebaseConfig/firebaseConfig";
import { RootState } from "../store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Post, UserProfile } from "../../types/types";




interface HomeState {
  posts: Post[];
  userProfiles: UserProfile;
  loading: boolean;
  error: string | null;
}


const initialState: HomeState = {
  posts: [],
  userProfiles: {},
  loading: false,
  error: null,
};


export const subscribeToPosts = () => {
  return (dispatch: ThunkDispatch<RootState, void, any>) => {
    dispatch(setLoading(true));

    const postsCollectionRef = collection(db, "posts");
    const usersCollectionRef = collection(db, "users");

    
    const unsubscribePosts = onSnapshot(postsCollectionRef, async (postsSnapshot) => {
      try {
        const postsData: Post[] = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
          likes: doc.data()?.likes || [],
        }));

        
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

   
    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  };
};


export const handleLikeToggle = ({ postId, userId }: { postId: string; userId: string }) => {
  return async (dispatch: any, getState: any) => {
    try {
      const state = getState();
      const postRef = doc(db, "posts", postId);
      const post = state.HomeScreen.posts.find((p: Post) => p.id === postId); 

      if (!post) return;

      const isLiked = post.likes.includes(userId);

      
      dispatch(toggleLike({ postId, userId, isLiked }));

      
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
      });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
};

 
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
   
    updateUserProfiles(state, action) {
      state.userProfiles = {
        ...state.userProfiles,
        ...action.payload, 
      };

      
      state.posts = state.posts.map((post) => {
        if (action.payload[post.userId]) {
          return {
            ...post,
            username: action.payload[post.userId].username,
            profilepImage: action.payload[post.userId].profileImage,
          };
        }
        return post;
      });
    },
  },
});

export const { setPosts, setError, setLoading, toggleLike, updateUserProfiles } = homeSlice.actions;
export default homeSlice.reducer;
