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
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import Text from '../../components/Text';
import TravelCard from '../../components/ExerciseCard';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

export default function Travels() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme, toggleAlert } = states

    //UTILIZA O HOOK DO useState
    const [exercises, setExercises] = useState<any[]>([])
    const [loadingExercises, setLoadingExercises] = useState<boolean>(false)

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[userS.logged])
    
    //FUNÇÃO RESPONSÁVEL POR PEGAR OS EXERCICIOS
    function getExercises() {
        //MUDA O ESTADO DE CARREGAMENTO DOS EXERCICOS PARA true
        setLoadingExercises(true)

        instance.get(`/exercise/exercises`)
        .then(function (response) {
            //VERIFICA SE A CONTA FOI ENCONTRADA PELO TIPO DO DADO RETORNADO
            if(typeof response.data === "object"){
                //MUDA O ESTADO DE CARREGAMENTO DOS EXERCICOS PARA false
                setLoadingExercises(false)

                //DEFINE O ARRAY COM AS CONQUISTAS
                response.data.map((exerc:any) => {
                    setExercises((ex) => [...ex, {
                        concluded: false,
                        materia: exerc.matter,
                        title: exerc.title,
                        type: 'travel'
                    }])
                })
            }else{
                //MUDA O ESTADO DE CARREGAMENTO DOS EXERCICOS PARA false
                setLoadingExercises(false)

                //RETORNA MENSAGEM DE ERRO AO USUARIO
                console.log(response)

                //COLOCA ALERT NA TELA
                toggleAlert(`error`, `${response.data}`)
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //PEGA OS EXERCICIOS DO BACKEND
        getExercises()
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Passeios`}
                />
            </Navbar>

            <div className={`w-full flex flex-col justify-start items-center mb-[100px] sm:mb-[40px] lg:mb-0 overflow-y-scroll overflow-visible scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>    
                <Text text='Passeios' position='left' />

                {loadingExercises == false && exercises.length >= 1 && exercises.map((exerc, i) => (
                    <>
                        <TravelCard
                            concluded={exerc.concluded}
                            materia={exerc.materia}
                            title={exerc.title}
                            type={exerc.type} key={i}
                        />
                    </>
                ))}
                
                {loadingExercises == false && exercises.length == 0 && (
                    <>
                        <Text text='Nenhum passeio disponivel no momento'/>
                        <IoMdSad className={`text-[150px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                    </>
                )}

                {loadingExercises == true && (
                    <>
                        <p className={`w-[90%] text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>estamos carregando os passeios seja paciente</p>
                    </>
                )}
            </div>
            
            <BottomNavigation />
        </>
    )
}