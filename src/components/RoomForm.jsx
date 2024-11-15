import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";


import PropTypes from "prop-types";

const RoomForm = ({ setCurrentRoom }) => {

    const { createRoomWithPassword } = useAuth();
  const generateRoomId = () => {
    const ID = new Date().getTime().toString(36);
    return ID;
  };
  const [roomId, setRoomId] = useState(generateRoomId()); // Not necessary

  const [password, setPassword] = useState(""); // State for room password

  RoomForm.propTypes = {
    setCurrentRoom: PropTypes.func.isRequired,
  };
  let inputRef = useRef(null);

  // vc code starts
  const [value, setValue] = useState(generateRoomId());

  const navigate = useNavigate();

  const handleJoinVC = useCallback(async () => {
    await createRoomWithPassword(value, password); // Save room ID and password to Firebase
    navigate(`/room/${value}`); // Navigate to the room
  }, [navigate, value, password,createRoomWithPassword]);

  // vc code ends

  return (
    <div className="w-full h-full flex flex-wrap p-6 gap-5 items-center justify-center ">
      <motion.div
        className="w-[22rem] h-[22rem] mr-5 flex flex-col justify-center items-center gap-2 bg-white bg-opacity-80 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-bold text-2xl font-mono text-center text-purple-600">
          Join a Room for Video Call
        </h3>
        <br />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter Room ID..."
          className="p-3 font-medium focus:outline-none border-2 border-purple-500 rounded-lg"
        />
        <input
          type="password"
          placeholder="Enter Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 font-medium focus:outline-none border-2 border-purple-500 rounded-lg"
        />
        <button
          onClick={handleJoinVC}
          className="p-4 bg-purple-800 text-white rounded-lg font-semibold hover:bg-purple-700"
        >
          Join Call
        </button>
      </motion.div>
    </div>
  );
};

export default RoomForm;
