
import React from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";

import { useUploadPost } from "../hooks/usePostScreen"; 
import Button from "../components/button/Button"; 
import { FontAwesome } from "@expo/vector-icons";



const UploadScreen = () => {
  const { caption, setCaption, imageUri, handleImagePicker, handleCancel, handleUpload, loading } = useUploadPost();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          
         
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          
            <View style={styles.headerTitle}>
  <Text style={styles.headerTitle}>Image</Text>

  <FontAwesome name="angle-down" size={20} color="#000" right="17" bottom="12" />
</View>

          </View>

          
          <TouchableOpacity onPress={handleImagePicker} style={styles.uploadBox}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Image source={require("../../assets/Upload.png")} style={styles.uploadIcon} />
                <Text style={styles.uploadText}>Upload Image</Text>
              </View>
            )}
          </TouchableOpacity>

     
          <Text style={styles.label}>Post Description</Text>
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Add post description..."
            placeholderTextColor="#aaa" 
            style={styles.input}
            multiline
          />

<View style={{ marginTop: 50 }}>
  <Button 
    title="Upload" 
    onPress={handleUpload} 
    backgroundColor="#007AFF" 
    loading={loading} 
  />
</View>


        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UploadScreen;

//  Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
  
   
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#F7F7F7",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      bottom:10,
      width: "120%", 
      right:20,
    
  },
  cancelText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    top:10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    right:80,
    top:10,
  },
  dropdownIcon: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
    right:20,
    bottom:20,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: "#ccc",
    width: "100%",
    height: 360,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
   
    top:15,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  uploadPlaceholder: {
    alignItems: "center",
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  uploadIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
  },
 

});
