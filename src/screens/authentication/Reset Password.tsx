
import React, { useState } from "react";
import { View, Text, TextInput, Alert, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import useResetPassword from "../../hooks/useResetPassword";
import Button from "../../components/Buttons/Btn"; //  Reusable Button Import
import Toast from "react-native-toast-message"; //  Toast for Error/Success Messages

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { handlePasswordReset, loading } = useResetPassword(user);

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({ type: "error", text1: "Error", text2: "All fields are required." });
      return false;
    }
    if (newPassword.length < 6) {
      Toast.show({ type: "error", text1: "Error", text2: "New password must be at least 6 characters." });
      return false;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({ type: "error", text1: "Error", text2: "Passwords do not match." });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const result = await handlePasswordReset(currentPassword, newPassword, confirmPassword);
    if (result === "Password updated successfully!") {
      Toast.show({ type: "success", text1: "Success", text2: result });
      setTimeout(() => navigation.goBack(), 2000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Ionicons name="arrow-back" size={24} color="black" style={styles.backButton} onPress={() => navigation.goBack()} />

      {/* Logo */}
      <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />

      {/* Form Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* ✅ Reusable Button */}
      {/* <Button title="Reset Password" onPress={handleSubmit} backgroundColor="#3897f0" loading={loading} /> */}
      <View style={{ marginTop: 90,width: '100%' }}>
  <Button 
    title="Reset Password" 
    onPress={handleSubmit} 
    backgroundColor="#3897f0" 
    loading={loading} 
  />
</View>

      {/* Toast Messages */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 15,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: "contain",
    marginTop: 70,
  },
  input: {
    top: 80,
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    
  },
});

export default ResetPasswordScreen;
