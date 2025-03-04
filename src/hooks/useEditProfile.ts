import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { updateUserProfile } from "../store/slices/profileSlice";

export const useEditProfile = () => {
  const navigation = useNavigation(); 
  const dispatch: AppDispatch = useDispatch();
  const auth = getAuth();
  
  const profileData = useSelector((state: RootState) => state.profile);

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

  useEffect(() => {
    setName(profileData.name || "");
    setUsername(profileData.username || "");
    setBio(profileData.bio || "");
    setWebsite(profileData.website || "");
    setEmail(profileData.email || "");
    setPhone(profileData.phone || "");
    setGender(profileData.gender || "");
    setProfileImage(profileData.profileImage || "");
  }, [profileData]);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (result.canceled || !result.assets?.length) return;

    const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
    setProfileImage(base64Image);
  };

  const handleSave = async () => {
    if (!isChanged) return;

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(getFirestore(), "users", user.uid);
        await updateDoc(userRef, {
          name, username, bio, website, email, phone, gender, profileImage,
        });

        try {
          await updateProfile(user, { displayName: name });
        } catch (authError) {
          console.warn("Firebase Auth updateProfile failed:", authError);
          Toast.show({
            type: "info",
            text1: "Profile Updated",
            text2: "Profile updated but display name not changed.",
          });
        }

        dispatch(updateUserProfile({ 
          uid: user.uid, name, username, bio, website, email, phone, gender,
        }));

        Toast.show({
          type: "success",
          text1: "Profile Updated!",
          text2: "Your profile has been updated successfully.",
        });

        setIsChanged(false);
        navigation.goBack(); 
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Something went wrong. Please try again.",
      });
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









