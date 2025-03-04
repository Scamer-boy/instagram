import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig"; 
const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordReset = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    setError(null);
    setSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords & Confirm Password do not match.");
      return;
    }

    const currentUser = auth.currentUser; 

    if (!currentUser || !currentUser.email) {
      setError("No authenticated user found.");
      return;
    }

    setLoading(true);

    try {
      
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);

      setLoading(false);
      setSuccess("Password updated successfully!");
    } catch (err: any) {
      setLoading(false);
      if (err.code === "auth/wrong-password") {
        setError("The current password is incorrect.");
      } else if (err.code === "auth/weak-password") {
        setError("The new password is too weak.");
      } else if (err.code === "auth/requires-recent-login") {
        setError("Please log in again before changing your password.");
      } else {
        setError("Failed to update the password. Please try again.");
      }
    }
  };

  return { handlePasswordReset, loading, error, success };
};

export default useResetPassword;
