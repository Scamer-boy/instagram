import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../store/firebaseconfig";
import { RootState } from "../store/Store";
import { addPost } from "../store/slices/PostSlice";
import { Post } from "../types/PostSceen"; // Importing types

export const useUploadPost = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [caption, setCaption] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //  Handle Image Selection
  const handleImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied", "Allow access to your photos to upload images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  //  Handle Cancel Action
  const handleCancel = () => {
    setImageUri(null);
    setCaption("");
  };

  //  Handle Upload
  const handleUpload = async () => {
    if (!imageUri || !user) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    setLoading(true);
    try {
      const post: Post = {
        userId: user.uid,
        caption,
        imageUrl: imageUri,
        createdAt: serverTimestamp(),
      };

      dispatch(addPost(post));
      await addDoc(collection(db, "posts"), post);

      setCaption("");
      setImageUri(null);
      Alert.alert("Success", "Post uploaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Upload Failed", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    caption,
    setCaption,
    imageUri,
    handleImagePicker,
    handleCancel,
    handleUpload,
    loading,
  };
};
