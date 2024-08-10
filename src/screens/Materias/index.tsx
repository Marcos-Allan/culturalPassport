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
import Menu from "../../components/Menu";
import MenuButton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import MaterialCard from "../../components/MaterialCard";
import BottomNavigation from "../../components/BottomNavigation";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';
import CronogramPage from '../../components/CronogramPage';

export default function Materias() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //UTILIZA O HOOK DO useState
    const [matters, setMatters] = useState<any[]>([])
    // const [mattersCRO, setMattersCRO] = useState<any[]>([])
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS } = states

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
        //DEFINE O ARRAY COM AS MATÉRIAS
        setMatters([
            { titleMateria: 'fisíca',  background: 0 },
            { titleMateria: 'história',  background: 1 },
            { titleMateria: 'inglês',  background: 2 },
            { titleMateria: 'geografia',  background: 3 },
            { titleMateria: 'artes',  background: 4 },
            { titleMateria: 'português',  background: 5 },
            { titleMateria: 'química',  background: 6 },
            { titleMateria: 'biologia',  background: 7 },
            { titleMateria: 'matemática',  background: 8 },
        ])
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Materias`}
                />
                <MenuButton />
            </Navbar>

            <div className={`w-full sm:w-[70%] flex flex-col sm:flex-row sm:flex-wrap justify-start sm:justify-center items-center sm:gap-[20px] mb-[100px] sm:mb-[0px] overflow-y-scroll sm:overflow-visible scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>    
                {matters.map((mat, i) => (
                    <MaterialCard titleMateria={mat.titleMateria} background={mat.background} key={i} />
                ))}
            </div>

            <CronogramPage />
            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}