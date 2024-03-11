import { useState } from 'react';
import { Outlet } from 'react-router';

import Navbar from './components/navbar';


function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
