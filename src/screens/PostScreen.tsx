
// import React from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
// } from "react-native";

// import { useUploadPost } from "../hooks/usePostScreenhook"; // Import the custom hook

// const UploadScreen = () => {
//   const { caption, setCaption, imageUri, handleImagePicker, handleCancel, handleUpload, loading } = useUploadPost();

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
//           {/* Header with Cancel Option */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={handleCancel}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Images⌄</Text>
//           </View>

//           {/* Image Upload Box */}
//           <TouchableOpacity onPress={handleImagePicker} style={styles.uploadBox}>
//             {imageUri ? (
//               <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
//             ) : (
//               <View style={styles.uploadPlaceholder}>
//                 <Image source={require("../../assets/Upload.png")} style={styles.uploadIcon} />
//                 <Text style={styles.uploadText}>Upload Image</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           {/* Caption Input */}
//           <Text style={styles.label}>Post Description</Text>
//           <TextInput
//             value={caption}
//             onChangeText={setCaption}
//             placeholder="Add post description"
//             style={styles.input}
//             multiline
//           />

//           {/* Upload Button */}
//           <TouchableOpacity onPress={handleUpload} disabled={loading} style={styles.uploadButton}>
//             {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.uploadButtonText}>Upload</Text>}
//           </TouchableOpacity>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default UploadScreen;

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollContainer: {
//     padding: 20,
//     flexGrow: 1,
//   },
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   backgroundColor: "#F7F7F7",
  //   paddingVertical: 15,
  //   paddingHorizontal: 20,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ccc",
  //   bottom:3,
  //   width: "120%", 
  //   right:20,


//   },
//   cancelText: {
//     fontSize: 16,
//     color: "black",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     right:150,
//   },
//   uploadBox: {
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderRadius: 10,
//     borderColor: "#ccc",
//     width: "100%",
//     height: 362,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     top:25,
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
//     width: 50,
//     height: 50,
//     resizeMode: "contain",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 25,
//     top:15,
//   },
//   input: {
    
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 20,
//     height: 50,
//    backgroundColor: "#f5f5f5"
//   },
//   uploadButton: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     top:80,
//   },
//   uploadButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });












import React from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";

import { useUploadPost } from "../hooks/usePostScreenhook"; //  Custom Hook Import
import Button from "../components/Buttons/Btn"; //  Reusable Button

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
            <Text style={styles.headerTitle}>Image⌄</Text>
            <View /> {/* Placeholder to center title */}
          </View>

          {/*  Image Upload Box */}
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

          {/*  Caption Input */}
          <Text style={styles.label}>Post Description</Text>
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Add post description..."
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
      bottom:3,
      width: "120%", 
      right:20,
    
  },
  cancelText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    right:40,
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
    backgroundColor: "#f9f9f9",
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
