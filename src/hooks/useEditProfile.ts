// import { useState, useEffect } from "react";
// import { Alert } from "react-native";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../store/Store"; // Import the AppDispatch type
// import { getAuth, updateProfile } from "firebase/auth";
// import { getFirestore, doc, updateDoc } from "firebase/firestore";
// import * as ImagePicker from "expo-image-picker";
// import { updateUserProfile, updateUserProfilePicture } from "../store/slices/ProfileSlice"; // Redux actions import karo

// export const useEditProfile = (profileData: any, navigation: any) => {
//   const [name, setName] = useState(profileData.name || "");
//   const [username, setUsername] = useState(profileData.username || "");
//   const [bio, setBio] = useState(profileData.bio || "");
//   const [website, setWebsite] = useState(profileData.website || "");
//   const [email, setEmail] = useState(profileData.email || "");
//   const [phone, setPhone] = useState(profileData.phone || "");
//   const [gender, setGender] = useState(profileData.gender || "");
//   const [profileImage, setProfileImage] = useState(profileData.profileImage || "");
//   const [loading, setLoading] = useState(false);
//   const [isChanged, setIsChanged] = useState(false);

//   const auth = getAuth();
//   const dispatch: AppDispatch = useDispatch(); // Typed Redux dispatcher

//   // Detect if user has made changes
//   useEffect(() => {
//     if (
//       name !== profileData.name ||
//       username !== profileData.username ||
//       bio !== profileData.bio ||
//       website !== profileData.website ||
//       email !== profileData.email ||
//       phone !== profileData.phone ||
//       gender !== profileData.gender ||
//       profileImage !== profileData.profileImage
//     ) {
//       setIsChanged(true);
//     } else {
//       setIsChanged(false);
//     }
//   }, [name, username, bio, website, email, phone, gender, profileImage]);

//   // Function to pick image
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri);
//       setIsChanged(true);
//     }
//   };

//   // Function to handle save
//   const handleSave = async () => {
//     if (!isChanged) return;

//     setLoading(true);
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userRef = doc(getFirestore(), "users", user.uid);
//         await updateDoc(userRef, {
//           name,
//           username,
//           bio,
//           website,
//           email,
//           phone,
//           gender,
//           profileImage,
//         });

//         // Update Firebase Auth Profile
//         await updateProfile(user, { displayName: name, photoURL: profileImage });

//         // ✅ Redux state update karo taake UI har jagah update ho jaye
//         dispatch(updateUserProfile({ uid: user.uid, username, bio }));
//         dispatch(updateUserProfilePicture({ uid: user.uid, profilePicture: profileImage }));

//         Alert.alert("Success", "Profile updated successfully!");
//         setIsChanged(false);
//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert("Error", "Failed to update profile.");
//     }
//     setLoading(false);
//   };

//   return {
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
//   };
// };





import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { updateUserProfile } from "../store/slices/ProfileSlice"; // Redux action

export const useEditProfile = (profileData: any, navigation: any) => {
  const [name, setName] = useState(profileData.name || "");
  const [username, setUsername] = useState(profileData.username || "");
  const [bio, setBio] = useState(profileData.bio || "");
  const [website, setWebsite] = useState(profileData.website || "");
  const [email, setEmail] = useState(profileData.email || "");
  const [phone, setPhone] = useState(profileData.phone || "");
  const [gender, setGender] = useState(profileData.gender || "");
  const [profileImage, setProfileImage] = useState(profileData.profileImage || ""); // Stores Base64
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const auth = getAuth();
  const dispatch: AppDispatch = useDispatch();

  //  Detect if any field has changed before saving
  useEffect(() => {
    setIsChanged(
      name !== profileData.name ||
      username !== profileData.username ||
      bio !== profileData.bio ||
      website !== profileData.website ||
      email !== profileData.email ||
      phone !== profileData.phone ||
      gender !== profileData.gender ||
      profileImage !== profileData.profileImage
    );
  }, [name, username, bio, website, email, phone, gender, profileImage]);

  //  Pick image and convert to Base64 (No Firestore Storage)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true, // Convert to Base64
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setProfileImage(base64Image);
      setIsChanged(true);
    }
  };

  //  Save profile updates to Firestore
  const handleSave = async () => {
    if (!isChanged) return;

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(getFirestore(), "users", user.uid);
        await updateDoc(userRef, {
          name,
          username,
          bio,
          website,
          email,
          phone,
          gender,
          profileImage, // Store Base64 string in Firestore
        });

        //  Update Firebase Auth display name
        await updateProfile(user, { displayName: name });

        //  Update Redux store
        dispatch(updateUserProfile({ uid: user.uid, username, bio, profileImage }));

        Alert.alert("Success", "Profile updated successfully!");
        setIsChanged(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
    setLoading(false);
  };

  return {
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
    pickImage, // Pick image and convert to Base64
    handleSave
  };
};








