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

//IMPORTAÇÃO DOS ICONES
import { IoMdSend, IoIosAdd } from 'react-icons/io'

//IMPORTAÇÃO DOS COMPONENTES
import BottomNavigation from "../../components/BottomNavigation";
import Menu from "../../components/Menu";
import MenuButton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Chat() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Chat`}
                />
                <MenuButton />
            </Navbar>

            <div className={`${theme == 'light' ? 'bg-my-white' : 'bg-my-black'} w-[90%] sm:w-[60%] pt-[30px] h-[calc(100%-190px)] flex flex-col gap-[20px]`}>
                
                {/* MENSAGEM CASO A MENSAGEM FOR DE OUTRO USUÁRIO */}
                <div className={`self-start border-2 ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black' } p-1 max-w-[200px] rounded-[10px] rounded-es-[0px]`}>
                    <span className={`text-[#3d4efe] font-black text-[14px]`}>Marcos A</span>
                    <p className={`text-[16px] font-light ${theme == 'light' ? 'text-my-black' : 'text-my-white'} pt-1`}>O ego vai te fazer se sentir bem, ou talvez bem mal por não ter ninguém</p>
                </div>
                
                {/* MENSAGEM CASO A MENSAGEM FOR SUA */}
                <div className={`self-end border-2 border-my-gray p-1 max-w-[200px] rounded-[10px] rounded-ee-[0px]`}>
                    <p className={`text-[16px] font-light ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>o WIU é foda</p>
                </div>
            </div>

            <form className={`fixed bottom-[95px]  lg:bottom-[30px] border-2 border-my-secondary rounded-[20px] w-[95%] sm:w-[60%] mt-1 flex flex-row items-center gap-1`} onSubmit={(e) => e.preventDefault()}>
                
                <div className={`rounded-[50%] flex items-center justify-center p-1 bg-my-secondary ms-1`}>
                    <IoIosAdd className={`text-[24px] text-my-white`} />
                </div>

                <input className={`${theme == 'light' ? 'placeholder:text-my-gray text-my-black' : 'placeholder:text-my-gray-black text-my-white'} bg-transparent rounded-[18px] flex-grow-[1] py-[6px] focus:outline-none focus:border-my-secondary focus:text-my-black`} type="text" name="text" id="text" placeholder='Digite algo' />


                <div className={`rounded-[50%] flex items-center justify-center p-1 bg-my-secondary me-1`}>
                    <IoMdSend className={`ps-[2px] text-[24px] text-my-white`} />
                </div> 

            </form>

            <BottomNavigation />
            
            <Menu />
        </>
    )
}