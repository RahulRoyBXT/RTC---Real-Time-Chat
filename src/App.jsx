
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Zego from './components/Zego';
import useCleanupRooms from './hooks/useCleanupRooms'

function App() {
  if (import.meta.env.MODE === 'development') {
    console.log("App is running in development mode.");
  }
  useCleanupRooms();
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/room/:roomID' element={<Zego />} />
    </Routes>
  );
}

export default App;
