import firebase from "firebase";
import { useCallback } from "react";
import { projectAuth } from "..";

export const useFirebaseLogin = () => {
  const signOut = useCallback(() => {
    projectAuth.signOut();
  }, []);
  const googleLogin = useCallback(
    () => projectAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
    []
  );
  return { signOut, googleLogin };
};
