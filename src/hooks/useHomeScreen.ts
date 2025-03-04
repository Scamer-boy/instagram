
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { subscribeToPosts, handleLikeToggle } from "../store/slices/homeSlice";
import useNavigation from "./useNavigation";

export const useHomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, userProfiles } = useSelector((state: RootState) => state.HomeScreen);
  const user = useSelector((state: RootState) => state.auth.user);
  const { navigation } = useNavigation();

  useEffect(() => {
    dispatch(subscribeToPosts());
  }, [dispatch]);

  const onLikeToggle = (postId: string) => {
    if (!user) return console.warn("User not logged in");
    console.log(`Toggling like for post: ${postId}`);
    dispatch(handleLikeToggle({ postId, userId: user.uid }));
  };

  const handleProfileClick = (profileUserId: string) => {
    navigation.navigate(profileUserId === user?.uid ? "Profile" : "OtherUserProfile", { userId: profileUserId });
  };

  return {
    user,
    posts,
    loading,
    userProfiles,
    handleLikeToggle: onLikeToggle,
    handleProfileClick,
    
  };
};








