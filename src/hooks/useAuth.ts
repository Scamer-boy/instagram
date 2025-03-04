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

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        uid: user.uid,
        createdAt: new Date(),
      });

      dispatch(setUser({ uid: user.uid, username, email }));
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
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email || "",
        displayName: userCredential.user.displayName || undefined,
        emailVerified: userCredential.user.emailVerified,
        providerData: userCredential.user.providerData
      }));
      setError(null);
      return true;
    } catch (err) {
      setError((err as any).message);
      return false;
    }
  };

  return { signup, login, error };
}

