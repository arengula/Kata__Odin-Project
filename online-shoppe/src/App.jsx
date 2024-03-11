import { useState } from 'react';
import { Outlet } from 'react-router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProductDisplay from './components/productDisplay.jsx';
import Navbar from './components/navbar';

const ROUTER = createBrowserRouter( [
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <p>Home!</p>, },
      { path: "shop", element: <ProductDisplay />, },
      { path: "mycart", element: <p>My Cart!</p>, },
    ]
  },
])


function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <RouterProvider router={ROUTER} />
    </>
  )
}

export default App
