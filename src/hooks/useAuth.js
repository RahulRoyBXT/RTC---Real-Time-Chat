import { db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { collection, addDoc, query, getDocs, where } from "firebase/firestore";

const useAuth = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      //Geting the User Data
      const { uid, displayName, photoURL } = result.user;
      console.log(result.user);
      // Storing the User Data in Firestore
      // Checking if the user already exists

      const userQuery = query(collection(db, "Users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        await addDoc(collection(db, "Users"), {
          name: displayName,
          avatar: photoURL,
          createdAt: Date.now(),
          uid,
        });
        console.log("User Created", displayName);
      } else {
        console.log("User Already Exists", displayName);
      }
    } catch (error) {
      console.log("Sign In Error", error);
    }
  };
  const signOut = async () => {
    await auth.signOut();
  };
  return { googleSignIn, signOut };
};

export default useAuth;
