
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { storage, db } from "./store/firebaseconfig"; // Firebase config
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store/Store';
// import { addPost, Post } from './store/slices/PostSlice';
// import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Firestore
// import { Ionicons } from '@expo/vector-icons';

// const UploadScreen = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const dispatch = useDispatch();
//   const [caption, setCaption] = useState<string>('');
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleImagePicker = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permission.granted) {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         quality: 1,
//         base64: true,
//       });
//       if (!result.canceled) {
//         setImageUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setImageUri(null);
//     setCaption('');
//   };

//   const handleUpload = async () => {
//     if (!imageUri || !user) {
//       Alert.alert("Error", "Please select an image first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const post = {
//         userId: user.uid,
//         caption,
//         imageUrl: imageUri, 
//         createdAt: serverTimestamp(),
//       };

//       await addDoc(collection(db, "posts"), post);
//       dispatch(addPost(post as Post));

//       setCaption('');
//       setImageUri(null);
//       Alert.alert("Success", "Post uploaded successfully!");
//     } catch (error) {
//       if (error instanceof Error) {
//         Alert.alert("Upload Failed", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
      
//       {/* Gray Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleCancel}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Images⌄</Text>
//         <View style={{ width: 60 }} /> {/* Empty Space for Centering */}
//       </View>

//       {/* Image Upload Box */}
//       <TouchableOpacity onPress={handleImagePicker} style={styles.uploadBox}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
//         ) : (
//           <View style={styles.uploadPlaceholder}>
//             <Ionicons name="cloud-upload-outline" size={40} color="black" />
//             <Text style={styles.uploadText}>Upload Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       {/* Post Description */}
//       <Text style={styles.label}>Post Description</Text>
//       <TextInput
//         value={caption}
//         onChangeText={setCaption}
//         placeholder="Add post description"
//         style={styles.input}
//       />

//       {/* Upload Button */}
//       <TouchableOpacity onPress={handleUpload} disabled={loading} style={styles.uploadButton}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.uploadButtonText}>Upload</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default UploadScreen;

// // ======= CSS Styles =======
// const styles = {
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#F7F7F7', // Gray Background
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     width:"120%", 
//     right: 20, // Ensures it aligns to the right
//   },
//   cancelText: {
//     fontSize: 16,
//     color: 'black',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   uploadBox: {
//     borderWidth: 1,
//     borderStyle: 'dashed',
//     borderRadius: 10,
//     borderColor: '#ccc',
//     width: '100%',
//     height: 434,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   uploadedImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   uploadPlaceholder: {
//     alignItems: 'center',
//   },
//   uploadText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: 'black',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   uploadButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// };




















// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { storage, db } from "./store/firebaseconfig"; // Firebase config
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store/Store';
// import { addPost } from './store/slices/PostSlice';
// import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Firestore
// import { Ionicons } from '@expo/vector-icons';
// import { Post } from '../screens/types/PostSceen'; // Importing types

// const UploadScreen = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const dispatch = useDispatch();
//   const [caption, setCaption] = useState<string>('');
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleImagePicker = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permission.granted) {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         quality: 1,
//         base64: true,
//       });
//       if (!result.canceled) {
//         setImageUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setImageUri(null);
//     setCaption('');
//   };

//   const handleUpload = async () => {
//     if (!imageUri || !user) {
//       Alert.alert("Error", "Please select an image first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const post: Post = {
//         userId: user.uid,
//         caption,
//         imageUrl: imageUri, 
//         createdAt: serverTimestamp(),
//       };

//       await addDoc(collection(db, "posts"), post);
//       dispatch(addPost(post));

//       setCaption('');
//       setImageUri(null);
//       Alert.alert("Success", "Post uploaded successfully!");
//     } catch (error) {
//       if (error instanceof Error) {
//         Alert.alert("Upload Failed", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
      
//       {/* Gray Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleCancel}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Images⌄</Text>
//         <View style={{ width: 60 }} /> {/* Empty Space for Centering */}
//       </View>

//       {/* Image Upload Box */}
//       <TouchableOpacity onPress={handleImagePicker} style={styles.uploadBox}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
//         ) : (
//           <View style={styles.uploadPlaceholder}>
//             <Ionicons name="cloud-upload-outline" size={40} color="black" />
//             <Text style={styles.uploadText}>Upload Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       {/* Post Description */}
//       <Text style={styles.label}>Post Description</Text>
//       <TextInput
//         value={caption}
//         onChangeText={setCaption}
//         placeholder="Add post description"
//         style={styles.input}
//       />

//       {/* Upload Button */}
//       <TouchableOpacity onPress={handleUpload} disabled={loading} style={styles.uploadButton}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.uploadButtonText}>Upload</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default UploadScreen;

// // ======= CSS Styles =======
// const styles = {
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#F7F7F7', // Gray Background
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     width:"120%", 
//     right: 20, // Ensures it aligns to the right
//   },
//   cancelText: {
//     fontSize: 16,
//     color: 'black',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   uploadBox: {
//     borderWidth: 1,
//     borderStyle: 'dashed',
//     borderRadius: 10,
//     borderColor: '#ccc',
//     width: '100%',
//     height: 434,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   uploadedImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   uploadPlaceholder: {
//     alignItems: 'center',
//   },
//   uploadText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: 'black',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   uploadButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// };
 







// import React from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useUploadPost } from "../hooks/usePostScreenhook"; // 🔥 Importing the custom hook

// const UploadScreen = () => {
//   const { caption, setCaption, imageUri, handleImagePicker, handleCancel, handleUpload, loading } = useUploadPost();

//   return (
//     <View style={styles.container}>
//       {/* 🔥 Header with Cancel Option */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleCancel}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Images⌄</Text>
       
//       </View>

//       {/* 🖼 Image Upload Box */}
//       <TouchableOpacity onPress={handleImagePicker} style={styles.uploadBox}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
//         ) : (
//           <View style={styles.uploadPlaceholder}>
//             <Ionicons name="cloud-upload-outline" size={40} color="black" />
//             <Text style={styles.uploadText}>Upload Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       {/* 📝 Caption Input */}
//       <Text style={styles.label}>Post Description</Text>
//       <TextInput
//         value={caption}
//         onChangeText={setCaption}
//         placeholder="Add post description"
//         style={styles.input}
//       />

//       {/* 🚀 Upload Button */}
//       <TouchableOpacity onPress={handleUpload} disabled={loading} style={styles.uploadButton}>
//         {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.uploadButtonText}>Upload</Text>}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default UploadScreen;

// // ======= CSS Styles =======
// const styles = {
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#F7F7F7",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     width: "120%",
//     right: 20,
//   },
//   cancelText: {
//     fontSize: 16,
//     color: "black",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   uploadBox: {
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 10,
//     borderColor: "#ccc",
//     width: "100%",
//     height: 434,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   uploadedImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   uploadPlaceholder: {
//     alignItems: "center",
//   },
//   uploadText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "black",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   uploadButton: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   uploadButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// };
























// import React from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";

// import { useUploadPost } from "../hooks/usePostScreenhook"; // Import the custom hook

// const UploadScreen = () => {
//   const { caption, setCaption, imageUri, handleImagePicker, handleCancel, handleUpload, loading } = useUploadPost();

//   return (
//     <View style={styles.container}>
//       {/* Header with Cancel Option */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleCancel}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Images⌄</Text>
//       </View>

//       {/*  Image Upload Box */}
//       <TouchableOpacity onPress={handleImagePicker} style={styles.uploadBox}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
//         ) : (
//           <View style={styles.uploadPlaceholder}>
//             <Image source={require("../../assets/Upload.png")} style={styles.uploadIcon} />
//             <Text style={styles.uploadText}>Upload Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       {/*  Caption Input */}
//       <Text style={styles.label}>Post Description</Text>
//       <TextInput
//         value={caption}
//         onChangeText={setCaption}
//         placeholder="Add post description"
//         style={styles.input}
//       />

//       {/*  Upload Button */}
//       <TouchableOpacity onPress={handleUpload} disabled={loading} style={styles.uploadButton}>
//         {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.uploadButtonText}>Upload</Text>}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default UploadScreen;

// //  Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#F7F7F7",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
    // width: "120%", 
    // right:20,
//     bottom:4,
//   },
//   cancelText: {
//     fontSize: 16,
//     color: "black",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     right:145,
//   },
//   uploadBox: {
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 10,
//     borderColor: "#ccc",
//     width: "100%",
//     height: 434,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   uploadedImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   uploadPlaceholder: {
//     alignItems: "center",
//   },
//   uploadText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "black",
//   },

//   uploadIcon: {
//     width: 50, // ✅ Adjust size as needed
//     height: 50,
//     resizeMode: "contain",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   uploadButton: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   uploadButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });












import React from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";

import { useUploadPost } from "../hooks/usePostScreenhook"; // Import the custom hook

const UploadScreen = () => {
  const { caption, setCaption, imageUri, handleImagePicker, handleCancel, handleUpload, loading } = useUploadPost();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {/* Header with Cancel Option */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Images⌄</Text>
          </View>

          {/* Image Upload Box */}
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

          {/* Caption Input */}
          <Text style={styles.label}>Post Description</Text>
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Add post description"
            style={styles.input}
            multiline
          />

          {/* Upload Button */}
          <TouchableOpacity onPress={handleUpload} disabled={loading} style={styles.uploadButton}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.uploadButtonText}>Upload</Text>}
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UploadScreen;

// Styles
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
    bottom:3,
    width: "120%", 
    right:20,


  },
  cancelText: {
    fontSize: 16,
    color: "black",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    right:150,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: "#ccc",
    width: "100%",
    height: 362,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    top:25,
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
    color: "black",
  },
  uploadIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    marginBottom: 25,
    top:15,
  },
  input: {
    
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    height: 50,
   backgroundColor: "#f5f5f5"
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    top:80,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
