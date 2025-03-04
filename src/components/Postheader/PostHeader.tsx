import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostCardProps } from "../../types/types";
import { getRelativeTime } from "../../utils/getTime";


const PostImage = ({ uri }: { uri: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ position: "relative" }}>
      {loading && <ActivityIndicator size="large" color="#3498db" style={styles.loadingIndicator} />}
      <Image source={{ uri, cache: "force-cache" }} style={styles.postImage} onLoad={() => setLoading(false)} />
    </View>
  );
};

const PostCard: React.FC<PostCardProps> = ({ item, userData, isLiked, handleProfileClick, handleLikeToggle }) => {
  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity onPress={() => handleProfileClick(item.userId)}>
          <Image source={{ uri: userData?.profileImage || "https://via.placeholder.com/40" }} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleProfileClick(item.userId)} style={styles.userInfo}>
          <Text style={styles.username}>{userData?.username || "Unknown User"}</Text>
          <Text style={styles.location}>
            {userData?.city && userData?.country ? `${userData.city}, ${userData.country}` : "FSD,Pakistan"}
       </Text>
 </TouchableOpacity>




        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={22} color="black" />
        </TouchableOpacity>
      </View>

      {/* ✅ Optimized Image Loading */}
      <PostImage uri={item.imageUrl} />

      {/* Caption */}
      
      <Text style={styles.caption}>
  <Text style={{ fontWeight: "bold" }}>{userData?.username || "Unknown User"}</Text>{" "}
   {item.caption}
 </Text>


  <Text style={{left:10, marginBottom:6,marginTop:6, color: "#808080"}}>{getRelativeTime({ seconds: item.createdAt })}</Text>

     

      {/* Like Button */}
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={() => handleLikeToggle(item.id)}>
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "red" : "black"} />
        </TouchableOpacity>
        <Text style={styles.likeCount}>{item.likes.length} Likes</Text>
      </View>
    </View>
  );
};

export default PostCard;

//  Styles
const styles = StyleSheet.create({
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
  location: {
    fontSize: 12,
    color: "black",
  },

  postImage: {
    width: "100%",
    height: 400,
  },
  caption: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 5,
    marginTop: 6,
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
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

