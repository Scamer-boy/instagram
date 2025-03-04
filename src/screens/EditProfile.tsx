import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { useEditProfile } from "../hooks/useEditProfile";
import { EditProfileScreenProps } from "../types/EditProfile";
import InputField from "../components/editProfileInput/EditProfileInput";
import { useProfile } from "../hooks/useProfile";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/ProfileScreentype";

const EditProfileScreen: React.FC<EditProfileScreenProps> = () => { 
  const user = useSelector((state: RootState) => state.auth.user);
  const { profile } = useProfile(user?.uid) ;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
  } = useEditProfile(); 

  React.useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setEmail(profile.email || "");
      setName(profile.name || "");
      setBio(profile.bio || "");
      setWebsite(profile.website || "");
      setPhone(profile.phone || "");
      setGender(profile.gender || "");
    }
  }, [profile]);
  
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

        <InputField label="Name" placeholder="Enter your name" value={name} onChangeText={setName} />
        <InputField label="Username" placeholder="Enter your username" value={username} onChangeText={setUsername} />
        <InputField label="Website" placeholder="Enter your website URL" value={website} onChangeText={setWebsite} isMultiline />
        <InputField label="Bio" placeholder="Enter a short description" value={bio} onChangeText={setBio} />

        <View style={styles.infoLine} />
        <Text style={styles.privateInfo}>Private Information</Text>

        <InputField label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
        <InputField label="Phone" placeholder="Enter your phone number" value={phone} onChangeText={setPhone} />
        <InputField label="Gender" placeholder="Enter your gender" value={gender} onChangeText={setGender} />

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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    top: 12,
    backgroundColor: "#F7F7F7",
  },
  cancelText: {
    fontSize: 16,
    color: "black",
    top: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    top: 12,
  },
  doneText: {
    fontSize: 18,
    color: "#007AFF",
    top: 12,
    fontWeight: "bold"
  },
  scrollContainer: {
    padding: 15,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
    top: 13,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  defaultProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  changePhotoText: {
    color: "#007AFF",
    marginTop: 10,
    fontWeight: "bold",
  },
  bottomLine: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  infoLine: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
    bottom: 19,
    marginBottom: 4,
  },
  privateInfo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: -13,
  },
  changePasswordText: {
    fontSize: 14,
    color: "#666",
    marginTop: 50,
    textAlign: "center",
  },
});

export default EditProfileScreen;
