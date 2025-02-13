
// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, FlatList, 
//   StyleSheet, ActivityIndicator, Modal 
// } from "react-native";
// import { useSelector } from "react-redux";
// import { RootState } from "../screens/store/Store";
// import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
// import { db, auth } from "../screens/store/firebaseconfig"; // ✅ Import auth for logout
// import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
// import { RootStackParamList } from "../hooks/useNavigation";
// import Ionicons from "react-native-vector-icons/Ionicons"; // ✅ Added Icons

// const ProfileScreen = () => {
//   const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const navigation = useNavigation();

//   const userId = route.params?.userId || user?.uid; 
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [posts, setPosts] = useState<string[]>([]);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const [menuVisible, setMenuVisible] = useState(false); // ✅ For logout menu

//   useEffect(() => {
//     if (!userId) return;

//     console.log("Fetching profile for user:", userId);

//     // Fetch profile data
//     const userDocRef = doc(db, "users", userId);
//     const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         setUsername(userData.username || "No Username");
//         setName(userData.name || "No Name");
//         setBio(userData.bio || "No Bio");
//         setProfileImage(userData.profilePicture || "https://via.placeholder.com/100");
//       }
//       setLoadingProfile(false);
//     });

//     // Fetch user posts
//     const postsRef = collection(db, "posts");
//     const q = query(postsRef, where("userId", "==", userId));
//     const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
//       const userPosts = querySnapshot.docs.map((doc) => doc.data().imageUrl);
//       setPosts(userPosts);
//       setLoadingPosts(false);
//     });

//     return () => {
//       unsubscribeProfile();
//       unsubscribePosts();
//     };
//   }, [userId]);

//   // ✅ Handle User Logout
//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "Login" }], // Navigate to Login Screen
//       });
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   if (loadingProfile) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#3498db" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* 🔥 Header with Logout Menu */}
//       <View style={styles.header}>
//         <Text style={styles.username}>{username}</Text>

//         {/* 3 Dots Menu */}
//         <TouchableOpacity onPress={() => setMenuVisible(true)}>
//           <Ionicons name="ellipsis-vertical" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Logout Menu Modal */}
//       <Modal visible={menuVisible} transparent animationType="fade">
//         <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
//           <View style={styles.menu}>
//             <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
//               <Text style={styles.menuText}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       <View style={styles.profileHeader}>
//         <View style={styles.profileImageContainer}>
//           <Image source={{ uri: profileImage }} style={styles.profileImage} />
//         </View>
//         <Text style={styles.name}>{name}</Text>
//         <Text style={styles.bio}>{bio}</Text>

//         {/* Edit Profile Button (Visible only for logged-in user) */}
//         {user?.uid === userId && (
//           <TouchableOpacity
//             style={styles.editProfileButton}
//             onPress={() => navigation.navigate("EditProfile", { username, name, bio, profileImage })}
//           >
//             <Text style={styles.editProfileText}>Edit Profile</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <Image source={require("./constants/assets/Tabs.png")} style={styles.fixedImage} />

//       {loadingPosts ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3498db" />
//         </View>
//       ) : posts.length === 0 ? (
//         <Text style={styles.noPostsText}>No posts yet</Text>
//       ) : (
//         <FlatList
//           data={posts}
//           numColumns={3}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <Image source={{ uri: item || "https://via.placeholder.com/120" }} style={styles.postImage} />
//           )}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 10 },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginTop: 30 },
//   profileHeader: { alignItems: "center", marginBottom: 20, marginTop: 10 },
//   username: { fontSize: 20, fontWeight: "bold", marginBottom: 5,  left:80,},
//   profileImageContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: "black",
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//     marginBottom: 10,
//   },
//   profileImage: { width: 110, height: 110, borderRadius: 55 },
//   name: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
//   bio: { fontSize: 14, color: "black", textAlign: "center", marginHorizontal: 20 },
//   editProfileButton: { borderWidth: 1, borderColor: "grey", width: 320, padding: 10, borderRadius: 6, marginTop: 15 },
//   editProfileText: { color: "black", fontWeight: "bold", fontSize: 18, textAlign: "center" },
//   fixedImage: { maxWidth: "100%", height: 40, marginTop: 10, borderRadius: 0 },
//   postImage: { width: "32%", height: 120, margin: 2, borderRadius: 1 },
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   noPostsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },

//   // 🔥 Styles for Logout Menu
//   modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
//   menu: { backgroundColor: "#fff", padding: 15, borderRadius: 8, width: 120, alignItems: "center" },
//   menuItem: { padding: 10 },
//   menuText: { fontSize: 16, fontWeight: "bold", color: "red" },
// });

// export default ProfileScreen;












// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, FlatList, 
//   StyleSheet, ActivityIndicator, Modal 
// } from "react-native";
// import { useSelector } from "react-redux";
// import { RootState } from "../screens/store/Store";
// import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
// import { db, auth } from "../screens/store/firebaseconfig";
// import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
// import { UserProfile, Post, RootStackParamList } from "../screens/types/ProfileScreentype";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const ProfileScreen = () => {
//   const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const navigation = useNavigation();

//   const userId = route.params?.userId || user?.uid; 
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const [menuVisible, setMenuVisible] = useState(false);

//   useEffect(() => {
//     if (!userId) return;

//     const userDocRef = doc(db, "users", userId);
//     const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setProfile(docSnap.data() as UserProfile);
//       }
//       setLoadingProfile(false);
//     });

//     const postsRef = collection(db, "posts");
//     const q = query(postsRef, where("userId", "==", userId));
//     const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
//       const userPosts = querySnapshot.docs.map((doc) => doc.data() as Post);
//       setPosts(userPosts);
//       setLoadingPosts(false);
//     });

//     return () => {
//       unsubscribeProfile();
//       unsubscribePosts();
//     };
//   }, [userId]);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigation.reset({ index: 0, routes: [{ name: "Login" }] });
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   if (loadingProfile) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#3498db" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.username}>{profile?.username}</Text>
//         <TouchableOpacity onPress={() => setMenuVisible(true)}>
//           <Ionicons name="ellipsis-vertical" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       <Modal visible={menuVisible} transparent animationType="fade">
//         <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
//           <View style={styles.menu}>
//             <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
//               <Text style={styles.menuText}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       <View style={styles.profileHeader}>
//         <View style={styles.profileImageContainer}>
//           <Image source={{ uri: profile?.profilePicture || "https://via.placeholder.com/100" }} style={styles.profileImage} />
//         </View>
//         <Text style={styles.name}>{profile?.name}</Text>
//         <Text style={styles.bio}>{profile?.bio}</Text>

//         {user?.uid === userId && (
//           <TouchableOpacity
//             style={styles.editProfileButton}
//             onPress={() => navigation.navigate("EditProfile", profile)}
//           >
//             <Text style={styles.editProfileText}>Edit Profile</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <Image source={require("./constants/assets/Tabs.png")} style={styles.fixedImage} />

//       {loadingPosts ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3498db" />
//         </View>
//       ) : posts.length === 0 ? (
//         <Text style={styles.noPostsText}>No posts yet</Text>
//       ) : (
//         <FlatList
//           data={posts}
//           numColumns={3}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <Image source={{ uri: item.imageUrl || "https://via.placeholder.com/120" }} style={styles.postImage} />
//           )}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 10 },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginTop: 30 },
//   username: { fontSize: 20, fontWeight: "bold", marginBottom: 5, left: 80 },
//   profileHeader: { alignItems: "center", marginBottom: 20, marginTop: 10 },
//   profileImageContainer: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "black", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 10 },
//   profileImage: { width: 110, height: 110, borderRadius: 55 },
//   name: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
//   bio: { fontSize: 14, color: "black", textAlign: "center", marginHorizontal: 20 },
//   editProfileButton: { borderWidth: 1, borderColor: "grey", width: 320, padding: 10, borderRadius: 6, marginTop: 15 },
//   editProfileText: { color: "black", fontWeight: "bold", fontSize: 18, textAlign: "center" },
//   fixedImage: { maxWidth: "100%", height: 40, marginTop: 10, borderRadius: 0 },
//   postImage: { width: "32%", height: 120, margin: 2, borderRadius: 1 },
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   noPostsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
//   modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
//   menu: { backgroundColor: "#fff", padding: 15, borderRadius: 8, width: 120, alignItems: "center" },
//   menuItem: { padding: 10 },
//   menuText: { fontSize: 16, fontWeight: "bold", color: "red" },
// });

// export default ProfileScreen;


















// import React, { useState } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, FlatList, 
//   StyleSheet, ActivityIndicator, Modal 
// } from "react-native";
// import { useSelector } from "react-redux";
// import { RootState } from "../screens/store/Store";
// import { auth } from "../screens/store/firebaseconfig";
// import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
// import { RootStackParamList } from "../types/ProfileScreentype";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useProfile } from "../hooks/useProfile"; // Import custom hook

// const ProfileScreen = () => {
//   const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const navigation = useNavigation();

//   const userId = route.params?.userId || user?.uid; 
//   const { profile, posts, loadingProfile, loadingPosts } = useProfile(userId);
//   const [menuVisible, setMenuVisible] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigation.reset({ index: 0, routes: [{ name: "Login" }] });
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   if (loadingProfile) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#3498db" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View></View>
//         <Text style={styles.username}>{profile?.username}</Text>
//         <TouchableOpacity onPress={() => setMenuVisible(true)}>
//           <Ionicons name="ellipsis-vertical" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       <Modal visible={menuVisible} transparent animationType="fade">
//         <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
//           <View style={styles.menu}>
//             <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
//               <Text style={styles.menuText}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       <View style={styles.profileHeader}>
//         <View style={styles.profileImageContainer}>
//           <Image source={{ uri: profile?.profilePicture || "https://via.placeholder.com/100" }} style={styles.profileImage} />
//         </View>
//         <Text style={styles.name}>{profile?.name}</Text>
//         <Text style={styles.bio}>{profile?.bio}</Text>

//         {user?.uid === userId && (
//           <TouchableOpacity
//             style={styles.editProfileButton}
//             onPress={() => navigation.navigate("EditProfile", profile)}
//           >
//             <Text style={styles.editProfileText}>Edit Profile</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <Image source={require("./constants/assets/Tabs.png")} style={styles.fixedImage} />

//       {loadingPosts ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3498db" />
//         </View>
//       ) : posts.length === 0 ? (
//         <Text style={styles.noPostsText}>No posts yet</Text>
//       ) : (
//         <FlatList
//           data={posts}
//           numColumns={3}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <Image source={{ uri: item.imageUrl || "https://via.placeholder.com/120" }} style={styles.postImage} />
//           )}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );
// };
 
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 10 },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginTop: 30 },
//   username: { fontSize: 20, fontWeight: "bold", textAlign: 'center', },
//   profileHeader: { alignItems: "center", marginBottom: 20, marginTop: 10 },
//   profileImageContainer: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 10 },
//   profileImage: { width: 110, height: 110, borderRadius: 55 },
//   name: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
//   bio: { fontSize: 14, color: "black", textAlign: "center", marginHorizontal: 20 },
//   editProfileButton: { borderWidth: 1.5, borderColor: "#d3d3d3" ,  width: 320, padding: 10, borderRadius: 6, marginTop: 15,},
//   editProfileText: { color: "black", fontWeight: "bold", fontSize: 18, textAlign: "center", height:20,},
//   fixedImage: { maxWidth: "100%", height: 40, bottom:5, borderRadius: 0 },
//   postImage: { width: "32%", height: 150, margin: 2, borderRadius: 1, },
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   noPostsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
//   modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
//   menu: { backgroundColor: "#fff", padding: 15, borderRadius: 8, width: 120, alignItems: "center" },
//   menuItem: { padding: 10 },
//   menuText: { fontSize: 16, fontWeight: "bold", color: "red" },
// });

// export default ProfileScreen;


 
















import React, { useState } from "react";
import { 
  View, Text, Image, TouchableOpacity, FlatList, 
  StyleSheet, ActivityIndicator, Modal 
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../screens/store/Store";
import { auth } from "../screens/store/firebaseconfig";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/ProfileScreentype";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useProfile } from "../hooks/useProfile"; // Import custom hook

const ProfileScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation();

  const userId = route.params?.userId || user?.uid; 
  const { profile, posts, loadingProfile, loadingPosts } = useProfile(userId);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (loadingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View></View>
        <Text style={styles.username}>{profile?.username}</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Profile Section */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile?.profilePicture || "https://via.placeholder.com/100" }} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.bio}>{profile?.bio}</Text>

        {user?.uid === userId && (
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate("EditProfile", profile)}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs Image (Optional) */}
      <Image source={require("./constants/assets/Tabs.png")} style={styles.fixedImage} />

      {/* Posts Section */}
      <View style={{ flex: 1 }}>
        {loadingPosts ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
          </View>
        ) : posts.length === 0 ? (
          <Text style={styles.noPostsText}>No posts yet</Text>
        ) : (
          <FlatList
            data={posts}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item.imageUrl || "https://via.placeholder.com/120" }} style={styles.postImage} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }} // Fix last image cropping issue
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginTop: 30 },
  username: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  profileHeader: { alignItems: "center", marginBottom: 20, marginTop: 10 },
  profileImageContainer: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 10 },
  profileImage: { width: 110, height: 110, borderRadius: 55 },
  name: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
  bio: { fontSize: 14, color: "black", textAlign: "center", marginHorizontal: 20 },
  editProfileButton: { borderWidth: 1.5, borderColor: "#d3d3d3", width: 320, padding: 10, borderRadius: 6, marginTop: 15, height:45,},
  editProfileText: { color: "black", fontWeight: "bold", fontSize: 18, textAlign: "center" },
  fixedImage: { maxWidth: "100%", height: 40, bottom: 5, borderRadius: 0 },
  postImage: { width: "32%", height: 150, margin: 2, borderRadius: 1, resizeMode: "cover" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  noPostsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
  menu: { backgroundColor: "#fff", padding: 15, borderRadius: 8, width: 120, alignItems: "center" },
  menuItem: { padding: 10 },
  menuText: { fontSize: 16, fontWeight: "bold", color: "red" },
});

export default ProfileScreen;
