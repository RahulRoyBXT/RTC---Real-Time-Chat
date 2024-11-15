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
        await new Promise((resolve) => setTimeout(resolve, 8000));
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
        {user && (
          <h2 className="text-white text-opacity-90">
            Welcome {user.displayName}
          </h2>
        )}
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
        <>
          <div className="mt-[25vh] max-md:hidden">
            <motion.div className="text-center">
              <motion.h1
                className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Welcome to RTC
              </motion.h1>
              <motion.p
                className="text-2xl font-semibold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Your Gateway to Seamless Video Communication
              </motion.p>
              <motion.p
                className="text-3xl font-bold mt-6 animate-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                  textShadow:
                    "0 0 10px rgba(236, 72, 153, 0.7), 0 0 20px rgba(236, 72, 153, 0.5)",
                  animation: "glow 2s ease-in-out infinite",
                }}
              >
                Sign in to continue
              </motion.p>
              <style>
                {`
            @keyframes glow {
              0%, 100% {
                filter: brightness(100%) drop-shadow(0 0 8px rgba(236, 72, 153, 0.7));
              }
              50% {
                filter: brightness(120%) drop-shadow(0 0 12px rgba(236, 72, 153, 0.9));
              }
            }
          `}
              </style>
            </motion.div>
          </div>


          {/* another section */}
          <motion.div
            className="md:hidden overflow-hidden sm:p-20 sm:mt-10 max-sm:mt-20 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-5xl text-transparent bg-clip-text max-sm:p-5 max-sm:text-6xl"
            animate={controls}
            initial="hidden"
            variants={containerVariants}
          >
            <motion.span
              className="sm:text-8xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text"
              variants={textVariants}
            >
              Welcome
            </motion.span>
            <br />
            <motion.span
              className="sm:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text"
              variants={textVariants}
            >
              to the
            </motion.span>{" "}
            <motion.span className="text-purple-600" variants={textVariants}>
              RTC
            </motion.span>
            ,{" "}
            <motion.span className="max-sm:text-4xl" variants={textVariants}>
              <span>
                {" "}
                <br />{" "}
              </span>
              <motion.span className="text-pink-600" variants={textVariants}>
                Sign In
              </motion.span>{" "}
              to Continue.
            </motion.span>
          </motion.div>
          <div className="max-md:pb-10">
            <motion.div
              className="text-center mt-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-2xl font-black mb-4 text-white">
                Experience Crystal Clear Video Calls
              </h2>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-gray-700">
                <div className="bg-gray-300 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                  <h3 className="font-bold text-xl mb-2 text-blue-500">
                    HD Quality
                  </h3>
                  <p>
                    Crystal clear video and audio quality for seamless
                    communication with your friends and colleagues.
                  </p>
                </div>
                <div className="bg-gray-300 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                  <h3 className="font-bold text-xl mb-2 text-purple-500">
                    Secure
                  </h3>
                  <p>
                    Your calls are end-to-end encrypted, ensuring your
                    conversations remain private and secure.
                  </p>
                </div>
                <div className="bg-gray-300 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                  <h3 className="font-bold text-xl mb-2 text-pink-500">Free</h3>
                  <p>
                    Connect with anyone, anywhere in the world without any
                    charges. Just sign in and start calling!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
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
