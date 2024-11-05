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
            <Navbar>
                <Return />
                <TitlePage
                    text={'Ranking'}
                />
            </Navbar>


            <div className={`w-[90%] sm:ml-[30px] sm:px-12 sm:w-[70%] mb-[100px] sm:mb-[40px] lg:mb-0 flex items-center flex-col overflow-y-scroll scrollbar-none`}>
                
                <div className={`w-[90%] flex justify-center items-end px-12 lg:px-32 my-4`}>
                    {loadingContent == false && users.length > 0 && users.map((user, i) => (
                        <>
                            {i == 0 && (
                                <div className='flex-grow-[1] h-[200px] bg-my-quartenary relative flex items-center justify-center order-1 rounded-t-[8px]'>
                                    <div className={`mt-2 absolute top-0`}>
                                        <img src={user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transaprent mb-1 `} />
                                        <p className={`text-center font-bold text-my-white`}>1°</p>
                                    </div>
                                </div>
                            )}
                            {i == 1 && (
                                <div className='flex-grow-[1] h-[150px] bg-my-quintenary relative flex items-center justify-center order-2 rounded-tr-[8px]'>
                                    <div className={`mt-2 absolute top-0`}>
                                        <img src={user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transparent mb-1`} />
                                        <p className={`text-center font-bold text-my-white`}>2°</p>
                                    </div>
                                </div>
                            )}
                            {i == 2 && (
                                <div className='flex-grow-[1] h-[120px] bg-my-secondary relative flex items-center justify-center order-0 rounded-tl-[8px]'>
                                    <div className={`mt-2 absolute top-0`}>
                                        <img src={user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transparent mb-1`} />
                                        <p className={`text-center font-bold text-my-white`}>3°</p>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </div>

                {loadingContent == false && users.length > 0 && users.map((user, i) => (
                    <div className={`
                        w-[95%] flex justify-between items-center mb-2 text-my-white
                        ${i == 0 && 'bg-my-quartenary'}
                        ${i == 1 && 'bg-my-quintenary'}
                        ${i == 2 && 'bg-my-secondary'}
                        ${i >= 3 && 'bg-my-gray'}
                        px-4 rounded-[6px] py-2
                    `}>
                        <div className={`flex items-center justify-start gap-1`}>
                            <p className={`mr-3`}>{i+1}°</p>
                            <img src={user.img} className={`w-[80px] h-[80px] rounded-[50%] border-[6px] ${i == 0 ? 'border-transparent' : 'border-transparent'}`} />
                            <p>{user.name}</p>
                        </div>
                        <p>{user.simulationsConcludeds}</p>
                    </div>
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