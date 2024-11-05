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
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import BottomNavigation from "../../components/BottomNavigation";
import Text from '../../components/Text';
import RankingCard from '../../components/RankingCard';
import LeaderBoard from '../../components/LeaderBoard';
import BubbleAnimation from '../../components/Bubles';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";

export default function Ranking() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [users, setUsers] = useState<any[]>([])
    const [loadingContent, setLoadingContent] = useState<boolean>(false)

    //FUNÇÃO RESPONSÁVEL POR PEGAR OS USUÁRIOS
    function getUsers() {
        //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
        setLoadingContent(false)
        
        instance.get('/users')
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
            setLoadingContent(false)

            //REORGANIZA O ARRAY COM BASE NO NÚMERO DE SIMULADOS CONCLUIDOS
            const usersOrdenados = [...response.data].sort((a, b) => b.simulationsConcludeds - a.simulationsConcludeds);
            
            //COLOCA OS USUÁRIOS JA REORDENADOS NO ARRAY DE USUÁRIOS
            setUsers(usersOrdenados)
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
        //FUNÇÃO RESPONSÁVEL POR PEGAR OS USUÁRIOS
        getUsers()
    },[])

    return(
        <>
            <BubbleAnimation />
            <Navbar>
                <Return />
                <TitlePage
                    text={'Ranking'}
                />
            </Navbar>
            
            <div className={`w-[90%] sm:px-12 sm:w-[70%] mb-[100px] sm:mb-[40px] lg:mb-0 flex items-center flex-col overflow-y-scroll scrollbar-none overflow-x-hidden`}>
                
                <div className={`w-[90%] flex justify-center items-end px-12 lg:px-32 my-4`}>
                    {loadingContent == false && users.length > 0 && users.map((user, i) => (
                        <LeaderBoard user={user} ind={i} />
                    ))}
                </div>

                {loadingContent == false && users.length > 0 && users.map((user, i) => (
                    <RankingCard user={user} ind={i} />
                ))}

                {loadingContent == false && users.length == 0 &&(
                    <div className={`flex flex-col items-center justify-start`}>
                        <Text text='Nenhuma usuário encontrado'/>
                        <IoMdSad
                            className={`text-[120px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                    </div>
                )}
                
                {loadingContent == true && (
                    <p className={`w-full text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>estamos carregando os usuários seja paciente</p>
                )}
            </div>
            
            <BottomNavigation />
        </>
    )
}