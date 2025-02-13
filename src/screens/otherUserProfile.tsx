// import React, { useEffect, useState } from "react";
// import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import { doc, getDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../screens/store/firebaseconfig";

// const OtherUserProfile = () => {
//   const route = useRoute();
//   const { userId } = route.params as { userId: string };
//   const [userData, setUserData] = useState<any>(null);
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userRef = doc(db, "users", userId);
//         const userSnap = await getDoc(userRef);

//         if (userSnap.exists()) {
//           setUserData(userSnap.data());
//         } else {
//           console.log("User not found");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     const fetchUserPosts = async () => {
//       try {
//         const postsRef = collection(db, "posts");
//         const postsSnap = await getDocs(postsRef);
//         const userPosts = postsSnap.docs
//           .map((doc) => ({ id: doc.id, ...(doc.data() as { userId: string; imageUrl: string }) }))
//           .filter((post) => post.userId === userId);

//         setPosts(userPosts);
//       } catch (error) {
//         console.error("Error fetching user posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//     fetchUserPosts();
//   }, [userId]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />;
//   }

//   return (
//     <View style={styles.container}>
//       {userData ? (
//         <>
//           <View style={styles.profileHeader}>
//             <Text style={styles.username}>{userData.username}</Text>
//             <Image source={{ uri: userData.profilePicture || "https://via.placeholder.com/100" }} style={styles.profileImage} />
//             <Text style={styles.name}>{userData.name || "No name available."}</Text>
//             <Text style={styles.bio}>{userData.bio || "No bio available."}</Text>
//           </View>

//           <Image source={require("./constants/assets/Tabs.png")} style={styles.fixedImage} />

//           <ScrollView style={styles.scrollViewContainer}>
//             {posts.length > 0 ? (
//               <FlatList
//                 data={posts}
//                 keyExtractor={(item) => item.id}
//                 numColumns={3}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity>
//                     <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
//                   </TouchableOpacity>
//                 )}
//                 contentContainerStyle={styles.flatListContent}
//               />
//             ) : (
//               <Text style={styles.noPosts}>No posts available.</Text>
//             )}
//           </ScrollView>
//         </>
//       ) : (
//         <Text style={styles.noUser}>User not found.</Text>
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
//   profileHeader: {
//     alignItems: "center",
//     padding: 20,
//   },
//   username: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   bio: {
//     fontSize: 14,
//     color: "gray",
//     marginTop: 5,
//     textAlign: "center",
//     paddingHorizontal: 20,
//   },
//   postImage: {
//     width: 120,
//     height: 120,
//     margin: 2,
//     top:24,
//   },
//   scrollViewContainer: {
//     flex: 1,
//     marginTop: 22,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   noPosts: {
//     textAlign: "center",
//     color: "gray",
//     marginTop: 20,
//   },
//   noUser: {
//     textAlign: "center",
//     fontSize: 16,
//     marginTop: 20,
//     color: "red",
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   fixedImage: {
//     position: "absolute",
//     top: 216,
//     width: "100%",
//     height: 40,
//   },
// });

// export default OtherUserProfile;












// import React, { useEffect, useState } from "react";
// import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import { doc, getDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../screens/store/firebaseconfig";
// import { OtherUserProfileScreenProps, UserProfile, Post } from "../screens/types/OtherUserProfile"; // Import types

// const OtherUserProfile = () => {
//   const route = useRoute<OtherUserProfileScreenProps["route"]>();
//   const { userId } = route.params;

//   const [userData, setUserData] = useState<UserProfile | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const userRef = doc(db, "users", userId);
//         const userSnap = await getDoc(userRef);

//         if (userSnap.exists()) {
//           setUserData(userSnap.data() as UserProfile);
//         } else {
//           console.log("User not found");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     const fetchUserPosts = async () => {
//       try {
//         const postsRef = collection(db, "posts");
//         const postsSnap = await getDocs(postsRef);
//         const userPosts = postsSnap.docs
//           .map((doc) => ({ ...(doc.data() as Post), id: doc.id }))
//           .filter((post) => post.userId === userId);

//         setPosts(userPosts);
//       } catch (error) {
//         console.error("Error fetching user posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//     fetchUserPosts();
//   }, [userId]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />;
//   }

//   return (
//     <View style={styles.container}>
//       {userData ? (
//         <>
//           <View style={styles.profileHeader}>
//             <Text style={styles.username}>{userData.username}</Text>
//             <Image source={{ uri: userData.profilePicture || "https://via.placeholder.com/100" }} style={styles.profileImage} />
//             <Text style={styles.name}>{userData.name || "No name available."}</Text>
//             <Text style={styles.bio}>{userData.bio || "No bio available."}</Text>
//           </View>

//           <Image source={require("./constants/assets/Tabs.png")} style={styles.fixedImage} />

//           <ScrollView style={styles.scrollViewContainer}>
//             {posts.length > 0 ? (
//               <FlatList
//                 data={posts}
//                 keyExtractor={(item) => item.id}
//                 numColumns={3}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity>
//                     <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
//                   </TouchableOpacity>
//                 )}
//                 contentContainerStyle={styles.flatListContent}
//               />
//             ) : (
//               <Text style={styles.noPosts}>No posts available.</Text>
//             )}
//           </ScrollView>
//         </>
//       ) : (
//         <Text style={styles.noUser}>User not found.</Text>
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
//   profileHeader: {
//     alignItems: "center",
//     padding: 20,
//   },
//   username: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   bio: {
//     fontSize: 14,
//     color: "gray",
//     marginTop: 5,
//     textAlign: "center",
//     paddingHorizontal: 20,
//   },
//   postImage: {
//     width: 120,
//     height: 120,
//     margin: 2,
//     top: 24,
//   },
//   scrollViewContainer: {
//     flex: 1,
//     marginTop: 22,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   noPosts: {
//     textAlign: "center",
//     color: "gray",
//     marginTop: 20,
//   },
//   noUser: {
//     textAlign: "center",
//     fontSize: 16,
//     marginTop: 20,
//     color: "red",
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   fixedImage: {
//     position: "absolute",
//     top: 216,
//     width: "100%",
//     height: 40,
//   },
// });

// export default OtherUserProfile;







import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import useOtherUserProfile from "../hooks/useOtherUserProfile"; // Import custom hook
import { OtherUserProfileScreenProps } from "../types/OtherUserProfile"; // Import types

const OtherUserProfile = () => {
  const route = useRoute<OtherUserProfileScreenProps["route"]>();
  const { userId } = route.params;

  const { userData, posts, loading } = useOtherUserProfile(userId);

  if (loading) {
    return <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <View style={styles.profileHeader}>
            <Text style={styles.username}>{userData.username}</Text>
            <Image source={{ uri: userData.profilePicture || "https://via.placeholder.com/100" }} style={styles.profileImage} />
            <Text style={styles.name}>{userData.name || "No name available."}</Text>
            <Text style={styles.bio}>{userData.bio || "No bio available."}</Text>
          </View>

          <Image source={require("./constants/assets/Tabs.png")} style={styles.fixedImage} />

          <ScrollView style={styles.scrollViewContainer}>
            {posts.length > 0 ? (
              <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatListContent}
              />
            ) : (
              <Text style={styles.noPosts}>No posts available.</Text>
            )}
          </ScrollView>
        </>
      ) : (
        <Text style={styles.noUser}>User not found.</Text>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  bio: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  postImage: {
    width: 120,
    height: 120,
    margin: 2,
    top: 24,
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 22,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  noPosts: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
  noUser: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "red",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fixedImage: {
    position: "absolute",
    top: 216,
    width: "100%",
    height: 40,
  },
});

export default OtherUserProfile;
