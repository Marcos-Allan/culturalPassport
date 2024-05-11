import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import SignIn from './screens/SignIn/index.tsx';
import Signs from './screens/Signs/index.tsx';
import Home from './screens/Home/index.tsx';
import SignUp from './screens/SignUp/indx.tsx';

import { Provider } from './provider/index.tsx';
import ErrorPage from './screens/ErrorPage/index.tsx';
import ForgoutPassword from './screens/ForgoutPassword/index.tsx';
import ConfirmCode from './screens/ConfirmCode/index.tsx';
import SwitchPassword from './screens/SwitchPassword/index.tsx';
import Menu from './components/Menu/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "signs",
    element: <Signs />,
    errorElement: <ErrorPage />
  },
  {
    path: "sign-in",
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: "sign-up",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: "forgout-passowrd",
    element: <ForgoutPassword />,
    errorElement: <ErrorPage />
  },
  {
    path: "confirm-code",
    element: <ConfirmCode />,
    errorElement: <ErrorPage />
  },
  {
    path: "switch-password",
    element: <SwitchPassword />,
    errorElement: <ErrorPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
      <Menu />
    </Provider>
  </React.StrictMode>,
)
