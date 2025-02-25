
// components/EditProfileButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import  useNavigation  from "../../hooks/useNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/ProfileScreentype";

type NavigationProp = StackNavigationProp<RootStackParamList, "EditProfile">;

const EditProfileButton: React.FC = () => {
  const {navigation} = useNavigation();

  return (
    <TouchableOpacity
      style={styles.editProfileButton}
      onPress={() => navigation.navigate("EditProfile", { userProfile: { /* userProfile data */ }, profile: "profileString" })}
    >
      <Text style={styles.editProfileText}>Edit Profile</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editProfileButton: {
    borderWidth: 1.5,
    borderColor: "#d3d3d3",
    width: 320,
    padding: 10,
    borderRadius: 6,
    marginTop: 15,
    height: 45,
  },
  editProfileText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default EditProfileButton;
