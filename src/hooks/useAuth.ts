import { useState } from "react";
import { auth, db } from "../store/firebaseconfig";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/AuthSlice";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Signup function
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

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
      setError(null);
      return true;
    } catch (err) {
      setError((err as any).message);
      return false;
    }
  };

  return { signup, login, error };
}

