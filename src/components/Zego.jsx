import { auth, db } from "../firebase"; 
import "./Zego.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const RoomPage = () => {
  const [user, loading] = useAuthState(auth); // Get the authenticated user
  const { roomID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const handleUser = async () => {
      if (loading) return; // Wait for loading to finish
      if (!user) {
        await googleSignIn();
        navigate(location.pathname); // Navigate to the same page after sign-in
      } else {
        // If user is logged in, check if they exist in Firestore
        const userRef = doc(db, "Users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          try {
            await setDoc(userRef, {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              createdAt: Date.now(),
            });
            console.log("User document created successfully.");
          } catch (error) {
            console.error("Error creating user document:", error);
          }
        } else {
          console.log("User already exists:", userSnapshot.data());
        }
      }
      setIsLoading(false); // Set loading to false after user handling
    };
    handleUser();
  }, [user, loading, googleSignIn, navigate, location]);

  const myMeeting = async (element) => {
    if (!user) return; // Return if user is not logged in

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
    const displayName = user.displayName || "Guest";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      displayName
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `https://rtc-realtimechat.netlify.app/room/${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: true,
        showWhiteboardButton: true,
        showChatButton: true,
        userRoles: [
          { role: "host", permissions: ["muteOthers", "kickOut", "startRecording"] },
          { role: "guest", permissions: ["chat", "react", "shareScreen"] },
        ],
        showRecordingButton: true,
        enableReactions: true,
      });
      
      console.log("Whiteboard enabled:", zc.joinRoom);
  };

  return (
    <div className="vc dark:bg-slate-800 h-screen w-full">
      {isLoading ? ( // Show loading state until user handling is complete
        <p>Loading...</p>
      ) : user ? ( // If user is logged in
        <div ref={myMeeting} className="meeting bg-slate-800 md:h-[100vh] md:w-full p-0 flex flex-row justify-center items-center" /> // Set the meeting element
      ) : (
        <p>Please log in to join the meeting.</p> // Message if user is not logged in
      )}
    </div>
  );
};

export default RoomPage;
