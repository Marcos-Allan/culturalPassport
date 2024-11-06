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
import Return from '../../components/Return/index.tsx';
import BottomNavigation from '../../components/BottomNavigation/index.tsx';
import LogoutButton from '../../components/LogoutButton/index.tsx';
import DeleteAccountButton from '../../components/DeleteAccountButton/index.tsx';
import ToggleTheme from '../../components/ToggleTheme/index.tsx';
import BubbleAnimation from '../../components/Bubles/index.tsx';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Configuration(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { toggleLoading, userS } = states
    
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
            <BubbleAnimation />
            <Navbar>
                <Return />
                <TitlePage text="Configurações" space={true} />
            </Navbar>
            
            <div className={`w-full flex flex-col items-center lg:h-full lg:w-[60%]`}>
                
                <ToggleTheme />
                
                {userS.logged == true && (
                    <LogoutButton />
                )}

                {userS.logged == true && (
                    <DeleteAccountButton />
                )}
            
            </div>
            
            {userS.logged == true && (
                <BottomNavigation />
            )}
        </>
    )
}