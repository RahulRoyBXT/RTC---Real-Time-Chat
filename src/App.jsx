
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Zego from './components/Zego';
import useCleanupRooms from './hooks/useCleanupRooms'
import { AnimatedBackground } from 'animated-backgrounds';
import { useEffect, useState } from 'react';

function App() {
  if (import.meta.env.MODE === 'development') {
    console.log("App is running in development mode.");
  }
  useCleanupRooms();

  // const [animationName, setAnimationName] = useState('starryNight');
  // useEffect(() => {
  //   const animations = ['rainbowWaves', 'floatingBubbles', 'gradientWave', 'particleNetwork', 'galaxySpiral'];
  //   const storedIndex = localStorage.getItem('backgroundAnimationIndex');
  //   const newIndex = storedIndex ? (parseInt(storedIndex) + 1) % animations.length : 0;
  //   setAnimationName(animations[newIndex]);
  //   localStorage.setItem('backgroundAnimationIndex', newIndex.toString());
  // }, []);
  return (<>
    <AnimatedBackground animationName='auroraBorealis'/>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/room/:roomID' element={<Zego />} />
    </Routes>
    </>
  );
}

export default App;
