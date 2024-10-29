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
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios.ts';

//IMPORTAÇÃO DOS ICONES
import { FcGoogle } from "react-icons/fc";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS SERVIÇOS DO FIREBASE
import { auth, provider, signInWithPopup } from '../../utils/firebase.tsx'

export default function GoogleLogin() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleUser, toggleLoading, toggleAlert } = states

    //FUNÇÃO RESPONSÁVEL PELO LOGIN COM EMAIL E SENHA
    function signIn(email:string, name:string, img:string) {

        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //FAZ UMA REQUISIÇÃO POST PARA O BACKEND DA APLICAÇÃO
        instance.post('/signin_google', {
            //MANDA OS DADOS PARA O BACKEND JUNTO COM A REQUISIÇÃO
            email: email,
            name: name,
            img: img
        })
        .then(function (response) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR BEM SUCEDIDA
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            console.log('A: '+response.data)

            //FORMATA E SEPARA A STRING PARA VER MATÉRIA POR MATÉRIA DO CRONOGRAMA
            const cronogram = response.data.cronogram == "" ? '' : response.data.cronogram.split('[')[1].split(']')[0].split(',')

            //ESCREVE NO CONSOLE
            console.log(cronogram)

            //REGISTRA O NOME E A FOTO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
            toggleUser(response.data.name, response.data.img, response.data._id, response.data.simulations, response.data.simulationsConcludeds, cronogram, response.data.soundAlert, response.data.timeCronograma)

            //COLOCA ALERT NA TELA
            toggleAlert(`success`, `seja bem-vindo(a) ${response.data.name}`)
            
            //REDIRECIONA O USUÁRIO PARA A PÁGINA INICIAL
            navigate('/materias')
        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log('ocorreu algum erro: ', error);

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `lamentamos, erro interno no servidor`)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
        });
        
    }
    
    const handleGoogleLogin = async () => {
        try {
          //REALIZA O LOGIN VIA POPUP DO GOOGLE
          const result = await signInWithPopup(auth, provider);
          //OBTÈM OS DADOS DO USUÁRIO
          const user = result.user;
          // FAZ LOGIN COM A CONTA DO USÁRIO
          if(result.user){
            signIn(user.email || "", user.displayName || "", user.photoURL || "")
          }

        } catch (error) {
          console.error("Erro durante o login:", error);
        }
      };

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
        toggleLoading(false)
    },[])

    return(
        <div
            onClick={() => {
                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
                toggleLoading(true)

                //FAZ LOGIN COM REDIRECIONAMENTO PARA OUTRA PÁGINA
                handleGoogleLogin()
            }}
            className={`w-[80px] h-[80px] sm:w-[52px] sm:h-[52px] lg:w-[52px] lg:h-[52px] border rounded-[50%] flex justify-center items-center lg:border-none cursor-pointer hover:scale-[1.2] transition-all duration-[.2s]
            ${theme == 'light' ? 'border-my-gray lg:bg-black' : 'border-my-gray-black lg:bg-my-white'}
        `}>
            <FcGoogle
                className={`
                    text-[70px]
                    sm:text-[50px]
                    lg:text-[50px]
                    p-3
                    sm:p-2
                `}
            />
        </div>

    )
}