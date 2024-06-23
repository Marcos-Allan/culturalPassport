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
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import BottomNavigation from "../../components/BottomNavigation";
import Menu from "../../components/Menu";
import MenuButton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import NotificationCard from '../../components/NotificationCard';
import Text from '../../components/Text';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS ICONES
import { IoMdHappy } from "react-icons/io";

export default function Notifications() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

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
    },[])

    //UTILIZA O HOOK DO useState
    const [notification, setNotification] = useState<any[]>([])

    //FUNÇÃO RESPONSÁVEL POR REMOVER A NOTIFICAÇÃO DA TELA
    function removeNotify(itemRemoved : { materia: string, content: string, isClosed: boolean }) {
        //VÊ QUAL ITEM VAI SER REMOVIDO E ADICIONA A ANIMAÇÃO DE REMOÇÃO
        const updatedArr = notification.map((not) => 
            not.content === itemRemoved.content ? { ...not, isClosed: true } : not
        )

        //ATUALIZA A LISTA DE NOTIFICAÇÕES COM AS MODIFICAÇÕES
        setNotification(updatedArr)

        //FUNÇÃO CHAMADA DEPOIS DE .4 SEGUNDOS
        setTimeout(() => {
            //REMOVE A NOTIFICAÇÃO DO ARRAY
            setNotification((nots) =>
            nots.filter(item => item.content !== itemRemoved.content))
        }, 400);
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //DEFINE O ARRAY COM AS NOTIFICAÇÕES
        setNotification([
            { materia: 'quimica', content: 'aprender a fazer sal', isClosed: false},
            { materia: 'matemática', content: 'porcentagem', isClosed: false},
            { materia: 'português', content: 'verbos', isClosed: false},
            { materia: 'filosofia', content: 'sócrates', isClosed: false},
            { materia: 'sociologia', content: 'socialismo x comunismo', isClosed: false},
            { materia: 'biologia', content: 'oviviparo', isClosed: false},
            { materia: 'quimica', content: 'química orgânica', isClosed: false},
            { materia: 'geografia', content: 'poluição ambiental', isClosed: false}
        ])
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Notificações`}
                />
                <MenuButton />
            </Navbar>

            <div className={`w-[90%] sm:w-[60%] mt-5 flex flex-col justify-start items-center gap-[15px] mb-[50px] lg:mb-0 ${notification.length >= 1 && 'overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary'}`}>
                {notification.length >= 1 ? notification.map((not, i) => (
                    <NotificationCard materia={not.materia} content={not.content}
                        event={() => removeNotify({materia: not.materia, content: not.content, isClosed: not.isClosed })} key={i} isClosed={not.isClosed}
                    />
                )):(
                    <div className='w-full flex flex-col items-center'>
                        
                        <Text text='Nenhuma Notificação Recebida'/>
                        <IoMdHappy
                            className={`text-[120px]
                            ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}
                        />
                        
                    </div>
                )}
            </div>

            <BottomNavigation />
            
            <Menu />
        </>
    )
}