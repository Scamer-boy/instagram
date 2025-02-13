
// import React, { useState } from "react";
// import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserProfile } from "../screens/store/slices/ProfileSlice";
// import { db } from "../screens/store/firebaseconfig";
// import { doc, updateDoc } from "firebase/firestore";
// import { RootState, EditProfileScreenProps } from "../screens/types/EditProfile"; // Import types

// const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ route }) => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const {
//     name: initialName,
//     username: initialUsername,
//     bio: initialBio,
//     profileImage: initialProfileImage,
//     website: initialWebsite,
//     email: initialEmail,
//     phone: initialPhone,
//     gender: initialGender,
//   } = route.params || {};

//   const [name, setName] = useState(initialName || "");
//   const [username, setUsername] = useState(initialUsername || "");
//   const [bio, setBio] = useState(initialBio || "");
//   const [website, setWebsite] = useState(initialWebsite || "");
//   const [email, setEmail] = useState(initialEmail || "");
//   const [phone, setPhone] = useState(initialPhone || "");
//   const [gender, setGender] = useState(initialGender || "");
//   const [profileImage, setProfileImage] = useState(initialProfileImage || "");
//   const [loading, setLoading] = useState(false);
//   const [isChanged, setIsChanged] = useState(false);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.canceled) {
//       setProfileImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
//       setIsChanged(true);
//     }
//   };

//   const handleSave = async () => {
//     if (!isChanged) return;
//     setLoading(true);
//     try {
//       const userDocRef = doc(db, "users", user.uid);
//       await updateDoc(userDocRef, {
//         name,
//         username,
//         bio,
//         profilePicture: profileImage,
//         website,
//         email,
//         phone,
//         gender,
//       });

//       dispatch(
//         updateUserProfile({
//           uid: user.uid,
//           username,
//           bio,
//           profileImage,
//           website,
//           email,
//           phone,
//           gender,
//           name,
//         })
//       );
//       navigation.goBack();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Edit Profile</Text>
//         <TouchableOpacity onPress={handleSave} disabled={!isChanged || loading}>
//           <Text style={[styles.doneText, (!isChanged || loading) && { opacity: 0.5 }]}>
//             {loading ? "Saving..." : "Done"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.profileImageContainer}>
//         {profileImage ? (
//           <Image source={{ uri: profileImage }} style={styles.profileImage} />
//         ) : (
//           <Text>No image selected</Text>
//         )}
//         <TouchableOpacity onPress={pickImage}>
//           <Text style={styles.changePhotoText}>Change Profile Photo</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Name Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           value={name}
//           onChangeText={(text) => {
//             setName(text);
//             setIsChanged(true);
//           }}
//         />
//       </View>

//       {/* Username Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Username</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your username"
//           value={username}
//           onChangeText={(text) => {
//             setUsername(text);
//             setIsChanged(true);
//           }}
//         />
//       </View>

//       {/* Bio Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Bio</Text>
//         <TextInput
//           style={[styles.input, styles.descriptionInput]}
//           placeholder="Enter a short description"
//           value={bio}
//           onChangeText={(text) => {
//             setBio(text);
//             setIsChanged(true);
//           }}
//           multiline
//         />
//       </View>

//       {/* Website Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Website</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your website URL"
//           value={website}
//           onChangeText={(text) => {
//             setWebsite(text);
//             setIsChanged(true);
//           }}
//         />
//       </View>

//       {/* Private Info Section */}
//       <View style={styles.infoLine} />
//       <Text style={styles.privateInfo}>Private Information</Text>

//       {/* Email Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={(text) => {
//             setEmail(text);
//             setIsChanged(true);
//           }}
//         />
//       </View>

//       {/* Phone Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Phone</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your phone number"
//           value={phone}
//           onChangeText={(text) => {
//             setPhone(text);
//             setIsChanged(true);
//           }}
//         />
//       </View>

//       {/* Gender Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Gender</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your gender"
//           value={gender}
//           onChangeText={(text) => {
//             setGender(text);
//             setIsChanged(true);
//           }}
//         />
//       </View>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     paddingHorizontal: 20, // Increased padding for better spacing
//     backgroundColor: "#fff", 
//     paddingTop: 20, // Added some space at the top for better balance
    
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//    alignItems: "center",
//     paddingVertical: 18, // Slightly more padding for a more balanced header
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//     backgroundColor: "#F7F7F7", // Light background for the header
//     width:"110%",
//     right:15,
//    },
//   cancelText: { 
//     fontSize: 16, 
//     color: "black", 
//     fontWeight: "600", 
//     left:15,
//   },
//   headerTitle: { 
//     fontSize: 20,  // Increased title font size for better visibility
//     fontWeight: "700", 
//     color: "#333", 
    
//  },
//   doneText: { 
//     fontSize: 16, 
//     color: "#007AFF", 
//     fontWeight: "600", 
//     right:30,
//   },
//   profileImageContainer: { 
//     marginBottom: 10, 
//     alignItems: "center", 
//     justifyContent: "center",
//   },
//   profileImage: { 
//     width: 130, // Slightly increased size for profile image
//     height: 130, 
//     borderRadius: 65, 
//     marginBottom: 10, // Added more space at the bottom
//     borderWidth: 2, // Increased border width for more visibility
//     borderColor: "black", // Border around the image
//   },
//   changePhotoText: { 
//     color: "#007AFF", 
//     fontSize: 14,  // Increased font size for better emphasis
//     fontWeight: "600", 
//     marginTop: 2, // Increased margin for more space between image and text
//   },
//   label: { 
//     fontSize: 14, 
//     fontWeight: "500",  // Slightly bold label for clarity
//     color: "#333", 
//     marginBottom: 5,  // Increased space between label and input for better alignment
//     top:28,
//   },
//   inputContainer: {

//    flexDirection: "column",  // Align input fields in a column with label
//     marginBottom: -2,  // Space between inputs
  
//   },
//   input: {
//     height: 30, // Adjusted height for a more minimalistic look
//     borderBottomWidth: 1, // Adding bottom border for the line effect
//     borderBottomColor: "#D3D3D3", // Light grey for the line
//     fontSize: 14, 
//     backgroundColor: "transparent", // Transparent background for the line look
//     color: "#333", // Dark text color
//     paddingVertical: 5, // More padding to make the text more accessible
//     paddingLeft: 0, // No padding on the left for clean, minimalist look
//     marginLeft:100,
//     },
//   space: { 
//     height: 0, // Reduced space between fields for better alignment
//   },
//   descriptionInput: { 
//     height: 50, // Increased height for the bio input box
//     textAlignVertical: "top", 
//     backgroundColor: "transparent", // Transparent background
//     borderBottomWidth: 1, // Add bottom border for cleaner line look
//     borderBottomColor: "#D3D3D3", // Light grey line
//     paddingTop: 25, // Padding for comfort while typing
//     paddingLeft: 0, // Clean, minimalist padding
//     bottom:18,
  
//   },


//   changePasswordText: {
//     fontSize: 14, // Increased font size for better readability
//     marginTop: 25, // More space above the text
//     textAlign: "center",
//     fontWeight: "600",
//   },
  
//   privateInfo: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "black", 
//     position: "absolute", // Added position
//     top: 487, // Adjust as needed
//     left: 20, // Align it properly
//   },
  


//   bottomLine: {
//     width: "120%",
//     height: 1.5,
//     backgroundColor: "#ccc",
//     position: "absolute",
//    top:260,
  
//   },

//   infoLine:{
//    width:"120%",
//    height:1.5,
//    backgroundColor: "#ccc",
//    position: "absolute",
//   top:486,
// }
// });

// export default EditProfileScreen;














// import React from "react";
// import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useEditProfile } from "../hooks/useEditProfile";
// import { EditProfileScreenProps } from "../types/EditProfile";

// const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ route }) => {
//   const navigation = useNavigation();
//   const profileData = route.params || {};
//   const {
//     name, setName,
//     username, setUsername,
//     bio, setBio,
//     website, setWebsite,
//     email, setEmail,
//     phone, setPhone,
//     gender, setGender,
//     profileImage,
//     loading,
//     isChanged,
//     pickImage,
//     handleSave
//   } = useEditProfile(profileData, navigation);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.cancelText}>Cancel</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Edit Profile</Text>
//         <TouchableOpacity onPress={handleSave} disabled={!isChanged || loading}>
//           <Text style={[styles.doneText, (!isChanged || loading) && { opacity: 0.5 }]}>
//             {loading ? "Saving..." : "Done"}
//           </Text>
//         </TouchableOpacity>
//       </View>



//        <View style={styles.profileImageContainer}>
//         {profileImage ? (
//           <Image source={{ uri: profileImage }} style={styles.profileImage} />
//         ) : (
//           <View style={styles.defaultProfileImage} />
//         )}
//         <TouchableOpacity onPress={pickImage}>
//           <Text style={styles.changePhotoText}>Change Profile Photo</Text>
//         </TouchableOpacity>
//       </View>
// <View style={styles.bottomLine} />

//     {/*Name Input*/}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           value={name}
//           onChangeText={(text) => {
//             setName(text);
//           }}
//         />
//       </View>

//       {/* Username Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Username</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your username"
//           value={username}
//           onChangeText={(text) => {
//             setUsername(text);
//           }}
//         />
//       </View>

//       {/* Bio Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Bio</Text>
//         <TextInput
//           style={[styles.input, styles.descriptionInput]}
//           placeholder="Enter a short description"
//           value={bio}
//           onChangeText={(text) => {
//             setBio(text);
//           }}
//           multiline
//         />
//       </View>

//       {/* Website Input */}
//       <View style={styles.websiteContainer}>
//         <Text style={styles.websitelabel}>Website</Text>
//         <TextInput
//           style={styles.websiteinput}
//           placeholder="Enter your website URL"
//           value={website}
//           onChangeText={(text) => {
//             setWebsite(text);
//           }}
//         />
//       </View>

//       {/* Private Info Section */}
//       <View style={styles.infoLine} />
//       <Text style={styles.privateInfo}>Private Information</Text>

//       {/* Email Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={(text) => {
//             setEmail(text);
//           }}
//         />
//       </View>

//       {/* Phone Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Phone</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your phone number"
//           value={phone}
//           onChangeText={(text) => {
//             setPhone(text);
//           }}
//         />
//       </View>

//       {/* Gender Input */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Gender</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your gender"
//           value={gender}
//           onChangeText={(text) => {
//             setGender(text);
//           }}
//         />
//       </View>
//         {/* Reset Password Button (Moved Outside of Input Fields) */}
//         <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
//         <Text style={styles.changePasswordText}>
//           <Text style={{ color: "#666" }}>Want to change your password? </Text>
//           <Text style={{ color: "#007AFF" }}>Reset Password.</Text>
//         </Text>
//       </TouchableOpacity>
    
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     paddingHorizontal: 20, // Increased padding for better spacing
//     backgroundColor: "#fff", 
//     paddingTop: 20, // Added some space at the top for better balance
    
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//    alignItems: "center",
//     paddingVertical: 18, // Slightly more padding for a more balanced header
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//     backgroundColor: "#F7F7F7", // Light background for the header
//     width:"110%",
//     right:15,
//     bottom:1,
  
//    },
//   cancelText: { 
//     fontSize: 16, 
//     color: "black", 
//     fontWeight: "600", 
//     left:15,
//   },
//   headerTitle: { 
//     fontSize: 20,  // Increased title font size for better visibility
//     fontWeight: "700", 
//     color: "#333", 
//     },
//   doneText: { 
//     fontSize: 16, 
//     color: "#007AFF", 
//     fontWeight: "600", 
//     right:30,
//   },

//   profileImageContainer: { 
//     marginBottom: 10, 
//     alignItems: "center", 
//     justifyContent: "center",
//   },
//   profileImage: { 
//     width: 130, // Slightly increased size for profile image
//     height: 130, 
//     borderRadius: 65, 
//     marginBottom: 10, // Added more space at the bottom
//     borderWidth: 2, // Increased border width for more visibility
//     borderColor: "black", // Border around the image
//     top:8,
//   },
//   changePhotoText: { 
//     color: "#007AFF", 
//     fontSize: 14,  // Increased font size for better emphasis
//     fontWeight: "600", 
//     marginTop: 2, // Increased margin for more space between image and text
//   },
//   label: { 
//     fontSize: 14, 
//     fontWeight: "500",  // Slightly bold label for clarity
//     color: "#333", 
//     marginBottom: 5,  // Increased space between label and input for better alignment
//     top:28,
//   },
//   inputContainer: {

//    flexDirection: "column",  // Align input fields in a column with label
//     marginBottom: -2,  // Space between inputs
    
  
//   },
//   input: {
//     height: 30, // Adjusted height for a more minimalistic look
//     borderBottomWidth: 1, // Adding bottom border for the line effect
//     borderBottomColor: "#D3D3D3", // Light grey for the line
//     fontSize: 14, 
//     backgroundColor: "transparent", // Transparent background for the line look
//     color: "#333", // Dark text color
//     paddingVertical: 5, // More padding to make the text more accessible
//     paddingLeft: 0, // No padding on the left for clean, minimalist look
//     marginLeft:100,
//     },
//   space: { 
//     height: 0, // Reduced space between fields for better alignment
//   },
//   descriptionInput: { 
//     height: 50, // Increased height for the bio input box
//     textAlignVertical: "top", 
//     backgroundColor: "transparent", // Transparent background
//     borderBottomWidth: 1, // Add bottom border for cleaner line look
//     borderBottomColor: "#D3D3D3", // Light grey line
//     paddingTop: 25, // Padding for comfort while typing
//     paddingLeft: 0, // Clean, minimalist padding
//     bottom:18,
  
//   },
  // websiteContainer: {
  //   flexDirection: "column",  // Align input fields in a column with label
  //   marginBottom: 15,  // Space between inputs
  // },
  // websiteinput: {
  //   height: 40, // Adjusted height for a more minimalistic look
  //   //borderBottomWidth: 1, // Adding bottom border for the line effect
  //   borderBottomColor: "#D3D3D3", // Light grey for the line
  //   fontSize: 14, 
  //   backgroundColor: "transparent", // Transparent background for the line look
  //   color: "#333", // Dark text color
  //   paddingVertical: 5, // More padding to make the text more accessible
  //   paddingLeft: 0, // No padding on the left for clean, minimalist look
  //   marginLeft:100,
  //   bottom:15,
  // },
  
  // websitelabel: {
  //   fontSize: 14, 
  //   fontWeight: "500",  // Slightly bold label for clarity
  //   color: "#333", 
  //   marginBottom: 0,  // Increased space between label and input for better alignment
  //   top:13,
  // },
  
  

// changePasswordText: {
//     fontSize: 14, // Increased font size for better readability
//     marginTop: 25, // More space above the text
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   privateInfo: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "black", 
//     position: "absolute", // Added position
//     top: 487, // Adjust as needed
//     left: 20, // Align it properly
//   },
//   defaultProfileImage: { width: 130, height: 130, borderRadius: 65, backgroundColor: "transparent", borderWidth: 2, borderColor: "black" },

//   bottomLine: {
//     width: "120%",
//     height: 1.5,
//     backgroundColor: "#ccc",
//     position: "absolute",
//    top:260,
//    },
// infoLine:{
//    width:"120%",
//    height:1.5,
//    backgroundColor: "#ccc",
//    position: "absolute",
//   top:470,
// }
// });
// export default EditProfileScreen;





















import React from "react";
import { 
  View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView 
} from "react-native";
import  useNavigation  from "../hooks/useNavigation";
import { useEditProfile } from "../hooks/useEditProfile";
import { EditProfileScreenProps } from "../types/EditProfile";

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ route }) => {
const {navigation} = useNavigation();
  const profileData = route?.params || {};
  const {
    name, setName,
    username, setUsername,
    bio, setBio,
    website, setWebsite,
    email, setEmail,
    phone, setPhone,
    gender, setGender,
    profileImage,
    loading,
    isChanged,
    pickImage,
    handleSave
  } = useEditProfile(profileData, navigation);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={!isChanged || loading}>
          <Text style={[styles.doneText, (!isChanged || loading) && { opacity: 0.5 }]}>
            {loading ? "Saving..." : "Done"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.defaultProfileImage} />
          )}
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomLine} />

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Bio Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter a short description"
            value={bio}
            onChangeText={setBio}
            multiline
          />
        </View>

        {/* Website Input */}
        <View style={styles.websiteContainer}>
          <Text style={styles.websitelabel}>Website</Text>
          <TextInput
            style={styles.websiteinput}
            placeholder="Enter your website URL"
            value={website}
            onChangeText={setWebsite}
          />
        </View>

        {/* Private Info Section */}
        <View style={styles.infoLine} />
        <Text style={styles.privateInfo}>Private Information</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Gender Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your gender"
            value={gender}
            onChangeText={setGender}
          />
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={styles.changePasswordText}>
            Want to change your password? <Text style={{ color: "#007AFF" }}>Reset Password.</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 20,
    backgroundColor: "#fff", 
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#F7F7F7",
    width: "110%",
    right: 15,
    bottom: 1,
  },
  cancelText: { 
    fontSize: 16, 
    color: "black", 
    fontWeight: "600", 
    left: 15,
  },
  headerTitle: { 
    fontSize: 20,
    fontWeight: "700", 
    color: "#333", 
  },
  doneText: { 
    fontSize: 16, 
    color: "#007AFF", 
    fontWeight: "600", 
    right: 30,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  profileImageContainer: { 
    marginBottom: 10, 
    alignItems: "center", 
    justifyContent: "center",
  },
  profileImage: { 
    width: 130,
    height: 130, 
    borderRadius: 65, 
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: "grey",
    top: 8,
  },
  changePhotoText: { 
    color: "#007AFF", 
    fontSize: 14,
    fontWeight: "600", 
    marginTop: 2,
  },
  label: { 
    fontSize: 14, 
    fontWeight: "500",
    color: "#333", 
    marginBottom: 5,
    top: 28,
  },
  inputContainer: {
    flexDirection: "column",
    marginBottom: -2,
  },
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    fontSize: 14,
    backgroundColor: "transparent",
    color: "#333",
    paddingVertical: 5,
    paddingLeft: 0,
    marginLeft: 100,
  },

  websiteContainer: {
    flexDirection: "column",  // Align input fields in a column with label
    marginBottom: 15,  // Space between inputs
  },

  websitelabel: {
    fontSize: 14, 
    fontWeight: "500",  // Slightly bold label for clarity
    color: "#333", 
    marginBottom: 0,  // Increased space between label and input for better alignment
    top:13,
  },
  websiteinput: {
    height: 40, // Adjusted height for a more minimalistic look
    //borderBottomWidth: 1, // Adding bottom border for the line effect
    borderBottomColor: "#D3D3D3", // Light grey for the line
    fontSize: 14, 
    backgroundColor: "transparent", // Transparent background for the line look
    color: "#333", // Dark text color
    paddingVertical: 5, // More padding to make the text more accessible
    paddingLeft: 0, // No padding on the left for clean, minimalist look
    marginLeft:100,
    bottom:15,
  },




  changePasswordText: {
    fontSize: 14,
    marginTop: 25,
    textAlign: "center",
    fontWeight: "600",
  color:'grey',
  },
  privateInfo: {
    fontSize: 15,
    fontWeight: "600",
    color: "black", 
    position: "absolute",
    top: 380,
    left: 5,
  },
  defaultProfileImage: { 
    width: 130, height: 130, borderRadius: 65, backgroundColor: "transparent", borderWidth: 2, borderColor: "black" 
  },
  bottomLine: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#ccc",
    position: "absolute",
    top: 180,
    
  },
  infoLine: {
   width: "100%",
    height: 1.5,
    backgroundColor: "#ccc",
    position: "absolute",
    top: 370,
  },
});

export default EditProfileScreen;
