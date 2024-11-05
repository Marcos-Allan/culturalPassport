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
import { useParams, useNavigate, Link } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import BottomNavigation from "../../components/BottomNavigation";
import ContentCard from '../../components/ContentCard';
import Text from '../../components/Text';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";
import TravelCard from '../../components/ExerciseCard';

export default function Matter() {

    //USO DO HOOK useParams
    const { matter } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [content, setContent] = useState<any[]>([])
    const [travels, setTravels] = useState<any[]>([])
    const [loadingContent, setLoadingContent] = useState<boolean>(false)
    const [loadingTravels, setLoadingTravels] = useState<boolean>(false)


    //FUNÇÃO RESPONSÁVEL POR DEIXAR O TEXTO EM CAPITALIZE
    function capitalizeText(text:string) {
        if (text.length === 0) return text; // Retorna a string original se estiver vazia
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    
    //FUNÇÃO RESPONSÁVEL POR LISTAR OS CONTEUDOS DISPONIVEIS
    function getContent(){
        //MUDA O ESTADO DE CARREGAMENTO DOS CONTEUDOS PARA true
        setLoadingContent(true)

        instance.get(`/matter/${matter}`)
        .then(function (response) {
            console.log(response.data)

            //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA false
            setLoadingContent(false)
            
            //LIMPA O ARRAY DE CONTEUDO DAS MATÉRIAS
            setContent([])

            //COLOCA AS MATÉRIAS CADASTRADAS NO BD NO ARRAY DE MATÉRIAS
            response.data.contents.map((content:any, i:number) => {
                setContent((cont:any) => [...cont, {
                    title: content.text,
                    background: i
                }])
            })
        })
        .catch(function (error) {
            console.log(error)
            //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA false
            setLoadingContent(false)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR PEGAR OS EXERCICIOS
    function getTravels() {
        //MUDA O ESTADO DE CARREGAMENTO DOS EXERCICOS PARA true
        setLoadingTravels(true)

        instance.get(`/exercise/exercises`)
        .then(function (response) {
            //VERIFICA SE A CONTA FOI ENCONTRADA PELO TIPO DO DADO RETORNADO
            if(typeof response.data === "object"){
                //MUDA O ESTADO DE CARREGAMENTO DOS EXERCICOS PARA false
                setLoadingTravels(false)

                //DEFINE O ARRAY COM AS CONQUISTAS
                response.data.map((exerc:any) => {
                    if(exerc.matter.toLowerCase() == matter?.toLowerCase()){
                        setTravels((ex) => [...ex, {
                            concluded: false,
                            materia: exerc.matter,
                            title: exerc.title,
                            type: 'travel'
                        }])
                    }
                })
            }else{
                //MUDA O ESTADO DE CARREGAMENTO DOS EXERCICOS PARA false
                setLoadingTravels(false)

                //RETORNA MENSAGEM DE ERRO AO USUARIO
                console.log(response)
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[userS.logged])
    
    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //DEFINE O ARRAY COM OS CONTEUDOS
        getContent()

        //DEFINE O ARRAY COM OS PASSEIOS
        getTravels()
    },[])

    //FUNÇÃO PARA REDIRECIONAR PARA OUTRA PÁGINA
    function redirect(cont:string){

        //NAVEGA PARA A PRÓXIMA PÁGINA
        navigate(`/materias/${matter}/content/${cont}`)
    }

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`${capitalizeText(matter || 'matéria')}`}
                />
            </Navbar>


            <div className={`w-[90%] sm:px-12 sm:w-[70%] mb-[100px] sm:mb-[40px] lg:mb-0 flex items-center flex-col overflow-y-scroll scrollbar-none overflow-x-hidden`}>
                <p className={`w-[90%] mt-8 mb-5 text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Conteudos de {capitalizeText(matter || 'matéria')} que mais caem nos vestibulares</p>

                {loadingContent == false && content.length > 0 && content.map((cont, i) => (
                    <ContentCard background={cont.background} title={cont.title} event={() => redirect(cont.title)} key={i} />
                ))}

                {loadingContent == false && content.length == 0 &&(
                    <div className={`flex flex-col items-center justify-start`}>
                        <Text text='Nenhuma matéria encontrada'/>
                        <IoMdSad
                            className={`text-[120px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                    </div>
                )}
                
                {loadingContent == true && (
                    <p className={`w-full text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>estamos carregando as matérias seja paciente</p>
                )}

                <p className={`w-[90%] mt-8 mb-5 text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Passeios relacionados com a matéria</p>

                <div className={`w-screen flex flex-col items-center`}>
                    {loadingTravels == false && travels.length > 0 && travels.map((travel, i) => (
                        <>
                            <TravelCard
                                concluded={travel.concluded}
                                materia={travel.materia}
                                title={travel.title}
                                type={travel.type} key={i}
                            />
                        </>
                    ))}
                </div>

                {loadingTravels == false && travels.length == 0 &&(
                    <div className={`flex flex-col items-center justify-start`}>
                        <Text text='Nenhuma passeio encontrado'/>
                        <IoMdSad
                            className={`text-[120px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                    </div>
                )}
                
                {loadingContent == true && (
                    <p className={`w-full text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>estamos carregando os passeios seja paciente</p>
                )}

                <Link to={`/materias/${matter}/test`}
                className={`ms-auto mb-3 w-auto border-[1px] p-3 rounded-[20px] transition-all duration-[.3s] bg-transparent hover:text-my-secondary hover:border-my-secondary ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
                `}>Fazer prova</Link>
            </div>

            <BottomNavigation />
        </>
    )
}