import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { auth } from "../firebaseConfig/firebaseConfig";
import useNavigation from "../hooks/useNavigation";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/ProfileScreentype";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useProfile } from "../hooks/useProfile";
import EditProfileButton from "../components/button/EditProfileBtn";
import PostGrid from "../components/profilePost/ProflePost";
interface EditProfileButtonProps {
  username: string;
  name: string;
  bio: string;
  profileImage: string;
}
const ProfileScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { navigation } = useNavigation();

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
      <View style={styles.header}>
        <View></View>
        <Text style={styles.username}>{profile?.username}</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile?.profileImage || "https://via.placeholder.com/100" }} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.bio}>{profile?.bio}</Text>

        {user?.uid === userId && (
          <EditProfileButton
            username={profile?.username || ""}
            name={profile?.name || ""}
            bio={profile?.bio || ""}
            profileImage={profile?.profileImage || ""}
          />
        )}
      </View>

      <Image source={require("../../assets/Tabs.png")} style={styles.fixedImage} />

      <View style={{ flex: 1 }}>
        {loadingPosts ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
          </View>
        ) : posts.length === 0 ? (
          <Text style={styles.noPostsText}>No posts yet</Text>
        ) : (

          <PostGrid posts={posts} />
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
  profileImageContainer: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 10, borderColor: "grey" },
  profileImage: { width: 110, height: 110, borderRadius: 55 },
  name: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
  bio: { fontSize: 14, color: "black", textAlign: "center", marginHorizontal: 20 },
  fixedImage: { maxWidth: "100%", height: 40, bottom: 1, borderRadius: 0 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  noPostsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
  menu: { backgroundColor: "#fff", padding: 15, borderRadius: 8, width: 120, alignItems: "center" },
  menuItem: { padding: 10 },
  menuText: { fontSize: 16, fontWeight: "bold", color: "red" },
});

export default ProfileScreen;







































