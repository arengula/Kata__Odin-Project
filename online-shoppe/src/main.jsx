import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'

const ROUTER = createBrowserRouter( [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <p>Home!</p>, },
      { path: "shop", element: <p>Shop!</p>, },
      { path: "mycart", element: <p>My Cart!</p>, },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ROUTER} />
  </React.StrictMode>,
)
