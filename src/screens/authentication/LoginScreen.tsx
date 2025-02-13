
// import React, { useState } from "react";
// import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
// import { auth } from "../store/firebaseconfig";
// import { useDispatch } from "react-redux";
// import { setUser } from "../store/slices/AuthSlice";
// import appNavigation from "../../hooks/useNavigation";
// import { signInWithEmailAndPassword } from "firebase/auth";

// export default function LoginScreen() {
//   const { navigation } = appNavigation();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       dispatch(setUser(userCredential.user));
//     } catch (error) {
//       setError((error as any).message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
//       <Text style={{ fontSize: 32, fontWeight: "bold", fontFamily: "cursive", marginBottom: 40 }}>
//         Instagram
//       </Text>
//       <TextInput
//         placeholder="Username"
//         value={email}
//         onChangeText={setEmail}
//         style={{
//           width: "85%",
//           backgroundColor: "#f5f5f5",
//           padding: 12,
//           borderRadius: 8,
//           marginBottom: 10,
//         }}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={{
//           width: "85%",
//           backgroundColor: "#f5f5f5",
//           padding: 12,
//           borderRadius: 8,
//           marginBottom: 10,
//         }}
//       />
//       <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
//         <Text style={{ color: "#0095F6", alignSelf: "flex-end", marginRight: 30, marginBottom: 20 }}>
//           Forgot password?
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={handleLogin}
//         style={{
//           width: "85%",
//           backgroundColor: "#0095F6",
//           padding: 12,
//           borderRadius: 8,
//           alignItems: "center",
//           marginBottom: 15,
//         }}
//       >
//         <Text style={{ color: "white", fontWeight: "bold" }}>Log In</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
//       >
//         <Image
//           source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" }}
//           style={{ width: 20, height: 20, marginRight: 10 }}
//         />
//         <Text style={{ fontWeight: "bold" }}>Login with Google</Text>
//       </TouchableOpacity>
//       <View style={{ flexDirection: "row", alignItems: "center", width: "85%" }}>
//         <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
//         <Text style={{ marginHorizontal: 10, color: "#888" }}>OR</Text>
//         <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
//       </View>
//       <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//         <Text style={{ color: "#0095F6", marginTop: 20 }}>Don't have an account? Sign up.</Text>
//       </TouchableOpacity>
//       {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}
//     </View>
//   );
// }





















// import React, { useState } from "react";
// import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
// import { auth } from "../store/firebaseconfig";
// import { useDispatch } from "react-redux";
// import { setUser } from "../store/slices/AuthSlice";
// import appNavigation from "../../hooks/useNavigation";
// import { signInWithEmailAndPassword } from "firebase/auth";

// export default function LoginScreen() {
//   const { navigation } = appNavigation();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       dispatch(setUser(userCredential.user));
//     } catch (error) {
//       setError((error as any).message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Instagram Logo */}
//       <View style={styles.header}>
//         <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
//       </View>

//       <TextInput
//         placeholder="Username"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />
//       <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
//         <Text style={styles.forgotPassword}>Forgot password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
//         <Text style={styles.loginButtonText}>Log In</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.googleButton}>
//         <Image
//           source={{
//             uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
//           }}
//           style={styles.googleIcon}
//         />
//         <Text style={styles.googleText}>Login with Google</Text>
//       </TouchableOpacity>

//       <View style={styles.orContainer}>
//         <View style={styles.orLine} />
//         <Text style={styles.orText}>OR</Text>
//         <View style={styles.orLine} />
//       </View>

//       <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//   <Text style={styles.signupContainer}>
//     <Text style={styles.signupText}>Don't have an account? </Text>
//     <Text style={styles.signupLink}>Sign up.</Text>
//   </Text>
// </TouchableOpacity>


//       {error ? <Text style={styles.errorText}>{error}</Text> : null}

       
//             {/* Bottom Horizontal Line */}
//             <View style={styles.bottomLine} />
          
//     </View>
//   );
// }

// // Styles
// const styles = {
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     marginBottom: 20,
//   },
//   logo: {
//     width: 140,
//     height: 40,
//     resizeMode: "contain",
//     top: 1,
//   },
//   input: {
//     width: "85%",
//     backgroundColor: "#f5f5f5",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   forgotPassword: {
//     color: "#0095F6",
//     alignSelf: "flex-end",
//    left:100,
//     marginBottom: 20,

//   },
//   loginButton: {
//     width: "85%",
//     backgroundColor: "#0095F6",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   loginButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   googleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   googleText: {
//     fontWeight: "bold",
//   },
//   orContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "85%",
//   },
//   orLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#ccc",
//     top: 22,
//   },
//   orText: {
//     marginHorizontal: 10,
//     color: "#888",
//     top: 22,

//   },


//   signupContainer: {
//     marginTop: 20,
//     top: 40,
//   },
//   signupText: {
//     color: "black",
//   },
//   signupLink: {
//     color: "#0095F6",
//     fontWeight: "bold",
//   },

//   errorText: {
//     color: "red",
//     marginTop: 10,
//   },


//   bottomLine: {
//     width: "100%",
//     height: 1,
//     backgroundColor: "#ccc",
//     position: "absolute",
//     bottom: 82,
//   },
// };









import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth"; // Import the hook
import appNavigation from "../../hooks/useNavigation";

export default function LoginScreen() {
  const { navigation } = appNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth(); // Use the hook

  return (
    <View style={styles.container}>
      {/* Instagram Logo */}
      <View style={styles.header}>
        <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
      </View>

      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
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

      <TouchableOpacity onPress={() => login(email, password)} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
          }}
          style={styles.googleIcon}
        />
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

// ✅ Correct styles object
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
  loginButton: {
    width: "85%",
    backgroundColor: "#0095F6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
  right: 30,

  },
  googleText: {
    fontWeight: "bold",
    right:25,
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
    top: 22,
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
    top: 22,
  },
  signupContainer: {
    marginTop: 20,
    top: 40,
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

