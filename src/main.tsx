import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './screens/Login/index.tsx';
import Background from './components/Background/index.tsx';
import Home from './screens/Home/index.tsx';


let isDark = false
isDark = false
//isDark = true

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home isDark={isDark} />,
  },
  {
    path: "/login",
    element: <Login isDark={isDark} />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <Background isDark={isDark} />
      <RouterProvider router={router} />
    </>
  </React.StrictMode>,
)
