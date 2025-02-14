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
