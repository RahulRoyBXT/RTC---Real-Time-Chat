import { db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { collection, addDoc, query, getDocs, where, setDoc, doc } from "firebase/firestore";
import bcrypt from 'bcryptjs';

const useAuth = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Getting the User Data
      const { uid, displayName, photoURL } = result.user;

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
      }
    } catch (error) {
      // Handle specific errors with alerts
      if (error.code === 'auth/popup-closed-by-user') {
        alert("Popup closed by user.");
      } else if (error.code === 'auth/popup-blocked') {
        alert("Popup was blocked. Please allow popups for this site.");
      }
    }
  };

  // New function to create a room with a password
  const createRoomWithPassword = async (roomID, password) => {
    try {
      // Hash the password before saving to Firestore
      const hashedPassword = await bcrypt.hash(password, 10);
      const roomRef = doc(db, "rooms", roomID); // Using roomID as the document ID
      await setDoc(roomRef, {
        password:hashedPassword, // Hashed password
        createdAt: Date.now(),
        expireAt: Date.now() + 18000 * 1000 // 5 hours from now
      });
    } catch (error) {
      console.error("Error creating room with password:", error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return { googleSignIn, signOut, createRoomWithPassword };
};

export default useAuth;
