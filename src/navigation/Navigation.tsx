
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../store/firebaseconfig";
import { updateProfilePicture } from "../store/slices/ProfileSlice";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UploadScreen from "../screens/PostScreen";
import LoginScreen from "../screens/authentication/LoginScreen";
import SignupScreen from "../screens/authentication/SignupScreen";
import EditProfileScreen from "../screens/EditProfile";
import OtherUserProfileScreen from "../screens/otherUserProfile";
import ForgotPasswordScreen from "../screens/authentication/forgetPassword";
import ResetPasswordScreen from "../screens/authentication/Reset Password";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ------------------- Home Stack (Includes OtherUserProfile) ------------------- */
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="OtherUserProfile" component={OtherUserProfileScreen} />
  </Stack.Navigator>
);

/* ------------------- Profile Stack (Includes EditProfile) ------------------- */
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  </Stack.Navigator>
);

/* ------------------- Bottom Tab Navigation ------------------- */
const BottomTabs = () => {
  const profilePicture = useSelector((state: RootState) => state.profile.profilePicture);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          position: "absolute",
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" size={30} color={focused ? "#000" : "#000"} />
          ),
        }}
      />

      {/* Upload */}
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

      {/* Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: () =>
            profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "#000",
                  top: 5,
                }}
              />
            ) : (
              <Ionicons name="person-circle-outline" size={34} color={"#000"} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

/* ------------------- Authentication Stack ------------------- */
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

/* ------------------- Main App Navigation ------------------- */
export default function AppNavigation() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  // Fetch Profile Picture in Real-Time
  useEffect(() => {
    if (user?.uid) {
      const userDocRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          dispatch(updateProfilePicture(docSnap.data().profilePicture || ""));
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
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
