



import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth"; // Import the hook
import appNavigation from "../../hooks/useNavigation";
import Button from "../../components/button/Button"; //  Import Reusable Button Component
import Input from "../../components/input/Input";

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
<View style={{ width: '85%' }}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
</View>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/*  Reusable Button Component for Login */}
      <View style={{ width: '85%' }}>
  <Button title="Log In" onPress={handleLogin} backgroundColor="#3797EF" />
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
    right: 2,
  },
  googleText: {
    fontWeight: "bold",

  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
  },
  orLine: {
    flex: 1,
    height: 0.5,
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
    color: "grey",
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
    height: 0.5,
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 82,
  },
});
