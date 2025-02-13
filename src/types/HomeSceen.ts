//homeScreenTypes
export interface Post {
    id: string;
    userId: string;
    imageUrl: string;
    caption: string;
    likes: string[];
  }
  
  export interface UserProfile {
    [key: string]: {
      username?: string;
      profilePicture?: string;
     };
  }
  
  
   