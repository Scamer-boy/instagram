import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useResetPassword from "../../hooks/useResetPassword";
import Button from "../../components/button/Button";
import Toast from "react-native-toast-message";
import Input from "../../components/input/Input";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 

  const { handlePasswordReset, error, success } = useResetPassword();

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

    setLoading(true); 

    await handlePasswordReset(currentPassword, newPassword, confirmPassword);

    setLoading(false); 

    if (error) {
      Toast.show({ type: "error", text1: "Error", text2: error });
    } else if (success) {
      Toast.show({ type: "success", text1: "Success", text2: success });
      setTimeout(() => navigation.goBack(), 2000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Ionicons name="arrow-back" size={24} color="black" style={styles.backButton} onPress={() => navigation.goBack()} />

      {/* Logo */}
      <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />

      <View style={{ top: 90, width: "100%" }}>
        {/* Form Inputs */}
        <Input placeholder="Old Password" secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} />
        <Input placeholder="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
        <Input placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      </View>

      {/* ✅ Button with Loading */}
      <View style={{ marginTop: 90, width: "100%" }}>
        <Button title="Reset Password" onPress={handleSubmit} backgroundColor="#3897f0" loading={loading} />
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
});

export default ResetPasswordScreen;
