import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./components/Chat";
import RoomForm from "./components/RoomForm";
import useAuth from "./hooks/useAuth";
import { motion, useAnimationControls } from "framer-motion";

function HomePage() {
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState("");
  const { googleSignIn, signOut } = useAuth();

  // Animation Controls
  const controls = useAnimationControls();

  useEffect(() => {
    const loop = async () => {
      let isActive = true;
      while (isActive) {
        await controls.start("visible");
        await new Promise((resolve) => setTimeout(resolve, 8000)); // Delay 10 seconds
      }
      return () => {
        isActive = false;
      };
    };
    loop();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger animation for children
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: "-10%" },
    visible: { opacity: 1, y: "0%", transition: { duration: 1 } },
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center gap-5 pt-10">
        <h1 className="sm:hidden text-4xl font-bold text-transparent bg-clip-text text-center">
          <span className="text-5xl font-extrabold text-purple-600">RTC</span>
          <br />
          <span className="text-xl text-pink-900">Real Time Chat</span>
        </h1>
        <h1 className="max-sm:hidden text-6xl font-bold text-transparent textCol">
          RTC - Real Time Chat
        </h1>
        {user && <h2 className="text-white text-opacity-90">Welcome {user.displayName}</h2>}
        {/* Sign In/Out Button */}
        {user ? (
          <button
            onClick={signOut}
            className="bg-[#0370E9] border-black border-2 rounded-xl font-bold p-4 text-center w-[13rem]"
          >
            Sign Out
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.95 }}
            whileDrag={{ scale: 0.9, rotate: 10 }}
            drag
            onClick={googleSignIn}
            className="bg-[#0370E9] border-black border-2 rounded-xl font-bold p-4 text-center w-[13rem]"
          >
            Google Sign In
          </motion.button>
        )}
      </div>

      {/* Animation Section */}
      {!user && (
        <motion.div
          className="overflow-hidden sm:p-20 sm:mt-10 max-sm:mt-20 w-full h-full bg-gradient-to-r from-purple-600 to-red-800 font-bold text-5xl text-transparent bg-clip-text max-sm:p-5 max-sm:text-6xl"
          animate={controls}
          initial="hidden"
          variants={containerVariants}
        >
          <motion.span className="sm:text-8xl" variants={textVariants}>
            Welcome
          </motion.span>
          <br />
          <motion.span className="sm:text-5xl" variants={textVariants}>
            to the
          </motion.span>{" "}
          <motion.span className="sm:text-red-800" variants={textVariants}>
            RTC
          </motion.span>
          ,{" "}
          <motion.span className="max-sm:text-4xl" variants={textVariants}>
            <span>
              {" "}
              <br />{" "}
            </span>
            <motion.span className="sm:text-red-800" variants={textVariants}>
              Sign In
            </motion.span>{" "}
            to Continue.
          </motion.span>
        </motion.div>
      )}

      {/* Room Form or Chat */}
      {user && !currentRoom && <RoomForm setCurrentRoom={setCurrentRoom} />}
      {user && currentRoom && (
        <Chat setCurrentRoom={setCurrentRoom} room={currentRoom} />
      )}
    </div>
  );
}

export default HomePage;
