import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native"; 
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebaseConfig/firebaseConfig"; 
import Toast from "react-native-toast-message"; 
import Button from "../../components/button/Button"; 
import Input from "../../components/input/Input";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your email.",
      });
      return;
    }

    setLoading(true);
    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, email);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "A password reset link has been sent to your email.",
      });

      setEmail("");
      setTimeout(() => navigation.goBack(), 2000);
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      }

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* ✅ Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* ✅ Instagram Logo */}
      <View style={styles.header}>
        <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
      </View>

      <Text style={styles.description}>
        Forgot your password? Enter your email, and we will send you a reset link.
      </Text>


<View style={{ top: 220, width: '100%' }}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
</View>    
        
        
    
      {/* ✅ Reusable Button Component for Reset */}
      <View style={{ marginTop: 210, width: '100%' }}>
        <Button 
          title="Send Magic Link" 
          onPress={handlePasswordReset} 
          backgroundColor="#3897f0"
          loading={loading} 
        />
      </View>

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
    top: 70,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    top: 50,
  },
  description: {
    textAlign: "center",
    color: "grey",
    fontSize: 14,
    marginBottom: 20,
    paddingHorizontal: 15,
    top: 110,
  },
  

});

export default ForgotPasswordScreen;
