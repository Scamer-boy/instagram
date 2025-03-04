
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/store/store";
import AppNavigation from "./src/navigation/Navigation";
import { setUser, logoutUser } from "./src/store/slices/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { View, Image } from "react-native";

SplashScreen.preventAutoHideAsync(); // Prevent auto-hide until we're ready

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Simulate a loading process (optional)
        await new Promise(resolve => setTimeout(resolve, 5000)); // Simulating a delay
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
        SplashScreen.hideAsync(); // Hide the splash screen after everything is ready
      }
    };

    prepareApp();

    // Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ 
          uid: user.uid, 
          email: user.email || "", 
          emailVerified: user.emailVerified, 
          providerData: user.providerData 
        }));
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <Image source={require("./assets/Splash Screen.png")}  />
      </View>
    );
  }

  return <AppNavigation />;
};

export default function RootApp() {
  return (
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  );
}
