// import { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserProfile } from "../screens/store/slices/ProfileSlice";
// import { db } from "../screens/store/firebaseconfig";
// import { doc, updateDoc } from "firebase/firestore";
// import { RootState } from "../screens/types/EditProfile";

// export const useEditProfile = (initialValues: any, navigation: any) => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const dispatch = useDispatch();

//   const [name, setName] = useState(initialValues.name || "");
//   const [username, setUsername] = useState(initialValues.username || "");
//   const [bio, setBio] = useState(initialValues.bio || "");
//   const [website, setWebsite] = useState(initialValues.website || "");
//   const [email, setEmail] = useState(initialValues.email || "");
//   const [phone, setPhone] = useState(initialValues.phone || "");
//   const [gender, setGender] = useState(initialValues.gender || "");
//   const [profileImage, setProfileImage] = useState(initialValues.profileImage || "");
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

//   return {
//     name,
//     setName,
//     username,
//     setUsername,
//     bio,
//     setBio,
//     website,
//     setWebsite,
//     email,
//     setEmail,
//     phone,
//     setPhone,
//     gender,
//     setGender,
//     profileImage,
//     setProfileImage,
//     loading,
//     setLoading,
//     isChanged,
//     setIsChanged,
//     pickImage,
//     handleSave,
//   };
// };



















// import { useState, useEffect } from "react";
// import { Alert } from "react-native";
// import { getAuth, updateProfile } from "firebase/auth";
// import { getFirestore, doc, updateDoc } from "firebase/firestore";
// import * as ImagePicker from "expo-image-picker";

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
//   const firestore = getFirestore();

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
//         const userRef = doc(firestore, "users", user.uid);
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
import type { AppDispatch } from "../screens/store/Store"; // Import the AppDispatch type
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { updateUserProfile, updateUserProfilePicture } from "../screens/store/slices/ProfileSlice"; // Redux actions import karo

export const useEditProfile = (profileData: any, navigation: any) => {
  const [name, setName] = useState(profileData.name || "");
  const [username, setUsername] = useState(profileData.username || "");
  const [bio, setBio] = useState(profileData.bio || "");
  const [website, setWebsite] = useState(profileData.website || "");
  const [email, setEmail] = useState(profileData.email || "");
  const [phone, setPhone] = useState(profileData.phone || "");
  const [gender, setGender] = useState(profileData.gender || "");
  const [profileImage, setProfileImage] = useState(profileData.profileImage || "");
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const auth = getAuth();
  const dispatch: AppDispatch = useDispatch(); // Typed Redux dispatcher

  // Detect if user has made changes
  useEffect(() => {
    if (
      name !== profileData.name ||
      username !== profileData.username ||
      bio !== profileData.bio ||
      website !== profileData.website ||
      email !== profileData.email ||
      phone !== profileData.phone ||
      gender !== profileData.gender ||
      profileImage !== profileData.profileImage
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [name, username, bio, website, email, phone, gender, profileImage]);

  // Function to pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setIsChanged(true);
    }
  };

  // Function to handle save
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
          profileImage,
        });

        // Update Firebase Auth Profile
        await updateProfile(user, { displayName: name, photoURL: profileImage });

        // ✅ Redux state update karo taake UI har jagah update ho jaye
        dispatch(updateUserProfile({ uid: user.uid, username, bio }));
        dispatch(updateUserProfilePicture({ uid: user.uid, profilePicture: profileImage }));

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
    pickImage,
    handleSave
  };
};
