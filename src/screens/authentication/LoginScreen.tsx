



import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth"; // Import the hook
import appNavigation from "../../hooks/useNavigation";
import Button from "../../components/Buttons/Btn"; //  Import Reusable Button Component

export default function LoginScreen() {
  const { navigation } = appNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth(); // Use the hook

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }
    await login(email, password);
  };

  return (
    <View style={styles.container}>
      {/* Instagram Logo */}
      <View style={styles.header}>
        <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/*  Reusable Button Component for Login */}
      <View style={{ width: '85%' }}>
  <Button title="Log In" onPress={handleLogin} backgroundColor="#0095F6" />
</View>
      {/* <Button title="Log In" onPress={handleLogin} backgroundColor="#0095F6"  /> */}

      <TouchableOpacity style={styles.googleButton}>
        <Image source={require("../../../assets/Icon (1).png")} style={styles.googleIcon} />
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Text style={styles.signupLink}>Sign up.</Text>
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Bottom Horizontal Line */}
      <View style={styles.bottomLine} />
    </View>
  );
}

//  Styles object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: "contain",
    top: 1,
  },
  input: {
    width: "85%",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  forgotPassword: {
    color: "#0095F6",
    alignSelf: "flex-end",
    left: 100,
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    top: 40,
  },
  googleIcon: {
    width: 20,
    height: 20,
    right: 30,
  },
  googleText: {
    fontWeight: "bold",
    right: 25,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    top: 40,
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
    top: 40,
  },
  signupContainer: {
    marginTop: 20,
    top: 60,
  },
  signupText: {
    color: "black",
  },
  signupLink: {
    color: "#0095F6",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  bottomLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 82,
  },
});
