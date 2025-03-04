import React from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useHomeScreen } from "../hooks/useHomeScreen"; 
import PostCard from "../components/postHeader/PostHeader";

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
