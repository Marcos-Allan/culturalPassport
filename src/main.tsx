import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import SignIn from './screens/SignIn/index.tsx';
import Home from './screens/Home/index.tsx';
import SignUp from './screens/SignUp/indx.tsx';

import { Provider } from './provider/index.tsx';
import ErrorPage from './screens/ErrorPage/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
