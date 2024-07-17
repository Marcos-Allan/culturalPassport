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
import ConquestCard from '../../components/ConquestCard';
import Text from '../../components/Text';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

export default function Achievements() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //UTILIZA O HOOK DO useState
    const [conquests, setConquests] = useState<any[]>([])

    //FUNÇÃO RESPONSÁVEL POR PEGAR AS CONQUISTAS DO BD
    function getAchievements() {
        instance.get('/achievement/achievements')
        .then(function (response) {
            setConquests(response.data)
            console.log(response.data)
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

        //DEFINE O ARRAY COM AS CONQUISTAS
        getAchievements()

        console.log(userS)

    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Conquistas`}
                />
                <MenuButton />
            </Navbar>
            
            <div className={`w-full flex flex-col justify-start items-center sm:gap-[20px] mb-[100px] sm:mb-[40px] lg:mb-0 overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>    
                {conquests.length >= 1 ? conquests.map((conq, i) => (
                    <ConquestCard level={conq.level} message={conq.message} porcentage={conq.porcentage} backImg={conq.imgURL} title={conq.title} key={i} />
                )):(
                    <>
                        <Text text='Nenhuma conquista concluida ainda'/>
                        <IoMdSad
                            className={`text-[120px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                    </>
                )}
            </div>

            <BottomNavigation />
            
            <Menu />
        </>
    )
}