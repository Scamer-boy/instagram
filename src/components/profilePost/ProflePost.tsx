import React from "react";
import { Image, FlatList, StyleSheet, View, Text } from "react-native";

const ProfilePost = ({ posts }: { posts: any[] }) => {
  if (!posts || posts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No posts available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts.filter((item) => item && item.imageUrl)} 
      numColumns={3}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) =>
        item?.imageUrl ? ( 
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        ) : (
          <Image source={{ uri: "https://via.placeholder.com/120" }} style={styles.postImage} />
        )
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    />
  );
};

const styles = StyleSheet.create({
  postImage: {
    width: "32%",
    aspectRatio: 1,
    margin: "0.66%",
    borderRadius: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});

export default ProfilePost;











