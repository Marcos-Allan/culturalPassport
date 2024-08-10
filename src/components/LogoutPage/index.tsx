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

//IMPORTA O MÉTODE DE PEGAR A AUTENTICAÇÃO ATUAL E O MÉTODO DE LOGOUT DO FIREBASE
import { getAuth, signOut } from 'firebase/auth';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function LogoutPage() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, toggleUser, toggleAlert, isLogout, toggleLogout } = states

    //FUNÇÃO RESPONSÁVEL PELO LOGOUT
    function handleLogout() {
        //PEGA A AUTENTICAÇÃO DO ATUAL DO FIREBASE
        const auth = getAuth()

        signOut(auth).then(() => {
            console.log('Usuário deslogado com sucesso.')
        }).catch((error) => {
            console.error('Erro ao deslogar:', error)
        })
        
        //COLOCA O ALERT NA TELA
        toggleAlert('success', 'conta desconectada com sucesso')
        
        //REGISTRA O NOME E A FOTO E O ID DO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
        toggleUser('', '', '', [], 0, [], false)
        
        //REMOVE A TELA DE POP-UP DE REMOVER
        toggleLogout(!isLogout)
        
        //FUNÇÃO CHAMADA DEPOIS DE 0.4 S
        // setTimeout(() => {
        //     //REDIRECIONA PARA A HOME DA PÁGINA
        //     window.location.href = "/"
        // }, 400);
    }

    return(
        <div className={`w-screen h-screen flex items-center justify-center absolute top-0 left-0 transition-all duration-[.3s]
            ${isLogout == true ? 'opacity-1 z-[2]' : 'opacity-0 z-[-1]'}
            ${theme == 'light' ? 'bg-my-white-opacity' : 'bg-my-black-opacity'}
        `}>
            <div className={`${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} rounded-[6px] overflow-hidden m-0 p-0 w-[85%] max-w-[420px]`}>
                <p className={`text-center font-bold text-[20px] px-[20px] pt-3 pb-2 ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>Tem certeza que deseja fazer logout?</p>
                <div className={`flex justify-between pt-3 w-full p-[2px]`}>
                    <div
                        onClick={() => toggleLogout(!isLogout)}
                        className={`uppercase font-light py-1 border-[1px] border-transparent hover:text-my-quintenary hover:bg-transparent cursor-pointer transition-all duration-[.3s] rounded-bl-[6px] hover:border-my-quintenary bg-my-quintenary w-[50%] text-center text-my-white`}
                    >cancelar</div>
                    <div
                        onClick={() => handleLogout()}
                        className={`uppercase font-light py-1 border-[1px] border-transparent hover:text-my-terciary hover:bg-transparent cursor-pointer transition-all duration-[.3s] rounded-br-[6px] hover:border-my-terciary bg-my-terciary w-[50%] text-center text-my-white`}
                    >logout</div>
                </div>
            </div>
        </div>
    )
}