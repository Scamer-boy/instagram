// import React, { useState } from "react";
// import { View, TextInput, Text, Alert, TouchableOpacity, Image, StyleSheet } from "react-native";
// import appNavigation from "../../hooks/useNavigation";
// import useAuth from "../../hooks/useAuth"; // Importing the custom hook

// export default function SignupScreen() {
//   const { navigation } = appNavigation();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { signup, error } = useAuth();

//   const handleSignup = async () => {
//     if (!username || !email || !password || !confirmPassword) {
//       Alert.alert("Error", "All fields are required!");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match!");
//       return;
//     }
//     const success = await signup(username, email, password);
//     if (success) {
//       Alert.alert("Success", "Account created successfully!");
//       navigation.navigate("Home");
//     }
//   };
// return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
//       </View>
//       <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
//       <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
//       <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
//         <Text style={styles.signupText}>Sign Up</Text>
//       </TouchableOpacity>

//       {/* OR Text with Horizontal Lines */}
//       <View style={styles.orContainer}>
//         <View style={styles.orLine} />
//         <Text style={styles.orText}>OR</Text>
//         <View style={styles.orLine} />
//       </View>

     

//       <TouchableOpacity style={styles.googleButton}>
//   <Image source={require("../../../assets/Icon (1).png")} style={styles.googleIcon} />
//   <Text style={styles.googleText}>Sign Up with Google</Text>
// </TouchableOpacity>
//       <Text style={styles.loginText}> 
//         Already have an account? <Text onPress={() => navigation.navigate("Login")} style={styles.loginLink}>Log In</Text>
//       </Text>
// {/* Bottom Horizontal Line */}
//       <View style={styles.bottomLine} />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logo: {
//     width: 140,
//     height: 40,
//     resizeMode: "contain",
//     top: 1,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: "#fafafa",
//   },
//   signupButton: {
//     width: "100%",
//     backgroundColor: "#0095F6",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     top:18,
//   },
//   signupText: {
//     color: "#fff",
//     fontWeight: "bold",
    
//   },
//   googleIcon: {
//     width: 20, // Icon ka size adjust karein
//     height: 20,
//     right: 80, // Icon aur text ke beech space ke liye
//   top:20,
// },

//   orContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginVertical: 20,
//   },
//   orLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#ccc",
//     top: 85,
//   },
//   orText: {
//     marginHorizontal: 10,
//     color: "#888",
//     fontWeight: "bold",
//     top: 85,
//   },
//   googleButton: {
//     width: "100%",
//     backgroundColor: "#fff",
    
//     alignItems: "center",
   
//     bottom: 40,
//   },
//   googleText: {
//     color: "#000",
//     fontWeight: "bold",
//   },
//   loginText: {
//     marginTop: 20,
//     color: "#555",
//     top: 50,
//   },
//   loginLink: {
//     color: "#0095F6",
//     fontWeight: "bold",
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 10,
//   },
//   bottomLine: {
//     width: "100%",
//     height: 1,
//     backgroundColor: "#ccc",
//     position: "absolute",
//     bottom: 82,
//   },
// });






// import React, { useState } from "react";
// import { View, TextInput, Text, Alert, TouchableOpacity, Image, StyleSheet } from "react-native";
// import appNavigation from "../../hooks/useNavigation";
// import useAuth from "../../hooks/useAuth";
// import SignupButton from "../../components/Buttons/Btn";

// export default function SignupScreen() {
//   const { navigation } = appNavigation();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { signup, error } = useAuth();

//   const handleSignup = async () => {
//     if (!username || !email || !password || !confirmPassword) {
//       Alert.alert("Error", "All fields are required!");
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match!");
//       return;
//     }
//     const success = await signup(username, email, password);
//     if (success) {
//       Alert.alert("Success", "Account created successfully!");
//       navigation.navigate("Home");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
//       </View>
//       <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
//       <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
//       <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
//       <SignupButton onPress={handleSignup} />

//       <View style={styles.orContainer}>
//         <View style={styles.orLine} />
//         <Text style={styles.orText}>OR</Text>
//         <View style={styles.orLine} />
//       </View>

//       <TouchableOpacity style={styles.googleButton}>
//         <Image source={require("../../../assets/Icon (1).png")} style={styles.googleIcon} />
//         <Text style={styles.googleText}>Sign Up with Google</Text>
//       </TouchableOpacity>

//       <Text style={styles.loginText}>
//         Already have an account? <Text onPress={() => navigation.navigate("Login")} style={styles.loginLink}>Log In</Text>
//       </Text>
//       <View style={styles.bottomLine} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logo: {
//     width: 140,
//     height: 40,
//     resizeMode: "contain",
//     top: 1,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: "#fafafa",
//   },
//   orContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginVertical: 20,
//   },
//   orLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#ccc",
//     top: 85,
//   },
//   orText: {
//     marginHorizontal: 10,
//     color: "#888",
//     fontWeight: "bold",
//     top: 85,
//   },
//   googleButton: {
//     width: "100%",
//     backgroundColor: "#fff",
//     alignItems: "center",
//     bottom: 40,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     right: 80,
//     top: 20,
//   },
//   googleText: {
//     color: "#000",
//     fontWeight: "bold",
//   },
//   loginText: {
//     marginTop: 20,
//     color: "#555",
//     top: 50,
//   },
//   loginLink: {
//     color: "#0095F6",
//     fontWeight: "bold",
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 10,
//   },
//   bottomLine: {
//     width: "100%",
//     height: 1,
//     backgroundColor: "#ccc",
//     position: "absolute",
//     bottom: 82,
//   },
// });















































































import React, { useState } from "react";
import { View, TextInput, Text, Alert, TouchableOpacity, Image, StyleSheet } from "react-native";
import appNavigation from "../../hooks/useNavigation";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Buttons/Btn"; // Updated Button Component

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
      
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} />

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
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
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
    color: "#555",
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
    height: 1,
    backgroundColor: "#ccc",
    position: "absolute",
    bottom: 82,
  },
});














