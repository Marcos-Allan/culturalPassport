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
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"

//IMPORTAÇÃO DOS ICONES
import { CiLogout } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";
import { IoSunny, IoMoon } from "react-icons/io5";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';
import Return from '../../components/Return/index.tsx';
import BottomNavigation from '../../components/BottomNavigation/index.tsx';

export default function Configuration(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleLoading, toggleLogout, isLogout, toggleDeleteAccount, isDelAccount, toggleTheme, userS } = states
    
    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(false)
    },[])

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[userS.logged])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage text="Configurações" space={true} />
            </Navbar>
            <div className={`w-full flex flex-col items-center lg:h-full lg:w-[60%]`}>
                {userS.logged == true && (
                    <div
                        className={`w-[80%] flex py-3 transition-all duration-[.2s] cursor-pointer
                            ${theme == 'light' ? 'text-my-black hover:text-my-secondary' : 'text-my-white hover:text-my-quintenary'}
                        `}
                        onClick={() => toggleLogout(!isLogout)}
                    >
                        <CiLogout className={`text-[30px]`} />
                        <p className={`text-[18px] font-semibold capitalize flex-grow-[1] text-left ps-[50px]`}>logout</p>
                    </div>
                )}

                {userS.logged == true && (
                    <div
                        className={`w-[80%] flex py-3 transition-all duration-[.2s] cursor-pointer 
                            ${theme == 'light' ? 'text-my-black hover:text-my-secondary' : 'text-my-white hover:text-my-quintenary'}
                        `}
                        onClick={() => toggleDeleteAccount(!isDelAccount)}
                    >
                        <IoMdTrash className={`text-[30px]`} />
                        <p className={`text-[18px] font-semibold capitalize flex-grow-[1] text-left ps-[50px]`}>deletar conta</p>
                    </div>
                )}

                <div
                    className={`
                        w-[80%] flex py-3 transition-all duration-[.2s] cursor-pointer
                        ${theme == 'light' ? 'text-my-black hover:text-my-secondary' : 'text-my-white hover:text-my-quintenary'}
                    `}
                    onClick={() => toggleTheme()}
                >
                    {/* VERIFICA SE O TEMA ESTÁ NO MODO dark OU light */}
                    {theme == 'light' ? (
                        //BOTA O ICONE DE SOL SE ESTIVER NO MODO LIGHT
                        <>
                            <IoSunny
                                className={`text-[30px]`}
                            />
                            <p className="text-[18px] font-semibold capitalize flex-grow-[1] text-left ps-[50px]">light mode</p>
                        </>
                    ):(
                        //BOTA O ICONE DE LUA SE ESTIVER NO MODO DARK
                        <>
                            <IoMoon
                                className={`text-[30px]`}
                            />
                            <p className="text-[18px] font-semibold capitalize flex-grow-[1] text-left ps-[50px]">dark mode</p>
                        </>
                    )}
                </div>

            </div>
            
            {userS.logged == true && (
                <BottomNavigation />
            )}
        </>
    )
}