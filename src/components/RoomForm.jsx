import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
    <div className="w-full h-full flex flex-wrap p-6 gap-5 items-center justify-center">
      {/* <div className="w-[22rem] h-[22rem] mr-5 flex flex-col justify-center items-center gap-2 bg-slate-400 rounded-xl">
                <h3 className="font-bold text-2xl font-mono text-center">Enter Room ID <span className="sm:hidden"><br/></span> to<span className="sm:hidden"><br/></span><span className="max-sm:text-3xl max-sm:font-black"> Join</span></h3>
                <br />
                <input autoFocus ref={inputRef} onKeyUp={(e) => {
                    if (e.key == 'Enter') {
                        // joining room
                        setCurrentRoom(inputRef.current.value)
                    }
                }} type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder={roomId} className="p-3 font-medium focus:outline-none border-2 border-gray-500 rounded-lg" />
                <button onClick={() => setCurrentRoom(inputRef.current.value)} className="p-4 bg-blue-800 text-white rounded-lg">
                    Enter Room
                </button>
            </div> */}

      {/* for vc */}
      <div className="w-[22rem] h-[22rem] mr-5 flex flex-col justify-center items-center gap-2 bg-slate-400 rounded-xl">
        <h3 className="font-bold text-2xl font-mono text-center">
          Enter Room ID{" "}
          <span className="sm:hidden">
            <br />
          </span>{" "}
          to<span className="max-sm:text-3xl max-sm:font-black"> Join</span>
          <span className="sm:hidden">
            <br />
          </span>
          <span className="max-sm:text-3xl max-sm:font-black">Video Call</span>
        </h3>
        <br />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter Room ID . . ."
          className="p-3 font-medium focus:outline-none border-2 border-gray-500 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 font-medium focus:outline-none border-2 border-gray-500 rounded-lg"
        />
        <button
          onClick={handleJoinVC}
          className="p-4 bg-blue-800 text-white rounded-lg font-semibold"
        >
          Enter Call
        </button>
      </div>
    </div>
  );
};

export default RoomForm;
