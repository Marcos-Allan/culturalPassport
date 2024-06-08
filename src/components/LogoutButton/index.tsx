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

//IMPORTAÇÃO DOS ICONES
import { CiLogout } from "react-icons/ci";

//IMPORTA O MÉTODE DE PEGAR A AUTENTICAÇÃO ATUAL E O MÉTODO DE LOGOUT DO FIREBASE
import { getAuth, signOut } from 'firebase/auth';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function LogoutButton() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, toggleMenuOpen, toggleUser, toggleAlert } = states

    //FUNÇÃO RESPONSÁVEL PELO LOGOUT
    function handleLogout() {
        //PEGA A AUTENTICAÇÃO DO ATUAL DO FIREBASE
        const auth = getAuth()

        signOut(auth).then(() => {
            console.log('Usuário deslogado com sucesso.')

            //COLOCA O ALERT NA TELA
            toggleAlert('success', 'conta desconectada com sucesso')

            //REDIRECIONA O USUÁRIO PARA A PÁGINA INICIAL
            navigate('/')
            
        }).catch((error) => {
            console.error('Erro ao deslogar:', error)
        })
        //FECHA O MENU
        toggleMenuOpen(false)

        //TIRA OS DADOS DA CONTA DO USUÁRIO DO FRONTEND
        toggleUser('', '', '', false)
    }

    return(
        <div className={`w-[80%] flex py-3`}
            onClick={() => handleLogout()}
        >
            <CiLogout className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'} text-[30px]`} />
            <p className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'} text-[18px] font-semibold capitalize flex-grow-[1] text-right`}>logout</p>
        </div>
    )
}