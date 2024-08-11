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
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DOS ICONES 
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md"

//IMPORTAÇÃO DOS COMPONENTES
import ToggleTheme from "../ToggleTheme";
import LogoutButton from "../LogoutButton";

export default function Menu() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()
    
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, menuOpen, toggleMenuOpen, userS } = states

    return(
        <div
            className={`
                flex items-center flex-col absolute top-0 w-[280px] sm:w-[360px] lg:w-[425px] h-full ${userS.logged == true ? 'pt-32' : 'pt-1'} sm:rounded-tr-[16px] sm:rounded-br-[16px] lg:pe-32 z-[2]
                ${theme == 'light' ? 'bg-my-black text-my-white' : 'bg-my-white text-my-black'}
                ${menuOpen == true ? 'left-0' : 'left-[-280px] sm:left-[-360px] lg:left-[-425px]'}
                transition-[left] duration-[0.6s]
            `}
        >
            <IoCloseOutline
                className={`
                    absolute top-0 end-0 text-[36px] m-2 hover:scale-[1.2] transition-all duration-[.2s] cursor-pointer
                    ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                `}
                onClick={() => toggleMenuOpen()}
            />

            {/* VERIFICA SE O ESTADO DA VARIAVEL GLOBAL userS.logged É IGUAL A TRUE */}
            {userS.logged == true && (
                //COLOCA OS DADOS DE FOTO E NOME DO USUÁRIO NA TELA
                <div
                    className={`flex items-center gap-[10px] absolute top-0 left-0 m-3`}
                >

                    <div
                        className={`absolute top-[0px] left-[58px] w-[25px] h-[25px] rounded-[50%] flex items-center justify-center cursor-pointer hover:scale-[1.2] transition-all duration-[.2s] ${theme == 'light' ? 'bg-my-quartenary' : 'bg-my-terciary'}`}
                        onClick={() => navigate('/my-perfil')}
                    >
                        <MdOutlineEdit className={`pb-[3px] text-[20px] text-my-white`}/>
                    </div>

                    <img
                        src={userS.img}
                        alt=""
                        className={`rounded-[50%] mb-2 w-20 h-20 border-[1px] ${theme == 'light' ? 'border-my-quartenary' : 'border-my-terciary'} p-1`}
                    />

                    <p className={`text-[22px] font-bold capitalize
                        ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                    `}>{userS.name}</p>

                </div>
            )}
            <ToggleTheme />

            {/* VERIFICA SE O ESTADO DA VARIAVEL GLOBAL userS.logged É IGUAL A TRUE */}
            {userS.logged == true && (
                <LogoutButton />
            )}
        </div>
    )
}