import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const useResetPassword = (user: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords & Confirm Password are different.');
      return;
    }

    if (!user) {
      setError('No authenticated user found.');
      return;
    }
    console.log('=> ', user);

    setLoading(true);
    try {
      if (!user.email) {
        setError('No email found for the user.');
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setLoading(false);
      setError(null);
      return 'Password updated successfully!';
    } catch (err) {
      setLoading(false);
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/wrong-password') {
          setError('The current password is incorrect.');
        } else {
          setError('Failed to update the password. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return { handlePasswordReset, loading, error };
};

export default useResetPassword;






