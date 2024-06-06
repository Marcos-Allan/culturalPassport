//IMPORTAÇÃO DAS BIBLIOTECAS
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//IMPORTAÇÃO DO CSS GLOBAL
import './index.css'

//IMPORTAÇÃO DAS PÁGINAS
import Home from './screens/Home/index.tsx';
import Signs from './screens/Signs/index.tsx';
import SignIn from './screens/SignIn/index.tsx';
import SignUp from './screens/SignUp/indx.tsx';
import ForgoutPassword from './screens/ForgoutPassword/index.tsx';
import ConfirmCode from './screens/ConfirmCode/index.tsx';
import SwitchPassword from './screens/SwitchPassword/index.tsx';
import ErrorPage from './screens/ErrorPage/index.tsx';
import LoadingPage from './components/LoadingPage';
import MyPerfil from './screens/MyPerfil/index.tsx';
import Materias from './screens/Materias/index.tsx';
import Notifications from './screens/Notifications/index.tsx';
import Chat from './screens/Chat/index.tsx';
import Achievements from './screens/Achievements/index.tsx';

//IMPORTAÇÃO DO PROVEDOR QUE GUARDA AS VÁRIAVEIS DE ESTADO GLOBAL
import { Provider } from './provider/index.tsx';

//IMPORTAÇÃO DOS COMPONENTES PRESENTES EM TODAS AS PÁGINAS
import ScreenPage from './components/ScreenPage/index.tsx';
import Alert from './components/Alert/index.tsx';
import Exercises from './screens/Exercises/index.tsx';

//ARQUIVO DE CONFIGURAÇÃO DAS ROTAS
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
  {
    path: "my-perfil",
    element: <MyPerfil />,
    errorElement: <ErrorPage />
  },
  {
    path: "materias",
    element: <Materias />,
    errorElement: <ErrorPage />
  },
  {
    path: "notifications",
    element: <Notifications />,
    errorElement: <ErrorPage />
  },
  {
    path: "chat",
    element: <Chat />,
    errorElement: <ErrorPage />
  },
  {
    path: "achievements",
    element: <Achievements />,
    errorElement: <ErrorPage />
  },
  {
    path: "exercises",
    element: <Exercises />,
    errorElement: <ErrorPage />
  },
])

//RENDRIZADOR DAS PÁGINAS
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <ScreenPage>
        <RouterProvider router={router} />
        <LoadingPage />
        <Alert />
      </ScreenPage>
    </Provider>
  </React.StrictMode>,
)
