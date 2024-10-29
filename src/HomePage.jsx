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
        <h1 className='max-sm:hidden text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-900'>
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
        !user && <><div className='sm:p-20 sm:mt-10 max-sm:mt-20 w-full h-full bg-gradient-to-r from-purple-600 to-red-800 font-bold text-5xl text-transparent bg-clip-text  max-sm:p-5 max-sm:text-6xl'>
         <span className='sm:text-6xl sm:leading-loose'> Welcome</span><br /><span className='sm:text-5xl'> to the</span> <span className='sm:text-red-800'> RTC</span>,  <span className='max-sm:text-4xl'><span> <br/> </span><span className='sm:text-red-800'>Sign In</span> to Continue.</span>
        </div>
        </>
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
