/**
 * MIT License with Additional Restrictions
 * 
 * Copyright (c) 2024 Marcos Allan Santos Menezes
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * 2. The Software may not be used, modified, or distributed without the prior
 * written permission of the copyright holder.
 * 
 * 3. The Software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the Software or the use or other dealings in the
 * Software.
 * 
 * By using the Software, you agree to these terms and conditions.
 */

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
import SignIn from './screens/SignIn/index.tsx';
import SignUp from './screens/SignUp/indx.tsx';
import ForgoutPassword from './screens/ForgoutPassword/index.tsx';
import ConfirmCode from './screens/ConfirmCode/index.tsx';
import SwitchPassword from './screens/SwitchPassword/index.tsx';
import ErrorPage from './screens/ErrorPage/index.tsx';
import LoadingPage from './components/LoadingPage';
import MyPerfil from './screens/MyPerfil/index.tsx';
import Materias from './screens/Materias/index.tsx';
import Achievements from './screens/Achievements/index.tsx';
import Matter from './screens/Matter/index.tsx';
import Test from './screens/Test/index.tsx';
import Content from './screens/Content/index.tsx';
import Travel from './screens/Travel/index.tsx';
import Feedback from './screens/Feedback/index.tsx';
import Travels from './screens/Travels/index.tsx';
import Ranking from './screens/Ranking/index.tsx';
import Configuration from './screens/Configuration/index.tsx';
import UserProfile from './screens/UserProfile/index.tsx';
import MathQuest from './screens/Games/MathQuest/index.tsx';
import QuiChoice from './screens/Games/QuiChoice/index.tsx';

//IMPORTAÇÃO DO PROVEDOR QUE GUARDA AS VÁRIAVEIS DE ESTADO GLOBAL
import { Provider } from './provider/index.tsx';

//IMPORTAÇÃO DOS COMPONENTES PRESENTES EM TODAS AS PÁGINAS
import ScreenPage from './components/ScreenPage/index.tsx';
import Alert from './components/Alert/index.tsx';
import LogoutPage from './components/LogoutPage/index.tsx';
import DeleteAccountPage from './components/DeleteAccountPage/index.tsx';
import NotificationProgramed from './components/NotificationProgramed/index.tsx';
import PomodoroTimer from './components/PomodoroTimer/index.tsx';

//ARQUIVO DE CONFIGURAÇÃO DAS ROTAS
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "forgout-password",
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
    path: "feedback",
    element: <Feedback />,
    errorElement: <ErrorPage />
  },
  {
    path: "achievements",
    element: <Achievements />,
    errorElement: <ErrorPage />
  },
  {
    path: "travels",
    element: <Travels />,
    errorElement: <ErrorPage />
  },
  {
    path: "travels/:travel",
    element: <Travel />,
    errorElement: <ErrorPage />
  },
  {
    path: "materias/:matter",
    element: <Matter />,
    errorElement: <ErrorPage />
  },
  {
    path: "materias/:matter/test",
    element: <Test />,
    errorElement: <ErrorPage />
  },
  {
    path: "materias/:matter/content/:content",
    element: <Content />,
    errorElement: <ErrorPage />
  },
  {
    path: "ranking",
    element: <Ranking />,
    errorElement: <ErrorPage />
  },
  {
    path: "configuration",
    element: <Configuration />,
    errorElement: <ErrorPage />
  },
  {
    path: "ranking/user/:user",
    element: <UserProfile />,
    errorElement: <ErrorPage />
  },
  {
    path: "games/math-quest",
    element: <MathQuest />,
    errorElement: <ErrorPage />
  },
  {
    path: "games/qui-choice",
    element: <QuiChoice />,
    errorElement: <ErrorPage />
  }
])

//RENDRIZADOR DAS PÁGINAS
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <ScreenPage>
        <RouterProvider router={router} />
        <LoadingPage />
        <NotificationProgramed />
        <PomodoroTimer />
        <Alert />
        <LogoutPage />
        <DeleteAccountPage />
      </ScreenPage>
    </Provider>
  </React.StrictMode>,
)
