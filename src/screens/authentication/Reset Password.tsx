// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store/Store"; // Import the RootState type (your Redux store type)
// import useResetPassword from "../../hooks/useResetPassword"; // Import the custom hook

// const ResetPasswordScreen = () => {
//   const navigation = useNavigation();
//   const user = useSelector((state: RootState) => state.auth.user); // Access user from Redux state

//   const [currentPassword, setCurrentPassword] = useState<string>("");
//   const [newPassword, setNewPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");

//   const { handlePasswordReset, loading, error } = useResetPassword(user); // Use the custom hook

//   const handleSubmit = async () => {
//     const result = await handlePasswordReset(currentPassword, newPassword, confirmPassword);
//     if (result === 'Password updated successfully!') {
//       Alert.alert("Success", result);
//       navigation.goBack();
//     } else if (error) {
//       Alert.alert("Error", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Ionicons name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>

//       {/* Logo */}
//      <View style={styles.header}>
//              <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
//            </View>

//       {/* Input Fields */}
//       <TextInput
//         style={styles.input}
//         placeholder="Old Password"
//         placeholderTextColor="#aaa"
//         secureTextEntry
//         value={currentPassword}
//         onChangeText={setCurrentPassword}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="New Password"
//         placeholderTextColor="#aaa"
//         secureTextEntry
//         value={newPassword}
//         onChangeText={setNewPassword}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         placeholderTextColor="#aaa"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />

//       {/* Reset Password Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleSubmit}
//         disabled={loading} // Disable button while loading
//       >
//         <Text style={styles.buttonText}>Reset Password</Text>
//       </TouchableOpacity>

//       {error && <Text style={styles.errorText}>{error}</Text>} {/* Display error if exists */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 50,
//   },
//   backButton: {
//     position: "absolute",
//     top: 45,
//     left: 15,
//   },
//   logo: {
//     width: 140,
//     height: 40,
//     resizeMode: "contain",
//     top: 1,
//   },
//   input: {
//     width: "100%",
//     height: 45,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     backgroundColor: "#f9f9f9",
//     marginBottom: 15,
//     top: 190,
//   },
//   button: {
//     backgroundColor: "#3897f0",
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: "center",
//     width: "100%",
//    top: 190,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   errorText: {
//     color: "red",
//     marginTop: 10,
//   },
// });

// export default ResetPasswordScreen; 















import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native"; // ✅ Added Image
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import useResetPassword from "../../hooks/useResetPassword";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { handlePasswordReset, loading, error } = useResetPassword(user);

  const handleSubmit = async () => {
    const result = await handlePasswordReset(currentPassword, newPassword, confirmPassword);
    if (result === "Password updated successfully!") {
      Alert.alert("Success", result);
      navigation.goBack();
    } else if (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.header}>
        <Image source={require("../../../assets/Instagram-logo.png")} style={styles.logo} />
      </View>

      {/* Input Fields */}
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

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
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
    top: 45,
    left: 15,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: "contain",
    top: 70,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    top: 190,
  },
  button: {
    backgroundColor: "#3897f0",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    top: 230,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default ResetPasswordScreen;

