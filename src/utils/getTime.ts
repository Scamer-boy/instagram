export const getRelativeTime = (timestamp: { seconds: number } | { seconds: { seconds: number; nanoseconds: number } }) => {
    if (!timestamp || typeof timestamp !== "object") {
      console.error("Invalid timestamp format:", timestamp);
      return "Invalid date";
    }
  
    const seconds = (timestamp as any).seconds?.seconds ?? (timestamp as any).seconds;
  
    if (typeof seconds !== "number") {
      console.error("Invalid seconds value:", timestamp);
      return "Invalid date";
    }
  
    const postDate = new Date(seconds * 1000);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 172800) return "Yesterday";
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };
  
  // Example Usage
  const testTimestamp = { seconds: { seconds: 1739272122, nanoseconds: 115000000 } }; // Example format with nested structure
  console.log("Relative Time:", getRelativeTime(testTimestamp));
  