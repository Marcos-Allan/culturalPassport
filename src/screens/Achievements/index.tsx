//IMPORTAÇÃO DAS BIBLIOTECAS    
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import BottomNavigation from "../../components/BottomNavigation";
import Menu from "../../components/Menu";
import MenuBUtton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';
import ConquestCard from '../../components/ConquestCard';

export default function Achievements() {

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

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Conquistas`}
                />
                <MenuBUtton />
            </Navbar>

            <ConquestCard level={2} message='próxima meta 365 dias' porcentage={80} title='Day o Cool' />
            <ConquestCard level={3} message='próxima meta 10x ao dia' porcentage={100} title='First fap' />

            <BottomNavigation />
            
            <Menu />
        </>
    )
}