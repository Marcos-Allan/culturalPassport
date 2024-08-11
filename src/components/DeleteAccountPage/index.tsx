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

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from "../../utils/axios"

export default function DeleteAccountPage() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { userS, theme, toggleUser, toggleAlert, isDelAccount, toggleDeleteAccount } = states

    //FUNÇÃO RESPONSÁVEL PELO LOGOUT
    function handleDeleteAccount() {

        instance.delete(`/users/delete/${userS.id}`)
        .then(function (response){
            //ESCREVE NO CONSOLE O RETORNO DOS DADOS
            console.log(response.data)

            //COLOCA O ALERT NA TELA
            toggleAlert('success', 'conta deletada com sucesso')
            
            //REGISTRA O NOME E A FOTO E O ID DO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
            toggleUser('', '', '', [], 0, [], false)
            
            //REMOVE A TELA DE POP-UP DE REMOVER
            toggleDeleteAccount(!isDelAccount)
        })
        .catch(function (error) {
            console.log(error)

            //COLOCA O ALERT NA TELA
            toggleAlert('error', 'erro ao deletar conta')
        })
        
    }

    return(
        <div className={`w-screen h-screen flex items-center justify-center absolute top-0 left-0 transition-all duration-[.3s]
            ${isDelAccount == true ? 'opacity-1 z-[2]' : 'opacity-0 z-[-1]'}
            ${theme == 'light' ? 'bg-my-white-opacity' : 'bg-my-black-opacity'}
        `}>
            <div className={`${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} rounded-[6px] overflow-hidden m-0 p-0 w-[85%] max-w-[420px]`}>
                <p className={`text-center font-bold text-[20px] px-[20px] pt-3 pb-2 ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>Tem certeza que deseja deletar sua conta?</p>
                <div className={`flex justify-between pt-3 w-full p-[2px]`}>
                    <div
                        onClick={() => toggleDeleteAccount(!isDelAccount)}
                        className={`uppercase font-light py-1 border-[1px] border-transparent hover:text-my-quintenary hover:bg-transparent cursor-pointer transition-all duration-[.3s] rounded-bl-[6px] hover:border-my-quintenary bg-my-quintenary w-[50%] text-center text-my-white`}
                    >cancelar</div>
                    <div
                        onClick={() => handleDeleteAccount()}
                        className={`uppercase font-light py-1 border-[1px] border-transparent hover:text-my-terciary hover:bg-transparent cursor-pointer transition-all duration-[.3s] rounded-br-[6px] hover:border-my-terciary bg-my-terciary w-[50%] text-center text-my-white`}
                    >deletar</div>
                </div>
            </div>
        </div>
    )
}