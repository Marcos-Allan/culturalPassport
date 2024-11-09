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
import { useNavigate, useParams } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import BottomNavigation from "../../components/BottomNavigation";
import Text from '../../components/Text';
import BubbleAnimation from '../../components/Bubles';
import ConquestCard from '../../components/ConquestCard';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";

//IMPORTAÇÃO DAS IMAGENS
import medal_one from '../../assets/imgs/medals/gold-medal2.png'
import medal_two from '../../assets/imgs/medals/silver-medal2.png'
import medal_three from '../../assets/imgs/medals/bronze-medal2.png'

export default function UserProfile() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()
    
    //UTILIZAÇÃO DO HOOK QUE PEGA PARÂMETROS DA URL
    const { user } = useParams()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [profile, setProfile] = useState<any>(null)
    const [users, setUsers] = useState<any>(null)
    const [conquests, setConquests] = useState<any[]>([])
    const [loadingContent, setLoadingContent] = useState<boolean>(false)
    const [loadingAchivements, setLoadingAchivements] = useState<boolean>(false)

    //FUNÇÃO RESPONSÁVEL POR PEGAR OS USUÁRIOS
    function getUser() {
        //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
        setLoadingContent(false)
        
        instance.get(`/users/${user}`)
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
            setLoadingContent(false)
            
            //CADASTRA O USUÁRIO ESCOLHIDO
            setProfile(response.data)

            console.log(response.data.simulations)
        })
        .catch(function (error) {   
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR PEGAR AS CONQUISTAS DO BD
    function getAchievements() {

        //MUDA O ESTADO DE LOADING DAS CONQUISTAS PARA true
        setLoadingAchivements(true)
        
        instance.get('/achievement/achievements')
        .then(function (response) {
            //COLOCA AS CONQUISTAS NO ARRAY DE CONQUISTAS
            setConquests(response.data)
            
            //MUDA O ESTADO DE LOADING DAS CONQUISTAS PARA false
            setLoadingAchivements(false)
        })
        .catch(function (error) {
            //ESCREVE NO CONSOLE O ERRO OCORRIDO
            console.log(error)
            
            //MUDA O ESTADO DE LOADING DAS CONQUISTAS PARA false
            setLoadingAchivements(false)
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
        getUser()

        //DEFINE O ARRAY COM AS CONQUISTAS
        getAchievements()
        
        //DEFINE O ARRAY COM OS USUÁRIOS
        getUsers()
    },[])

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

    //FUNÇÃO RESPONSÁVEL POR VERIFICAR A POSIÇÃO DO USUÁRIO NO RANKING
    function getPosition() {
        if (users && profile) {
            //ENCONTRA O ÍNDICE DO USUÁRIO CORRESPONDENTE NO ARRAY DE USUÁRIOS
            const position = users.findIndex((u: any) => u.name === profile.name);
            if (position !== -1) {
                return position;
            } else {
                return `${profile.name} not found in the ranking`;
            }
        }
        return null;
    }

    return(
        <>
            <BubbleAnimation />
            <Navbar>
                <Return />
                <TitlePage
                    text={profile ? profile.name : 'Usuário'}
                />
            </Navbar>
            
            <div className={`w-full flex flex-col justify-start items-center sm:gap-[20px] mb-[100px] sm:mb-[40px] lg:mb-0 overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary
            `}>

                {loadingContent == false && profile != null && (
                    <div className={`w-full flex flex-col items-center justify-start`}>

                        <div className={`relative flex items-center justify-center`}>    
                            <img src={profile.img} alt="" className={`w-[150px] h-[150px] rounded-[50%]`} />

                            {getPosition() == 0 && (
                                <img src={medal_one} className={`w-[50px] absolute top-[10px] right-[-10px]`} alt="" />
                            )}
                            {getPosition() == 1 && (
                                <img src={medal_two} className={`w-[50px] absolute top-[10px] right-[-10px]`} alt="" />
                            )}
                            {getPosition() == 2 && (
                                <img src={medal_three} className={`w-[50px] absolute top-[10px] right-[-10px]`} alt="" />
                            )}
                        </div>

                        {profile.simulations.length >= 1 && (
                            <div className={`flex items-center justify-around w-full font-extrabold text-[24px] uppercase mt-4`}>
                                <p className={`animate-textChange`}>conquistas</p>
                                <p className={`animate-textChange text-[24px]`}>{profile.simulationsConcludeds}</p>
                            </div>
                        )}
                        
                        {profile.simulations.length >= 1 ? profile.simulations.map((simu:any) => (
                            <>
                                {loadingAchivements == false && conquests.length >= 1 && conquests.map((conq, i) => (
                                    <>
                                        {conq.title == simu.name && (
                                            <ConquestCard level={conq.level} message={conq.message} porcentage={conq.porcentage} backImg={conq.imgURL} title={conq.title} key={i} ind={i} active={true} />
                                        )}
                                    </>
                                ))}
                            </>
                        )):(
                            <div className={`flex flex-col items-center justify-start`}>
                                <Text text='O usuário não possui conquistas'/>
                                <IoMdSad
                                    className={`text-[120px]
                                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                                    `}
                                />
                            </div>
                        )}
                    </div>
                )}

                {loadingContent == false && profile === null &&(
                    <div className={`flex flex-col items-center justify-start`}>
                        <Text text='Nenhum usuário encontrado'/>
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