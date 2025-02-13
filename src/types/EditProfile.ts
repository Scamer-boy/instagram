 
//Edit profile types
import { RouteProp } from "@react-navigation/native";

export interface EditProfileScreenProps {
  route?: RouteProp<{ params: UserProfile }, "params">;
}

export interface UserProfile {
  name?: string;
  username?: string;
  bio?: string;
  profileImage?: string;
  website?: string;
  email?: string;
  phone?: string;
  gender?: string;
}

export interface RootState {
  auth: {
    user: {
      uid: string;
    };
  };
}
