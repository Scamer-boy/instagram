import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../store/firebaseconfig";
import { UserProfile, Post } from "../types/OtherUserProfile";

const useOtherUserProfile = (userId: string) => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserProfile);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const postsSnap = await getDocs(postsRef);
        const userPosts = postsSnap.docs
          .map((doc) => ({ ...(doc.data() as Post), id: doc.id }))
          .filter((post) => post.userId === userId);

        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [userId]);

  return { userData, posts, loading };
};
export default useOtherUserProfile;
