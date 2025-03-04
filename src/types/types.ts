export interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isMultiline?: boolean;

}

export interface ButtonProps  {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  loading?: boolean;
};

export interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none";
  multiline?: boolean;
  numberOfLines?: number;
  

};


export interface PostCardProps {
  item: {
    id: string;
    userId: string;
    imageUrl: string;
    caption: string;
    likes: string[];
    createdAt: number;
  };
  userData: {
    username?: string;
    profileImage?: string;
    city?: string;
    country?: string;
  };
  isLiked: boolean;
  handleProfileClick: (userId: string) => void;
handleLikeToggle: (postId: string) => void;
}

export interface RootStackParamList  {
    Home: undefined;
    Upload: undefined;
    Profile?: { userId?: string };
    OtherUserProfile: { userId: string };
    Login: undefined;
    Signup: undefined;
    EditProfile: { userProfile: UserProfile; profile: string };
    ResetPassword: undefined;
    ForgotPassword: undefined;
    
};

export interface Post {
    userId: string;
    caption: string;
    imageUrl: string;
    createdAt: number;
  }

  export interface Post {
    id: string;
    userId: string;
    username: string;
    country: string;
    profilepImage: string;
    imageUrl: string;
    caption: string;
    likes: string[];
    createdAt: number;
  }
  
  export interface UserProfile {
    [key: string]: {
      uid: string;
      username: string;
      profileImage: string;
      bio: string;
    };
  }

  export interface User {
    uid: string;
    username: string;
    email: string;
    displayName?: string;
    emailVerified: boolean;
    providerData: any[];
  }
  export interface ProfileState {
    name: string; 
    username: string;
    bio: string;
    profileImage: string;
    posts: Post[];
    loading: boolean;
    error: string | null;
    phone: string;
    email: string;
    website: string;
    gender: string;

  }
 

  
