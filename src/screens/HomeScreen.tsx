// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// import { useSelector } from "react-redux";
// import { RootState } from "../screens/store/Store";
// import { db } from "../screens/store/firebaseconfig";
// import { collection, getDocs, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const HomeScreen = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [userProfiles, setUserProfiles] = useState<{ [key: string]: any }>({});
//   const user = useSelector((state: RootState) => state.auth.user);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchPostsAndUsers = async () => {
//       setLoading(true);
//       try {
//         const postsCollectionRef = collection(db, "posts");

//         const unsubscribe = onSnapshot(postsCollectionRef, async (postsSnapshot) => {
//           const postsData = postsSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//             likes: doc.data()?.likes || [],
//           }));

//           setPosts(postsData);

//           // Fetch unique user profiles
//           const uniqueUserIds = [...new Set(postsData.map((post) => post.userId))];
//           const userProfilesData: { [key: string]: any } = {};

//           await Promise.all(
//             uniqueUserIds.map(async (userId) => {
//               const userDoc = doc(db, "users", userId);
//               const userProfileSnap = await getDocs(collection(db, "users"));
//               userProfileSnap.forEach((doc) => {
//                 if (doc.id === userId) {
//                   userProfilesData[userId] = doc.data();
//                 }
//               });
//             })
//           );

//           setUserProfiles(userProfilesData);
//         });

//         return () => unsubscribe();
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPostsAndUsers();
//   }, []);

//   const handleLikeToggle = async (postId: string, currentLikes: string[]) => {
//     if (!user) return;

//     const postRef = doc(db, "posts", postId);
//     const isLiked = currentLikes.includes(user.uid);

//     try {
//       await updateDoc(postRef, {
//         likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
//       });

//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId
//             ? { ...post, likes: isLiked ? post.likes.filter((uid: string) => uid !== user.uid) : [...post.likes, user.uid] }
//             : post
//         )
//       );
//     } catch (error) {
//       console.error("Error updating likes:", error);
//     }
//   };

//   const handleProfileClick = (profileUserId: string) => {
//     console.log("Navigating to Profile:", profileUserId); // Debugging ke liye

//     if (profileUserId === user?.uid) {
//       navigation.navigate("OwnProfile"); // Apni profile par jaane ke liye
//     } else {
//       navigation.navigate("OtherUserProfile", { userId: profileUserId }); // Dusre user ki profile
//     }
//   };

//   const renderPost = ({ item }: { item: any }) => {
//     const userData = userProfiles[item.userId];
//     const isLiked = item.likes.includes(user?.uid);

//     return (
//       <View style={styles.postContainer}>
//         <View style={styles.postHeader}>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)}>
//             <Image source={{ uri: userData?.profilePicture || "https://via.placeholder.com/40" }} style={styles.profileImage} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)} style={styles.userInfo}>
//             <Text style={styles.username}>{userData?.username || "Unknown User"}</Text>
//             <Text style={styles.location}>Tokyo, Japan</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="ellipsis-horizontal" size={22} color="black" />
//           </TouchableOpacity>
//         </View>

//         <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

//         <Text style={styles.caption}>{item.caption}</Text>

//         <View style={styles.likeContainer}>
//           <TouchableOpacity onPress={() => handleLikeToggle(item.id, item.likes)}>
//             <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "red" : "black"} />
//           </TouchableOpacity>
//           <Text style={styles.likeCount}>{item.likes.length} Likes</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     // <View style={styles.container}>
//     //   <View style={styles.header}>
//     //     <Text style={styles.headerText}>Instagram</Text>
//     //   </View>

//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require("../../assets/Instagram-logo")} style={styles.logo} />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
//       ) : (
//         <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={renderPost} contentContainerStyle={styles.postsList} showsVerticalScrollIndicator={false} />
//       )}
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 10,
//   },

//   logo: {
//     width: 120,
//     height: 40,
//     resizeMode: "contain",
//   },
  

//   header: {
//     width: "100%",
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FAFAFA",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   postContainer: {
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     paddingBottom: 10,
//   },
//   postHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   username: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   location: {
//     fontSize: 14,
//     color: "gray",
//   },
//   postImage: {
//     width: "100%",
//     height: 400,
//   },
//   caption: {
//     fontSize: 14,
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   likeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   likeCount: {
//     fontSize: 14,
//     color: "black",
//     marginLeft: 10,
//   },
//   postsList: {
//     paddingBottom: 20,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default HomeScreen;
























// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// import { useSelector } from "react-redux";
// import { RootState } from "../screens/store/Store";
// import { db } from "../screens/store/firebaseconfig";
// import { collection, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const HomeScreen = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [userProfiles, setUserProfiles] = useState<{ [key: string]: any }>({});
//   const user = useSelector((state: RootState) => state.auth.user);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchPostsAndUsers = () => {
//       setLoading(true);
//       try {
//         const postsCollectionRef = collection(db, "posts");

//         const unsubscribe = onSnapshot(postsCollectionRef, async (postsSnapshot) => {
//           const postsData = postsSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//             likes: doc.data()?.likes || [],
//           }));

//           setPosts(postsData);

//           // Unique user IDs nikalna
//           const uniqueUserIds = [...new Set(postsData.map((post) => post.userId))];
//           const userProfilesData: { [key: string]: any } = {};

//           uniqueUserIds.forEach((userId) => {
//             const userDocRef = doc(db, "users", userId);
//             onSnapshot(userDocRef, (userDoc) => {
//               if (userDoc.exists()) {
//                 setUserProfiles((prev) => ({ ...prev, [userId]: userDoc.data() }));
//               }
//             });
//           });
//         });

//         return () => unsubscribe();
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPostsAndUsers();
//   }, []);

//   const handleLikeToggle = async (postId: string, currentLikes: string[]) => {
//     if (!user) return;

//     const postRef = doc(db, "posts", postId);
//     const isLiked = currentLikes.includes(user.uid);

//     // Optimistic update: Update local state before Firestore update
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               likes: isLiked
//                 ? post.likes.filter((uid: string) => uid !== user.uid)  // Remove the like
//                 : [...post.likes, user.uid], // Add the like
//             }
//           : post
//       )
//     );

//     try {
//       // Update the 'likes' array in Firestore
//       await updateDoc(postRef, {
//         likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
//       });
//     } catch (error) {
//       console.error("Error updating likes:", error);

//       // If Firestore update fails, revert the optimistic update
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId
//             ? {
//                 ...post,
//                 likes: isLiked
//                   ? [...post.likes, user.uid] // Revert back to previous state
//                   : post.likes.filter((uid: string) => uid !== user.uid), // Revert back to previous state
//               }
//             : post
//         )
//       );
//     }
//   };

//   const handleProfileClick = (profileUserId: string) => {
//     if (profileUserId === user?.uid) {
//       navigation.navigate("OwnProfile");
//     } else {
//       navigation.navigate("OtherUserProfile", { userId: profileUserId });
//     }
//   };

//   const renderPost = ({ item }: { item: any }) => {
//     const userData = userProfiles[item.userId];
//     const isLiked = item.likes.includes(user?.uid);

//     return (
//       <View style={styles.postContainer}>
//         <View style={styles.postHeader}>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)}>
//             <Image source={{ uri: userData?.profilePicture || "https://via.placeholder.com/40" }} style={styles.profileImage} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)} style={styles.userInfo}>
//             <Text style={styles.username}>{userData?.username || "Unknown User"}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="ellipsis-horizontal" size={22} color="black" />
//           </TouchableOpacity>
//         </View>

//         <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

//         <Text style={styles.caption}>{item.caption}</Text>

//         <View style={styles.likeContainer}>
//           <TouchableOpacity onPress={() => handleLikeToggle(item.id, item.likes)}>
//             <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "red" : "black"} />
//           </TouchableOpacity>
//           <Text style={styles.likeCount}>{item.likes.length} Likes</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require("../../assets/Instagram-logo.png")} style={styles.logo} />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
//       ) : (
//         <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={renderPost} contentContainerStyle={styles.postsList} showsVerticalScrollIndicator={false} />
//       )}
//     </View>
//   );
// };

// // 🖌️ Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 20,
//   },
//   logo: {
//     width: 140,
//     height: 40,
//     resizeMode: "contain",
//     top: 7,
//   },
//   header: {
//     width: "100%",
//     height:75,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FAFAFA",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   postContainer: {
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     paddingBottom: 10,
//   },
//   postHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   username: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   postImage: {
//     width: "100%",
//     height: 400,
//   },
//   caption: {
//     fontSize: 14,
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   likeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   likeCount: {
//     fontSize: 14,
//     color: "black",
//     marginLeft: 10,
//   },
//   postsList: {
//     paddingBottom: 20,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default HomeScreen;












// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// import { useSelector } from "react-redux";
// import { RootState } from "../screens/store/Store";
// import { db } from "../screens/store/firebaseconfig";
// import { collection, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { Post, UserProfile } from "../screens/types/HomeSceen"; // ✅ Import Types

// const HomeScreen = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [userProfiles, setUserProfiles] = useState<UserProfile>({});
//   const user = useSelector((state: RootState) => state.auth.user);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchPostsAndUsers = () => {
//       setLoading(true);
//       try {
//         const postsCollectionRef = collection(db, "posts");

//         const unsubscribe = onSnapshot(postsCollectionRef, async (postsSnapshot) => {
//           const postsData: Post[] = postsSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...(doc.data() as Omit<Post, "id">),
//             likes: doc.data()?.likes || [],
//           }));

//           setPosts(postsData);

//           const uniqueUserIds = [...new Set(postsData.map((post) => post.userId))];
//           const userProfilesData: UserProfile = {};

//           uniqueUserIds.forEach((userId) => {
//             const userDocRef = doc(db, "users", userId);
//             onSnapshot(userDocRef, (userDoc) => {
//               if (userDoc.exists()) {
//                 setUserProfiles((prev) => ({ ...prev, [userId]: userDoc.data() }));
//               }
//             });
//           });
//         });

//         return () => unsubscribe();
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPostsAndUsers();
//   }, []);

//   const handleLikeToggle = async (postId: string, currentLikes: string[]) => {
//     if (!user) return;

//     const postRef = doc(db, "posts", postId);
//     const isLiked = currentLikes.includes(user.uid);

//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               likes: isLiked
//                 ? post.likes.filter((uid: string) => uid !== user.uid)
//                 : [...post.likes, user.uid],
//             }
//           : post
//       )
//     );

//     try {
//       await updateDoc(postRef, {
//         likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
//       });
//     } catch (error) {
//       console.error("Error updating likes:", error);
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId
//             ? {
//                 ...post,
//                 likes: isLiked
//                   ? [...post.likes, user.uid]
//                   : post.likes.filter((uid: string) => uid !== user.uid),
//               }
//             : post
//         )
//       );
//     }
//   };

//   const handleProfileClick = (profileUserId: string) => {
//     if (profileUserId === user?.uid) {
//       navigation.navigate("OwnProfile");
//     } else {
//       navigation.navigate("OtherUserProfile", { userId: profileUserId });
//     }
//   };

//   const renderPost = ({ item }: { item: Post }) => {
//     const userData = userProfiles[item.userId];
//     const isLiked = item.likes.includes(user?.uid || "");

//     return (
//       <View style={styles.postContainer}>
//         <View style={styles.postHeader}>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)}>
//             <Image source={{ uri: userData?.profilePicture || "https://via.placeholder.com/40" }} style={styles.profileImage} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)} style={styles.userInfo}>
//             <Text style={styles.username}>{userData?.username || "Unknown User"}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="ellipsis-horizontal" size={22} color="black" />
//           </TouchableOpacity>
//         </View>

//         <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

//         <Text style={styles.caption}>{item.caption}</Text>

//         <View style={styles.likeContainer}>
//           <TouchableOpacity onPress={() => handleLikeToggle(item.id, item.likes)}>
//             <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "red" : "black"} />
//           </TouchableOpacity>
//           <Text style={styles.likeCount}>{item.likes.length} Likes</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require("../../assets/Instagram-logo.png")} style={styles.logo} />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
//       ) : (
//         <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={renderPost} contentContainerStyle={styles.postsList} showsVerticalScrollIndicator={false} />
//       )}
//     </View>
//   );
// };

// // 🖌️ Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 20,
//   },
//   logo: {
//     width: 140,
//     height: 40,
//     resizeMode: "contain",
//     top: 7,
//   },
//   header: {
//     width: "100%",
//     height: 75,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FAFAFA",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   postContainer: {
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     paddingBottom: 10,
//   },
//   postHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   username: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   postImage: {
//     width: "100%",
//     height: 400,
//   },
//   caption: {
//     fontSize: 14,
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   likeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   likeCount: {
//     fontSize: 14,
//     color: "black",
//     marginLeft: 10,
//   },
//   postsList: {
//     paddingBottom: 20,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default HomeScreen;






// import React from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Post } from "../types/HomeSceen"; // Import the Post type
// import { useHomeScreen } from "../hooks/useHomeScreen"; // Import the custom hook

// const HomeScreen = () => {
//   const { posts, loading, userProfiles, handleLikeToggle, handleProfileClick, user } = useHomeScreen();

//   const renderPost = ({ item }: { item: Post }) => {
//     const userData = userProfiles[item.userId];
//     const isLiked = item.likes.includes(user?.uid || "");

//     return (
//       <View style={styles.postContainer}>
//         <View style={styles.postHeader}>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)}>
//             <Image source={{ uri: userData?.profilePicture || "https://via.placeholder.com/40" }} style={styles.profileImage} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)} style={styles.userInfo}>
//             <Text style={styles.username}>{userData?.username || "Unknown User"}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="ellipsis-horizontal" size={22} color="black" />
//           </TouchableOpacity>
//         </View>

//         <Image source={{ uri: item.imageUrl }} style={styles.postImage} />

//         <Text style={styles.caption}>{item.caption}</Text>

//         <View style={styles.likeContainer}>
//           <TouchableOpacity onPress={() => handleLikeToggle(item.id, item.likes)}>
//             <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "red" : "black"} />
//           </TouchableOpacity>
//           <Text style={styles.likeCount}>{item.likes.length} Likes</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require("../../assets/Instagram-logo.png")} style={styles.logo} />
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
//       ) : (
//         <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={renderPost} contentContainerStyle={styles.postsList} showsVerticalScrollIndicator={false} />
//       )}
//     </View>
//   );
// };

// // 🖌️ Styles (same styles as before)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 20,
//   },
//   logo: {
//     width: 140,
//     height: 40,
//     resizeMode: "contain",
//     top: 7,
//   },
//   header: {
//     width: "100%",
//     height: 75,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FAFAFA",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   postContainer: {
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     paddingBottom: 10,
//   },
//   postHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   username: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   postImage: {
//     width: "100%",
//     height: 400,
//   },
//   caption: {
//     fontSize: 14,
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   likeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingTop: 5,
//   },
//   likeCount: {
//     fontSize: 14,
//     color: "black",
//     marginLeft: 10,
//   },
//   postsList: {
//     paddingBottom: 35,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });



// export default HomeScreen;









import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../types/HomeSceen"; // Import the Post type
import { useHomeScreen } from "../hooks/useHomeScreen"; // Import the custom hook

// ✅ Custom Image Loader
const PostImage = ({ uri }: { uri: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ position: "relative" }}>
      {loading && (
        <ActivityIndicator 
          size="large" 
          color="#3498db" 
          style={styles.loadingIndicator} 
        />
      )}
      <Image 
        source={{ uri, cache: "force-cache" }} 
        style={styles.postImage} 
        onLoad={() => setLoading(false)} 
        onError={() => setLoading(false)} 
      />
    </View>
  );
};

const HomeScreen = () => {
  const { posts, loading, userProfiles, handleLikeToggle, handleProfileClick, user } = useHomeScreen();

  const renderPost = ({ item }: { item: Post }) => {
    const userData = userProfiles[item.userId];
    const isLiked = item.likes.includes(user?.uid || "");

    return (
      <View style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <TouchableOpacity onPress={() => handleProfileClick(item.userId)}>
            <Image source={{ uri: userData?.profilePicture || "https://via.placeholder.com/40" }} style={styles.profileImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleProfileClick(item.userId)} style={styles.userInfo}>
            <Text style={styles.username}>{userData?.username || "Unknown User"}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={22} color="black" />
          </TouchableOpacity>
        </View>

        {/* ✅ Optimized Image Loading */}
        <PostImage uri={item.imageUrl} />

        {/* Caption */}
        <Text style={styles.caption}>{item.caption}</Text>

        {/* Like Button */}
        <View style={styles.likeContainer}>
          <TouchableOpacity onPress={() => handleLikeToggle(item.id, item.likes)}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "red" : "black"} />
          </TouchableOpacity>
          <Text style={styles.likeCount}>{item.likes.length} Likes</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/Instagram-logo.png")} style={styles.logo} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />
      ) : (
        <FlatList 
          data={posts} 
          keyExtractor={(item) => item.id} 
          renderItem={renderPost} 
          contentContainerStyle={styles.postsList} 
          showsVerticalScrollIndicator={false} 
        />
      )}
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: "contain",
    top: 7,
  },
  header: {
    width: "100%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  caption: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  likeCount: {
    fontSize: 14,
    color: "black",
    marginLeft: 10,
  },
  postsList: {
    paddingBottom: 35,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
