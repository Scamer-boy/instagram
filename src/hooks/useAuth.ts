import { useState } from "react";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { User } from "../types/types"; 
export default function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const signup = async (username: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const newUser: User = {
        uid: user.uid,
        username,
        email,
        createdAt: new Date(),
        emailVerified: user.emailVerified,
        providerData: user.providerData,
      };

      await setDoc(doc(db, "users", user.uid), newUser);

      dispatch(setUser(newUser));

      setError(null);
      return true;
    } catch (err) {
      setError((err as any).message);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const loggedInUser: User = {
        uid: user.uid,
        email: user.email || "",
        username: user.displayName || "",
        emailVerified: user.emailVerified,
        providerData: user.providerData,
        createdAt: new Date(), 
      };

      dispatch(setUser(loggedInUser));

      setError(null);
      return true;
    } catch (err) {
      setError((err as any).message);
      return false;
    }
  };

  return { signup, login, error };
}
