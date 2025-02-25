import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PostCardProps {
  item: {
    id: string;
    userId: string;
    imageUrl: string;
    caption: string;
    likes: string[];
  };
  userData: {
    username?: string;
    profileImage?: string;
  };
  isLiked: boolean;
  handleProfileClick: (userId: string) => void;
handleLikeToggle: (postId: string) => void;
}

// Custom Image Loader
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
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
