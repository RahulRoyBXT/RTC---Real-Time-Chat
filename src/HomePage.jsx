import { useState } from 'react'
import { auth, db } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from './components/Chat';
import RoomForm from './components/RoomForm';
import useAuth from './hooks/useAuth';

function HomePage() {
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState('');
  const { googleSignIn,signOut } = useAuth();
  return (
    <div className='max-sm:bg-gray-200 max-sm:dark:bg-white w-full min-h-screen'>
      <div className='flex flex-col items-center gap-5 pt-10'>
        <h1 className='sm:hidden text-4xl font-bold text-transparent bg-clip-text text-center'>
         <span className='text-5xl font-extrabold text-purple-600'> RTC </span> <br /><span className='text-xl text-pink-900'> Real Time Chat </span>
        </h1>
        <h1 className='max-sm:hidden text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-900'>
          RTC - Real Time Chat
        </h1>
        {
          user && <h2>Welcome {user.displayName}</h2>
        }
        {
          user ? (
            <button onClick={signOut} className='border-black border-2 rounded-xl font-bold p-4 text-center w-[13rem]'>
              Sign Out
            </button>
          ) : (
            <button onClick={googleSignIn} className='border-black border-2 rounded-xl font-bold p-4 text-center w-[13rem]'>
              Google Sign In
            </button>
          )
        }
      </div>
      {
        !user && <div className='max-sm:mt-20 w-full h-full bg-gradient-to-r from-purple-600 to-red-800 font-bold text-5xl text-transparent bg-clip-text  max-sm:p-2 max-sm:text-6xl'>
          Welcome to the RTC, <span className='max-sm:text-4xl'><span className='sm:hidden'> <br/> </span>Sign In to Continue.</span>
        </div>
      }
      {/* {
        user && currentRoom && <Chat setCurrentRoom={setCurrentRoom} room={currentRoom} />
      } */}
      {
        user && !currentRoom && <RoomForm setCurrentRoom={setCurrentRoom} />
      }
    </div>
  )
}

export default HomePage;
