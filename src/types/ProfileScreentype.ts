 //profilescreen types.ts

export interface UserProfile {
    username: string;
    name: string;
    bio: string;
    profileImage: string; 
    website: string;
    email: string;
    phone:string;
    gender: string;
   
  }
   export interface Post {
    imageUrl: string;
    
  }  

interface ProfileState {
  username: string;
  bio: string;
  profileImage: string; 
  posts: string[];
  loading: boolean;
  error: string | null;
  phone: string;
  email: string;
  website: string;
  name: string;
  
}


export interface Post {
  userId: string;
  caption: string;
  imageUrl: string;
  createdAt: number; 
}

interface PostState {
  posts: Post[];
}

// Initial States
const initialProfileState: ProfileState = {
  username: '',
  bio: '',
  profileImage: '',
  posts: [],
  loading: false,
  error: null,
  phone: '',
  email: '',
  website: '',
  name: '',
};


console.log(initialProfileState);

const initialPostState: PostState = {
  posts: [],
};


  
  export type RootStackParamList = {
Profile: { userId: string };
   EditProfile: { username: string; name: string; bio: string; profileImage: string; };
 
  };




