
import React, { useState } from "react";
import {  View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Modal 
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { auth } from "../store/firebaseconfig";
import useNavigation from "../hooks/useNavigation";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/ProfileScreentype";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useProfile } from "../hooks/useProfile"; // Import custom hook
import EditProfileScreen from "./EditProfile";
import { useEditProfile } from "../hooks/useEditProfile";

const ProfileScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
  const user = useSelector((state: RootState) => state.auth.user);
  const {navigation} = useNavigation();

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

      {/* Profile Section*/}
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile?.profilePicture || "https://via.placeholder.com/100" }} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.bio}>{profile?.bio}</Text>

        {user?.uid === userId && (
          <TouchableOpacity
            style={styles.editProfileButton}
           // onPress={() => navigation.navigate("EditProfile", profile)}
           onPress={() => navigation.navigate("EditProfile" as never, { 
            username: profile?.username || "", 
            name: profile?.name || "", 
            bio: profile?.bio || "", 
            profileImage: profile?.profilePicture || ""
          } as never)}
          
           
          

          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View> 




      {/* Tabs Image (Optional) */}
      <Image source={require("../../assets/Tabs.png")} style={styles.fixedImage} />

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






















