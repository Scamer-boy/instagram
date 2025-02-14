import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../store/firebaseconfig";
import { RootState } from "../store/Store";
import { Post, UserProfile } from "../types/HomeSceen";
import useNavigation from "./useNavigation";

export const useHomeScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userProfiles, setUserProfiles] = useState<UserProfile>({});
  const user = useSelector((state: RootState) => state.auth.user);
  const { navigation } = useNavigation();

  // Fetch Posts and Users Efficiently
  useEffect(() => {
    setLoading(true);
    const postsCollectionRef = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollectionRef, async (postsSnapshot) => {
      const postsData: Post[] = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
        likes: doc.data()?.likes || [],
      }));

      setPosts(postsData);

      // Get unique user IDs and fetch them in one query
      const uniqueUserIds = [...new Set(postsData.map((post) => post.userId))];

      if (uniqueUserIds.length > 0) {
        const usersQuery = query(collection(db, "users"), where("uid", "in", uniqueUserIds));
        const userDocs = await getDocs(usersQuery);

        const userData: UserProfile = {};
        userDocs.forEach((doc) => {
          userData[doc.id] = doc.data();
        });

        setUserProfiles(userData);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Like/Unlike a Post
  const handleLikeToggle = async (postId: string, currentLikes: string[]) => {
    if (!user) return;

    const postRef = doc(db, "posts", postId);
    const isLiked = currentLikes.includes(user.uid);

    // Optimistically update UI before Firestore request
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: isLiked ? post.likes.filter((uid) => uid !== user.uid) : [...post.likes, user.uid] }
          : post
      )
    );

    try {
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } catch (error) {
      console.error("Error updating likes:", error);
      // Revert UI change if Firestore update fails
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes: isLiked ? [...post.likes, user.uid] : post.likes.filter((uid) => uid !== user.uid) }
            : post
        )
      );
    }
  };

  // Navigate to User Profile
  const handleProfileClick = (profileUserId: string) => {
    navigation.navigate(profileUserId === user?.uid ? "Profile" : "OtherUserProfile", { userId: profileUserId });
  };

  return {
    user,
    posts,
    loading,
    userProfiles,
    handleLikeToggle,
    handleProfileClick,
  };
};
