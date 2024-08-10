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
import Text from '../../components/Text';
import ExerciseCard from '../../components/ExerciseCard';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";

export default function Exercises() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //UTILIZA O HOOK DO useState
    const [exercises, setExercises] = useState<any[]>([])
    const [simulations, setSimulations] = useState<any[]>([])
    const [travels, setTravels] = useState<any[]>([])

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
        //DEFINE O ARRAY COM AS CONQUISTAS
        setExercises([
            // { concluded: false, materia: 'português', title: 'museu do ipiranga', type: 'travel' },
            // { concluded: true, materia: 'geografia', title: 'museu do ipiranga', type: 'travel' },
            // { concluded: true, materia: 'fuvest', title: 'fazer simulado de matemática', type: 'simulation' },
            // { concluded: false, materia: 'enem', title: 'fazer simulado de matemática', type: 'simulation' },
        ])

        const simulations_c = exercises.filter(exerc => exerc.type == 'simulation')
        const travels_c = exercises.filter(exerc => exerc.type == 'travel')

        setSimulations(simulations_c)
        setTravels(travels_c)
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Exercicios`}
                />
                <MenuButton />
            </Navbar>

            <div className={`w-full flex flex-col justify-start items-center mb-[100px] sm:mb-[40px] lg:mb-0 overflow-y-scroll overflow-visible scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>    
                <Text text='Passeios' position='left' />

                {travels.length >= 1 ? travels.map((exerc, i) => (
                    <ExerciseCard
                        concluded={exerc.concluded}
                        materia={exerc.materia}
                        title={exerc.title}
                        type={exerc.type} key={i}
                    />
                )):(
                    <Text text='Nenhum passeio disponivel no momento'/>
                )}
                
                <Text text='Simulados' position='left' />
                
                {simulations.length >= 1 ? simulations.map((exerc, i) => (
                    <ExerciseCard
                        concluded={exerc.concluded}
                        materia={exerc.materia}
                        title={exerc.title}
                        type={exerc.type} key={i}
                    />
                )):(
                    <Text text='Nenhum simulado disponivel no momento'/>
                )}
                {travels.length == 0 && simulations.length == 0 && (
                    <IoMdSad
                        className={`text-[120px]
                            ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                        `}
                    />
                )}
            </div>
            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}