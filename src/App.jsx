import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainApp from './MainApp';
import Zego from './components/Zego';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainApp />} />
      <Route path='/room/:roomID' element={<Zego />} />
    </Routes>
  );
}

export default App;
