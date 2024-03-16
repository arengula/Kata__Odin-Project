import { useState } from 'react';
import { Outlet } from 'react-router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProductDisplay from './components/productDisplay.jsx';
import MyCart from './components/myCart.jsx';
import Navbar from './components/navbar';
import Home from './components/home.jsx';

function App() {
  const [cart, setCart] = useState([]);
  const clearCart = function() { setCart([]) }
  const addToCart = function(newItem) {
    setCart([ ...cart, newItem ])
  }

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
        { path: "/", element: <Home />},
        { path: "shop", element: <ProductDisplay onItemSelect={addToCart}/>},
        { path: "mycart", element: <MyCart cart={cart} onPurchase={clearCart}/>},
      ]
    },
  ])

  return (
    <>
      <RouterProvider router={ROUTER} />
    </>
  )
}

export default App
