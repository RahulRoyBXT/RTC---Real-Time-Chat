import { auth, db } from "../firebase"; // Your Firebase configuration
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import bcrypt from "bcryptjs";

const RoomPage = () => {
  const [user, loading] = useAuthState(auth); // Authenticated user
  const { roomID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // Password verification state
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false); // Show password prompt
  const [roomPassword, setRoomPassword] = useState(""); // User-entered password
  const [passwordMessage, setPasswordMessage] = useState("Room Password Validity is 5 hrs"); // Password message

  useEffect(() => {
    const handleUser = async () => {
      if (loading) return;
      if (!user) {
        await googleSignIn();
        navigate(location.pathname);
      }
      setIsLoading(false);
    };
    handleUser();
  }, [user, loading, googleSignIn, navigate, location]);

  // Check if room requires password
  const checkRoomPassword = async () => {
    try {
      const roomRef = doc(db, "rooms", roomID);
      const roomSnapshot = await getDoc(roomRef);
      if (roomSnapshot.exists()) {
        const roomData = roomSnapshot.data();

        // Directly compare entered password with the stored password (not secure in production)
        const truePass = await bcrypt.compare(roomPassword, roomData.password);
        if (truePass) {
          setIsPasswordVerified(true); // Password verified
        } else {
          setPasswordMessage('Incorrect Password');
        }
      } else {
        setPasswordMessage('Room Not Found');
      }
    } catch (error) {
      setPasswordMessage("Error verifying password:", error);
    }
  };

  const myMeeting = async (element) => {
    if (!user || !isPasswordVerified) return;

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
  };

  return (
    <div className="vc dark:bg-slate-800 max-md:h-[100dvh] max-md:flex max-md:justify-center max-md:items-center md:h-[100vh] md:w-[100vw]">

      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        isPasswordVerified ? (
          <div ref={myMeeting} className="meeting bg-slate-800 md:h-[100vh] md:w-full p-0 flex flex-row justify-center items-center" />
        ) : showPasswordPrompt ? (<>
          <Link to='/' className="absolute left-[10%] top-[5%] text-2xl text-slate-500 bg-slate-700 p-2 rounded-md">Home</Link>

          <div className="flex flex-col md:gap-5 md:h-[100vh] md:justify-center md:items-center max-md:text-slate-400 max-md:justify-center max-md:items-center max-md:h-[100dvh] max-md:gap-5 max-md:p-5 text-center">
          <p className="max-md:text-2xl max-md:font-black  md:text-3xl md:text-slate-500 md:font-semibold">{passwordMessage}</p>
            <input
              type="password"
              placeholder="Enter Room Password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              className="max-md:text-xl max-md:font-black max-md:h-[5vh] text-center rounded-xl p-2 outline-blue-950"
            />
            
            <button className="md:h-[8%] md:w-[10%] md:text-slate-600 md:text-xl max-md:text-3xl max-md:h-[10dvh] max-md:w-[50dvw] rounded-3xl bg-slate-950 border-2 border-blue-900" onClick={checkRoomPassword}>Join Room</button>
          </div>
          </>
        ) : (
          <>
          <Link to='/' className="absolute left-[10%] top-[5%] text-2xl text-slate-500 bg-slate-700 p-2 rounded-md">Home</Link>

          <div className="flex flex-col md:gap-5 md:h-[100vh] md:justify-center md:items-center max-md:text-slate-400 max-md:justify-center max-md:items-center max-md:h-[100dvh] max-md:gap-5 max-md:p-5 text-center">
            <span className="max-md:text-2xl max-md:font-black md:text-3xl md:text-slate-500 md:font-semibold">{passwordMessage}</span>
            <button className="md:h-[10%] md:w-[20%] md:text-slate-600 md:text-2xl max-md:text-3xl max-md:h-[10dvh] max-md:w-[50dvw] rounded-3xl bg-slate-950 border-2 border-blue-900" onClick={() => setShowPasswordPrompt(true)}>Enter Room</button>
          </div>
          </>
        )
      ) : (<>
        <Link to='/' className="absolute left-[10%] top-[5%] text-2xl text-slate-500 bg-slate-700 p-2 rounded-md">Home</Link>

        <p>Please log in to join the meeting.</p>
        </>
      )}
    </div>
  );
};

export default RoomPage;
