import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../screens/store/firebaseconfig";
import { RootState } from "../screens/store/Store";
import { Post, UserProfile } from "../types/HomeSceen";
import useNavigation from "./useNavigation";

export const useHomeScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userProfiles, setUserProfiles] = useState<UserProfile>({});
  const user = useSelector((state: RootState) => state.auth.user);
  const {navigation} = useNavigation();

  // Fetch Posts and Users
  useEffect(() => {
    setLoading(true);
    try {
      const postsCollectionRef = collection(db, "posts");

      const unsubscribe = onSnapshot(postsCollectionRef, async (postsSnapshot) => {
        const postsData: Post[] = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
          likes: doc.data()?.likes || [],
        }));

        setPosts(postsData);

        const uniqueUserIds = [...new Set(postsData.map((post) => post.userId))];

        uniqueUserIds.forEach((userId) => {
          const userDocRef = doc(db, "users", userId);
          onSnapshot(userDocRef, (userDoc) => {
            if (userDoc.exists()) {
              setUserProfiles((prev) => ({ ...prev, [userId]: userDoc.data() }));
            }
          });
        });
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Like/Unlike a Post
  const handleLikeToggle = async (postId: string, currentLikes: string[]) => {
    if (!user) return;

    const postRef = doc(db, "posts", postId);
    const isLiked = currentLikes.includes(user.uid);

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: isLiked
                ? post.likes.filter((uid: string) => uid !== user.uid)
                : [...post.likes, user.uid],
            }
          : post
      )
    );

    try {
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } catch (error) {
      console.error("Error updating likes:", error);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: isLiked
                  ? [...post.likes, user.uid]
                  : post.likes.filter((uid: string) => uid !== user.uid),
              }
            : post
        )
      );
    }
  };

  // Navigate to User Profile
  const handleProfileClick = (profileUserId: string) => {
    if (profileUserId === user?.uid) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("OtherUserProfile", { userId: profileUserId });
    }
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
