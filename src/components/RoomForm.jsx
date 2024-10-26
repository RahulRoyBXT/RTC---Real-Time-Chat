import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

const RoomForm = ({ setCurrentRoom }) => {

RoomForm.propTypes = {
  setCurrentRoom: PropTypes.func.isRequired,
};
    let inputRef = useRef(null);

    // vc code starts
    const [value, setValue] = useState();

    const navigate = useNavigate();
    const handleJoinVC = useCallback(() => {
        navigate(`/room/${value}`);
    }, [navigate, value]);

    // vc code ends

    return (
        <div className="w-full h-full flex flex-wrap p-6 gap-5 items-center justify-center">
            <div className="w-[22rem] h-[22rem] mr-5 flex flex-col justify-center items-center gap-4 bg-slate-300 rounded-xl">
                <h3 className="font-semibold text-2xl">Enter Room ID to Join</h3>
                <br />
                <input autoFocus ref={inputRef} onKeyUp={(e) => {
                    if (e.key == 'Enter') {
                        // joining room
                        setCurrentRoom(inputRef.current.value)
                    }
                }} type="text" placeholder="Enter Room ID . . ." className="p-3 font-medium focus:outline-none border-2 border-gray-500 rounded-lg" />
                <button onClick={() => setCurrentRoom(inputRef.current.value)} className="p-4 bg-blue-800 text-white rounded-lg">
                    Enter Room
                </button>
            </div>

            {/* for vc */}
            <div className="w-[22rem] h-[22rem] mr-5 flex flex-col justify-center items-center gap-4 bg-slate-300 rounded-xl">
                <h3 className="font-semibold text-2xl">Enter Room ID to Join Video Call</h3>
                <br />
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Enter Room ID . . ." className="p-3 font-medium focus:outline-none border-2 border-gray-500 rounded-lg" />
                <button onClick={handleJoinVC} className="p-4 bg-blue-800 text-white rounded-lg">
                    Enter Call
                </button>
            </div>

        </div>
    )
}

export default RoomForm;