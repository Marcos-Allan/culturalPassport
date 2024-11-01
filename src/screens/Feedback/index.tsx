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

//IMPORTAÇÃO DOS COMPONENTES
import BottomNavigation from "../../components/BottomNavigation";
import Menu from "../../components/Menu";
import MenuButton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import StarRating from '../../components/StarRating';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';
import FeedbackCard from '../../components/FeedbackCard';

//INTERFACE DAS MENSAGENS
interface Msg{
    _id: any,
    userID: any,
    message: string,
    raiting: number,
    data: string,
    name: string,
    userImg: string,
}

export default function Feedback() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [messages, setMessages] = useState<Msg[]>([]);
    const [isFeedback, setIsFeedback] = useState<boolean>(false)
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [inputMessage, setInputMessage] = useState<string>('')

    //FUNÇÃO RESPONSÁVEL POR PEGAR O VALOR DAS ESTRELAS ESCOLHIDAS
    const handleRatingSelect = (rating: number) => {
        setSelectedRating(rating);
    };

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }

        console.log(messages)
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
                console.log(userS.id)
                console.log(feedback.userID)

                //SETA NO ARRAY DE FEEDBACKS OS FEEDBACKSS
                setMessages((prevMessages:any) => [...prevMessages, {
                    name: feedback.name,
                    message: feedback.message,
                    userID: feedback.userID,
                    userImg: feedback.userImg,
                    raiting: feedback.raiting,
                    data: feedback.data,

                }])
            })
        })
        .catch(function (error){
            console.log(error)
        })
    }

    //SALVA OS FEEDBACKS NO BD
    const handleSubmit = (msg:string, raiting:number, data:string) => {

        if(((selectedRating !== null && selectedRating == 0) || selectedRating == null) && (inputMessage == "")){ //VERIFICA SE O USUÁRIO NÃO COLOCOU AS ESTRELAS E NEM O FEEDBACK
            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Seja mais específico`)

        }else if((selectedRating !== null && selectedRating == 0) || selectedRating == null){ //VERIFICA SE O USUÁRIO NÃO COLOCOU AS ESTRELAS
            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Nos de ao menos uma estrela`)

        }else if(inputMessage == ""){ //VERIFICA SE O USUÁRIO NÃO COLOCOU O COMENTÁRIO
            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Digite seu feedback`)
        
        }else{ //VERIFICA SE O FEEDBACK JÁ TEM ESTRELAS E COMENTÁRIO
            instance.post('/feedback/upload', {
                userID: userS.id,
                message: msg,
                raiting: raiting,
                data: data,
                name: userS.name,
                userImg: userS.img
            })
            .then(function (response){
                console.log(response.data)
                //LIMPA O ARRAY DE FEEDBACKS
                setMessages([])
                
                //COLOCA O ALERT NA TELA
                toggleAlert(`success`, `muito obrigada por nos avaliar`)

                //CHAMA A FUNÇÃO QUE VERIFICA SE O USUÁRIO JA MANDOU O FEEDBACK
                checkIsFeedback()

                //CHAMA A FUNÇÃO QUE PEGA OS FEEDBACKS
                getFeedbacks()
            })
            .catch(function (error){
                console.log(error)
            })
        }
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

            <div className={`${theme == 'light' ? 'bg-my-white' : 'bg-my-black'} overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary w-[90%] sm:w-[60%] pt-[30px] h-full pb-[10px] flex flex-col gap-[20px] mb-[100px] sm:mb-[40px] lg:mb-0`}>
                
                <div className={`mx-auto rounded-[6px] py-2 px-4 w-full ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'} opacity-[0.8]`}>
                    <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'} text-left sm:text-center text-[14px]`}>
                        {isFeedback == false
                            ? 'De uma nota de feedback sobre o nosso sistema, avalie nos por favor'
                            : 'Obrigado por enviar seu feedback'
                        }
                    </p>
                </div>

                {messages.length > 0 && messages.map((msg) => (
                    <FeedbackCard msg={msg} />
                ))}
            </div>

            {isFeedback == false && (
                <form
                    className={`w-[95%] sm:w-[60%] py-2 px-1 flex flex-row flex-wrap gap-1 mt-2 mb-[100px] lg:mb-0`}
                    onSubmit={(e) => {
                        e.preventDefault()
                        // handleSubmit(JSON.stringify({ rating: selectedRating, message: inputMessage }))
                        handleSubmit(inputMessage, Number(selectedRating), `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`)
                    }}
                >
                    <StarRating onRatingSelect={handleRatingSelect} maxStars={5} />
                    
                    <input type="text" name="" id="" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder='Descreva aqui ' className={`bg-transparent flex-grow-[1] rounded-tl-[5px] rounded-bl-[5px] py-1 text-[14px] ps-2 outline-none border-[2px] 
                        ${theme == 'light' ? 'border-my-secondary text-my-black' : 'border-my-quintenary text-my-white'}`}
                    />
                    
                    <input type="submit" value="enviar" className={`px-5 text-my-white rounded-tr-[5px] rounded-br-[5px] uppercase outline-none hover:bg-transparent border-[1px] border-transparent
                        ${theme == 'light' ? 'bg-my-secondary hover:border-my-secondary hover:text-my-secondary' : 'bg-my-quintenary hover:border-my-quintenary hover:text-my-quintenary'}`}
                    />
                </form>
            )}

            <BottomNavigation />
            
            <Menu />
        </>
    )
}