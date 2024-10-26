import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import Message from "./Message";

const Chat = ({ room, setCurrentRoom }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(''); // this is input
    const sendMessage = async () => {
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }
   
   
        
        const { uid, displayName, photoURL } = auth.currentUser;
        console.log('Its the image');
        console.log(photoURL);

        await addDoc(collection(db, room), {
            text: message,
            name: displayName,
            avatar: photoURL,
            createdAt: Date.now(),
            uid
        })
        setMessage('')

        // scroll to bottom of messages
        scrollRef.current.scroll({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }

    useEffect(() => {
        const q = query(
            collection(db, room),
            orderBy("createdAt"),
            limit(50)
        )
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let theseMessages = [];
            QuerySnapshot.forEach((doc) => {
                theseMessages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(theseMessages)
        })
        return () => unsubscribe;
    }, [room])

    useEffect(() => {
        scrollRef.current.scroll({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages])

    let scrollRef = useRef(null);

    return (
        <div className="mt-4 w-full bg-gray-100 shadow-2xl rounded-2xl p-4 sm:p-6 h-[90vh] flex flex-col relative">
            <button 
                onClick={() => setCurrentRoom('')} 
                className="absolute left-2 sm:left-4 top-2 sm:top-4 px-3 sm:px-4 py-1 sm:py-2 text-white bg-red-600 hover:bg-red-700 rounded-full text-xs sm:text-sm transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
                Exit Room
            </button>
            <div className="w-full overflow-auto h-[calc(100%-4rem)] mt-12 sm:mt-16 mb-2 sm:mb-4 pr-2 sm:pr-4" ref={scrollRef}>
                {messages?.map(curr => (
                    <Message
                        key={curr.uid}
                        userName={curr.displayName}
                        text={curr.text}
                        imageSource={curr.avatar}
                        isOfUser={auth.currentUser.displayName === curr.name}
                        createdAt={curr.createdAt}
                    />
                ))}
            </div>
            <div className="w-full flex items-center space-x-2">
                <input 
                    type="text" 
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') sendMessage()
                    }} 
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 sm:p-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 ease-in-out text-sm sm:text-base"
                    autoFocus 
                    value={message} 
                    placeholder="Type a message..." 
                />
                <button 
                    onClick={sendMessage} 
                    className="p-2 sm:p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat


import PropTypes from 'prop-types';

Chat.propTypes = {
  setCurrentRoom: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  })).isRequired,
  auth: PropTypes.shape({
    currentUser: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  sendMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
};

