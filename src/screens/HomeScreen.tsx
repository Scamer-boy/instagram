
// import React, { useState } from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Post } from "../types/HomeSceen"; // Import the Post type
// import { useHomeScreen } from "../hooks/useHomeScreen"; // Import the custom hook


// // ✅ Custom Image Loader
// const PostImage = ({ uri }: { uri: string }) => {
//   const [loading, setLoading] = useState(true);

//   return (
//     <View style={{ position: "relative" }}>
//       {loading && (
//         <ActivityIndicator 
//           size="large" 
//           color="#3498db" 
//           style={styles.loadingIndicator} 
//         />
//       )}
//       <Image 
//         source={{ uri, cache: "force-cache" }} 
//         style={styles.postImage} 
//         onLoad={() => setLoading(false)} 
//         onError={() => setLoading(false)} 
//       />
//     </View>
//   );
// };

// const HomeScreen = () => {
//   const { posts, loading, userProfiles, handleLikeToggle, handleProfileClick, user } = useHomeScreen();

//   const renderPost = ({ item }: { item: Post }) => {
//     const userData = userProfiles[item.userId];
//     const isLiked = item.likes.includes(user?.uid || "");
  

//     return (
//       <View style={styles.postContainer}>
//         {/* Post Header */}
//         <View style={styles.postHeader}>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)}>
//             <Image source={{ uri: userData?.profileImage || "https://via.placeholder.com/40" }} style={styles.profileImage} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleProfileClick(item.userId)} style={styles.userInfo}>
//             <Text style={styles.username}>{userData?.username || "Unknown User"}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="ellipsis-horizontal" size={22} color="black" />
//           </TouchableOpacity>
//         </View>

//         {/* ✅ Optimized Image Loading */}
//         <PostImage uri={item.imageUrl} />

//         {/* Caption */}
//         <Text style={styles.caption}>{item.caption}</Text>

//         {/* Like Button */}
//         <View style={styles.likeContainer}>
//           <TouchableOpacity onPress={() => handleLikeToggle(item.id)}>
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
//         <FlatList 
//           data={posts} 
//           keyExtractor={(item) => item.id} 
//           renderItem={renderPost} 
//           contentContainerStyle={styles.postsList} 
//           showsVerticalScrollIndicator={false} 
//         />
//       )}
//     </View>
//   );
// };

// // ✅ Styles
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











import React from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useHomeScreen } from "../hooks/useHomeScreen"; //  Custom hook
import PostCard from "../components/Postheader/PostHeader"; //  Import PostCard

const HomeScreen = () => {
  const { posts, loading, userProfiles, handleLikeToggle, handleProfileClick, user } = useHomeScreen();

  const renderPost = ({ item }: { item: any }) => {
    const userData = userProfiles[item.userId];
    const isLiked = item.likes.includes(user?.uid || "");

    return (
      <PostCard
        item={item}
        userData={userData}
        isLiked={isLiked}
        handleProfileClick={handleProfileClick}
        handleLikeToggle={handleLikeToggle}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/*  Instagram Logo */}
      <View style={styles.header}>
        <Image source={require("../../assets/Instagram-logo.png")} style={styles.logo} />
      </View>

      {/*  Loading Indicator */}
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

//  Styles
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
