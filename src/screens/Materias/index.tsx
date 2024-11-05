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
import MaterialCard from "../../components/MaterialCard";
import BottomNavigation from "../../components/BottomNavigation";
import Text from '../../components/Text';
import CronogramPage from '../../components/CronogramPage';
import BubbleAnimation from '../../components/Bubles';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

export default function Materias() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //UTILIZA O HOOK DO useState
    const [matters, setMatters] = useState<any[]>([])
    const [loadingMatter, setLoadingMatter] = useState<boolean>(false)
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[userS.logged])

    //FUNÇÃO RESPONÁVEL POR PEGAR AS MATÉRIAS
    function getMatters() {
        //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA true
        setLoadingMatter(true)

        instance.get('/matter/matters')
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA false
            setLoadingMatter(false)
            
            //LIMPA O ARRAY DE MATÉRIAS
            setMatters([])

            //COLOCA AS MATÉRIAS CADASTRADAS NO BD NO ARRAY DE MATÉRIAS
            response.data.map((mat:any, i:number) => {
                setMatters((mats:any) => [...mats, {
                    titleMateria: mat.matter,
                    background: i
                }])
            })
        })
        .catch(function (error) {
            console.log(error)
            //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA false
            setLoadingMatter(false)
        })
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //CHAMA A FUNÇÃO RESPONSÁVEL POR PEGA AS MATÉRIAS CADASTRADAS NO BD
        getMatters()

        console.log(userS)
    },[])

    return(
        <>
            <BubbleAnimation />
            <Navbar>
                <Return />
                <TitlePage
                    text={`Matérias`}
                />
            </Navbar>

            {/* <div className={`w-full flex flex-col justify-start items-center sm:gap-[20px] mb-[100px] sm:mb-[40px] lg:mb-0 overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>     */}
            <div className={`w-full sm:w-[70%] flex flex-row flex-wrap sm:flex-row sm:flex-wrap justify-center sm:justify-center items-start sm:gap-[20px] mb-[100px] sm:mb-[40px] overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>    
                {loadingMatter == false && matters.length >= 1 && matters.map((mat, i) => (
                    <MaterialCard titleMateria={mat.titleMateria} background={mat.background} key={i} />
                ))}

                {loadingMatter == false && matters.length == 0 && (
                    <div className={`flex flex-col items-center justify-start`}>
                        <Text text='Nenhuma matéria encontrada'/>
                        <IoMdSad
                            className={`text-[120px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                    </div>
                )}

                {loadingMatter == true && (
                    <p className={`w-full text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>estamos carregando as matérias seja paciente</p>
                )}
            </div>

            <CronogramPage />
            
            <BottomNavigation />
        </>
    )
}