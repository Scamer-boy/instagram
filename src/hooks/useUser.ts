// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../screens/store/firebaseconfig";

// const useUser = () => {
//     const fetchUserData = async (userId: string) => {
//         try {
//             const userDocRef = doc(db, "users", userId);
//             const userDoc = await getDoc(userDocRef);
//             if (userDoc.exists()) {
//                 const userData = userDoc.data();
//                 return {
//                     username: userData.username || "No Username",
//                     name: userData.name || "No Name",
//                     bio: userData.bio || "No Bio",
//                     profileImage: userData.profilePicture || "https://via.placeholder.com/100",
//                 };
//             } else {
//                 throw new Error("User not found");
//             }
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             return null;  // Return null if there's an error
//         }
//     };

//     return { fetchUserData };
// }

// export default useUser;