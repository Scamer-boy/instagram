
// import React, { useEffect } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, Image } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store/Store";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "../../store/firebaseconfig";
// import { updateProfilePicture } from "../../store/slices/ProfileSlice"; // ✅ Import Fix

// // Import Screens
// import HomeScreen from "../../HomeScreen";
// import ProfileScreen from "../../ProfileScreen";
// import UploadScreen from "../../PostScreen";
// import LoginScreen from "../../authentication/LoginScreen";
// import SignupScreen from "../../authentication/SignupScreen";
// import EditProfileScreen from "../../EditProfile";
// import OtherUserProfileScreen from "../../otherUserProfile";
// import ForgotPasswordScreen from "../../authentication/forgetPassword";
// import ResetPasswordScreen from "../../authentication/Reset Password";

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function BottomTabs() {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const profilePicture = useSelector((state: RootState) => state.profile.profilePicture); // ✅ Get Profile Picture from Redux

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { height: 60, backgroundColor: "#fff", borderTopWidth: 0 },
//         tabBarShowLabel: false,
         
//       }}
//     >
//       {/* Home Icon */}
//       <Tab.Screen
//         name="Home"
//         component={HomeStack}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Ionicons name="home-outline" size={30} color={focused ? "#000" : "#000"} />
//           ),
//         }}
//       />

//       {/* Upload Icon - Bordered Square */}
//       <Tab.Screen
//         name="Upload"
//         component={UploadScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <View
//               style={{
//                 width: 30,
//                 height: 30,
//                 borderWidth: 2,
//                 borderColor: "#000",
//                 borderRadius: 8,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 top: 5,
                
//               }}
//             >
//               <Ionicons name="add" size={24} color={color} />
//             </View>
//           ),
//         }}
//       />

//       {/* Profile Icon - Displays Profile Picture */}
//       <Tab.Screen
//         name="Profile"
//         component={ProfileStack}
//         options={{
//           tabBarIcon: () =>
//             profilePicture ? ( // ✅ Now Uses Redux Profile Picture
//               <Image
//                 source={{ uri: profilePicture }}
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 50,
//                   borderWidth: 2,
//                   borderColor: "#000",
//                   //bottom:1,
//                   top:5,
//                 }}
//               />
//             ) : (
//               <Ionicons name="person-circle-outline" size={34} color={"#000"} />
//             ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// // ✅ Home Stack to Keep OtherUserProfile Inside BottomTabs
// const HomeStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="OtherUserProfile" component={OtherUserProfileScreen} />
//     </Stack.Navigator>
//   );
// };

// // ✅ Profile Stack for Edit Profile
// const ProfileStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//       <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//     </Stack.Navigator>
//   );
// };

// export default function AppNavigation() {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const dispatch = useDispatch();

//   // ✅ Fetch Profile Picture in Real-Time from Firestore
//   useEffect(() => {
//     if (user?.uid) {
//       const userDocRef = doc(db, "users", user.uid);
//       const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           dispatch(updateProfilePicture(userData.profilePicture || ""));
//         }
//       });

//       return () => unsubscribe();
//     }
//   }, [user?.uid, dispatch]);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {user ? (
//           <>
//             <Stack.Screen name="Main" component={BottomTabs} />
//             <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//           </>
//         ) : (
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Signup" component={SignupScreen} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }












import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../store/firebaseconfig";
import { updateProfilePicture } from "../../store/slices/ProfileSlice"; // ✅ Import Fix

// Import Screens
import HomeScreen from "../../HomeScreen";
import ProfileScreen from "../../ProfileScreen";
import UploadScreen from "../../PostScreen";
import LoginScreen from "../../authentication/LoginScreen";
import SignupScreen from "../../authentication/SignupScreen";
import EditProfileScreen from "../../EditProfile";
import OtherUserProfileScreen from "../../otherUserProfile";
import ForgotPasswordScreen from "../../authentication/forgetPassword";
import ResetPasswordScreen from "../../authentication/Reset Password";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function BottomTabs() {
  const user = useSelector((state: RootState) => state.auth.user);
  const profilePicture = useSelector((state: RootState) => state.profile.profilePicture); // ✅ Get Profile Picture from Redux

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          position: "absolute", // ✅ Sticky navbar
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true, // ✅ Hide navbar when keyboard opens
      }}
    >
      {/* Home Icon */}
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" size={30} color={focused ? "#000" : "#000"} />
          ),
        }}
      />

      {/* Upload Icon - Bordered Square */}
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 30,
                height: 30,
                borderWidth: 2,
                borderColor: "#000",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                top: 5,
              }}
            >
              <Ionicons name="add" size={24} color={color} />
            </View>
          ),
        }}
      />

      {/* Profile Icon - Displays Profile Picture */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: () =>
            profilePicture ? ( // ✅ Now Uses Redux Profile Picture
              <Image
                source={{ uri: profilePicture }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "#000",
                  //bottom:1,
                  top:5,
                }}
              />
            ) : (
              <Ionicons name="person-circle-outline" size={34} color={"#000"} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

// ✅ Home Stack to Keep OtherUserProfile Inside BottomTabs
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfileScreen} />
    </Stack.Navigator>
  );
};

// ✅ Profile Stack for Edit Profile
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default function AppNavigation() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  // ✅ Fetch Profile Picture in Real-Time from Firestore
  useEffect(() => {
    if (user?.uid) {
      const userDocRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          dispatch(updateProfilePicture(userData.profilePicture || ""));
        }
      });

      return () => unsubscribe();
    }
  }, [user?.uid, dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
