//IMPORTAÇÃO DAS BIBLIOTECAS    
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import BottomNavigation from "../../components/BottomNavigation";
import Menu from "../../components/Menu";
import MenuBUtton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import NotificationCard from '../../components/NotificationCard';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Notifications() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

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
    },[])

    //UTILIZA O HOOK DO useState
    const [notification, setNotification] = useState<any[]>([])

    //FUNÇÃO RESPONSÁVEL POR REMOVER A NOTIFICAÇÃO DA TELA
    function removeNotify(itemRemoved : { materia: string, content: string }) {
        setNotification((nots) =>
        nots.filter(item => item.content !== itemRemoved.content))
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //DEFINE O ARRAY COM AS MATÉRIAS
        setNotification([
            { materia: 'quimica', content: 'aprender a fazer sal'},
            { materia: 'pdtcc', content: 'SCRUM'},
            { materia: 'quimica', content: 'pdtcc'},
            { materia: 'matemática', content: 'porcentagem'},
            { materia: 'português', content: 'verbos'},
            { materia: 'filosofia', content: 'sócrates'},
            { materia: 'sociologia', content: 'socialismo x comunismo'},
            { materia: 'biologia', content: 'oviviparo'},
            { materia: 'quimica', content: 'química orgânica'},
            { materia: 'geografia', content: 'poluição ambiental'}
        ])
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Notificações`}
                />
                <MenuBUtton />
            </Navbar>

            <div className={`w-full sm:w-[70%] mt-5 flex flex-col justify-center items-center gap-[15px] pb-[60px]`}>
                {notification.map((not) => (
                    <NotificationCard materia={not.materia} content={not.content} event={() => removeNotify({materia: not.materia, content: not.content })} />
                ))}
            </div>

            <BottomNavigation />
            
            <Menu />
        </>
    )
}