import React, { useState } from "react";
import { View, TextInput, Text, Alert, TouchableOpacity, Image, StyleSheet } from "react-native";
import appNavigation from "../../hooks/useNavigation";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/button/Button"; 
import Input from "../../components/input/Input";

export default function SignupScreen() {
  const { navigation } = appNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error } = useAuth();

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    const success = await signup(username, email, password);
    if (success) {
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
      </View>
      
      <Input placeholder="Username" value={username} onChangeText={setUsername}  />
      <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"  />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}  />
      <Input placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword}  />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/*  Reusable Button Component */}
      <Button title="Sign Up" onPress={handleSignup} />

      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={require("../../../assets/Icon (1).png")} style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign Up with Google</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text onPress={() => navigation.navigate("Login")} style={styles.loginLink}>Log In</Text>
      </Text>
      
      <View style={styles.bottomLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: "contain",
    top: 1,
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#ccc",
    top: 85,
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
    fontWeight: "bold",
    top: 85,
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    bottom: 40,
  },
  googleIcon: {
    width: 20,
    height: 20,
    right: 80,
    top: 20,
  },
  googleText: {
    color: "#000",
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    color: "grey",
    top: 50,
  },
  loginLink: {
    color: "#0095F6",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  bottomLine: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 82,
  },
});














