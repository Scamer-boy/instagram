
// components/EditProfileButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import  useNavigation  from "../../hooks/useNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/ProfileScreentype";
import { EditProfileButtonProps } from "../../types/types";

type NavigationProp = StackNavigationProp<RootStackParamList, "EditProfile">;

const EditProfileButton: React.FC<EditProfileButtonProps> = () => {
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
    height: 41,
  },
  editProfileText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EditProfileButton;
