import { useState, useEffect } from "react";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../screens/store/firebaseconfig";
import { UserProfile, Post } from "../types/ProfileScreentype";

export const useProfile = (userId: string | undefined) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(db, "users", userId);
    const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      }
      setLoadingProfile(false);
    });

    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));
    const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
      const userPosts = querySnapshot.docs.map((doc) => doc.data() as Post);
      setPosts(userPosts);
      setLoadingPosts(false);
    });

    return () => {
      unsubscribeProfile();
      unsubscribePosts();
    };
  }, [userId]);

  return { profile, posts, loadingProfile, loadingPosts };
};
