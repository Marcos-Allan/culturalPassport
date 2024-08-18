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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS ICONES
import { FaStar } from "react-icons/fa";

//IMPORTAÇÃO DOS COMPONENTES
import BottomNavigation from "../../components/BottomNavigation";
import Menu from "../../components/Menu";
import MenuButton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//INTERFACE DAS MENSAGENS
interface Msg{
    text: string,
    user: string,
    id: number,
}

export default function Feedback() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [messages, setMessages] = useState<Msg[]>([]);
    const [isFeedback, setIsFeedback] = useState<boolean>(false)

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[userS.logged])

    //CHECA SE O USUÁRIO JA MANDOU O FEEDBACK
    async function checkIsFeedback() {
        instance.get('/feedback/feedbacks')
        .then(function (response){
            response.data.map((feedback:any) => {
                //VERIFICA SE O USUÁRIO JA MANDOU O FEEDBACK
                if(feedback.userID == userS.id){
                    //MUDA O ESTADO DE FEDBACK ENVIADO PARA TRUE
                    setIsFeedback(true)
                }
            })
        })
        .catch(function (error){
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR PEGAR OS FEEDBACKS ENVIADOS PELOS USUÁRIOS
    function getFeedbacks(){

        instance.get('/feedback/feedbacks')
        .then(function (response){
            // console.log(userS.id)
            response.data.map((feedback:any) => {
                
                //SETA NO ARRAY DE FEEDBACKS OS FEEDBACKSS
                setMessages((prevMessages:any) => [...prevMessages, {
                    user: feedback.name,
                    text: feedback.message,
                    id: feedback.userID
                }])
            })
        })
        .catch(function (error){
            console.log(error)
        })
    }

    //SALVA OS FEEDBACKS NO BD
    const handleSubmit = (mesg:string) => {

        instance.post('/feedback/upload', {
            userID: userS.id,
            message: mesg,
            name: userS.name
        })
        .then(function (response){
            console.log(response.data)
            //LIMPA O ARRAY DE FEEDBACKS
            setMessages([])
            
            //CHAMA A FUNÇÃO QUE VERIFICA SE O USUÁRIO JA MANDOU O FEEDBACK
            checkIsFeedback()

            //CHAMA A FUNÇÃO QUE PEGA OS FEEDBACKS
            getFeedbacks()
        })
        .catch(function (error){
            console.log(error)
        })
    }

    // FUNÇÃO RESPONSÁVEL POR RENDERIZAR AS BARRAS DE LEVEL
    function renderLevel(quantity: number) {
        //INICIA UM ARRAY VAZIO
        const level = [];

        //FAZ UM LOOP PARA CLONAR O CONTEÚDO USANDO O NÚMERO PASSADO POR PARÂMETRO
        for (let i = 0; i < quantity; i++) {
            level.push(
                <FaStar className='text-[#d9e64f] text-[20px]' />
            );
        }
        return level;
    }
    
    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //CHAMA A FUNÇÃO DE VERIFICAÇÃO DE FEEDBACK ENVIADO
        checkIsFeedback()

        //LIMPA O ARRAY DE FEEDBACKS
        setMessages([])
        
        //CHAMA A FUNÇÃO DE LISTAR OS FEEDBACKS ENVIADOS
        getFeedbacks()
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Feedback`}
                />
                <MenuButton />
            </Navbar>

            <div className={`${theme == 'light' ? 'bg-my-white' : 'bg-my-black'} overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary w-[90%] sm:w-[60%] pt-[30px] h-full flex flex-col gap-[20px]`}>
                
                <div className={`mx-auto rounded-[6px] py-2 px-4 w-full ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'} opacity-[0.8]`}>
                    <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'} text-left sm:text-center text-[14px]`}>
                        {isFeedback == false
                            ? 'De uma nota de feedback sobre o nosso sistema, avalie nos por favor'
                            : 'Obrigado por enviar seu feedback'
                        }
                    </p>
                </div>

                {messages.length > 0 && messages.map((msg) => (
                    <>
                        {msg.id !== userS.id ? (
                            <div
                                key={Math.random() * 999999999999}   
                                className={`self-start border-2 ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black' } p-1 max-w-[200px] rounded-[10px] rounded-es-[0px]`}
                            >
                                <span className={`text-[#ff0062] font-black text-[14px]`}>{msg.user}</span>
                                <p className={`flex flex-row text-[16px] font-light ${theme == 'light' ? 'text-my-black' : 'text-my-white'} pt-1`}>

                                    {/* CHAMA A FUNÇÃO QUE RENDERIZA OS LEVELS DEPENDENDO DA QUANTIDADE ESPECIFICADA */}
                                    {renderLevel(Number(msg.text))}

                                </p>
                            </div> 
                        ):(
                            <div className={`self-end border-2 border-my-gray p-1 max-w-[200px] rounded-[10px] rounded-ee-[0px]`}>
                                <p className={`text-[16px] font-light flex flex-row  ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>
                                
                                    {/* CHAMA A FUNÇÃO QUE RENDERIZA OS LEVELS DEPENDENDO DA QUANTIDADE ESPECIFICADA */}
                                    {renderLevel(Number(msg.text))}
                                
                                </p>
                            </div>
                        )}
                    </>
                ))}
            </div>

            {isFeedback == false && (
                <div className={`w-[95%] sm:w-[60%] flex flex-row flex-wrap gap-1 mt-2 mb-[100px] lg:mb-0`}>
                    <div
                        onClick={() => {
                            handleSubmit('1')
                        }}
                        className={`relative flex items-center justify-center basis-[48.92%] sm:basis-[18.9%] text-center py-2 font-bold rounded-[6px] border-[1px] text-[20px] sm:text-[12px] gap-2 sm:gap-1 ${theme == 'light' ? 'border-my-black text-my-black' : 'border-my-white text-my-white' }`}>
                        {/* CHAMA A FUNÇÃO QUE RENDERIZA OS LEVELS DEPENDENDO DA QUANTIDADE ESPECIFICADA */}
                        {renderLevel(1)}
                    </div>
                    
                    <div
                        onClick={() => {
                            handleSubmit('2')
                        }}
                        className={`relative flex items-center justify-center basis-[48.92%] sm:basis-[18.9%] text-center py-2 font-bold rounded-[6px] border-[1px] text-[20px] sm:text-[12px] gap-2 sm:gap-1 ${theme == 'light' ? 'border-my-black text-my-black' : 'border-my-white text-my-white' }`}>
                        {renderLevel(2)}
                    </div>
                    
                    <div
                        onClick={() => {
                            handleSubmit('3')
                        }}
                        className={`relative flex items-center justify-center basis-[48.92%] sm:basis-[18.9%] text-center py-2 font-bold rounded-[6px] border-[1px] text-[20px] sm:text-[12px] gap-2 sm:gap-1 ${theme == 'light' ? 'border-my-black text-my-black' : 'border-my-white text-my-white' }`}>
                        {renderLevel(3)}
                    </div>
                    
                    <div
                        onClick={() => {
                            handleSubmit('4')
                        }}
                        className={`relative flex items-center justify-center basis-[48.92%] sm:basis-[18.9%] text-center py-2 font-bold rounded-[6px] border-[1px] text-[20px] sm:text-[12px] gap-2 sm:gap-1 ${theme == 'light' ? 'border-my-black text-my-black' : 'border-my-white text-my-white' }`}>
                        {renderLevel(4)}
                    </div>
                    
                    <div
                        onClick={() => {
                            handleSubmit('5')
                        }}
                        className={`relative flex items-center justify-center basis-[100%] sm:basis-[20%] text-center py-2 font-bold rounded-[6px] border-[1px] text-[20px] sm:text-[12px] gap-2 sm:gap-1 ${theme == 'light' ? 'border-my-black text-my-black' : 'border-my-white text-my-white' }`}>
                        {/* CHAMA A FUNÇÃO QUE RENDERIZA OS LEVELS DEPENDENDO DA QUANTIDADE ESPECIFICADA */}
                        {renderLevel(5)}
                    </div>
                    
                </div>
            )}

            <BottomNavigation />
            
            <Menu />
        </>
    )
}