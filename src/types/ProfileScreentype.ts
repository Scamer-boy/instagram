 // types.ts

export interface UserProfile {
    username: string;
    name: string;
    bio: string;
    profilePicture: string;
  }
  
  export interface Post {
    imageUrl: string;
  }
  
  export type RootStackParamList = {
    Profile: { userId: string };
    EditProfile: { username: string; name: string; bio: string; profileImage: string };
  };