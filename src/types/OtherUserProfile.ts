import { RouteProp } from "@react-navigation/native";

export interface UserProfile {
  name?: string;
  username?: string;
  bio?: string;
  profilePicture?: string;
}

export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
}

export interface OtherUserProfileScreenProps {
  route: RouteProp<{ params: { userId: string } }, "params">;
}
