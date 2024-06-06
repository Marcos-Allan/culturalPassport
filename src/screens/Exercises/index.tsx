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
import Text from '../../components/Text';
import ExerciseCard from '../../components/ExerciseCard';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Exercises() {

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
                    text={`Exercicios`}
                />
                <MenuBUtton />
            </Navbar>


            <Text text='Passeios' />

            <ExerciseCard concluded={false} materia='Português' title='museu do ipiranga' type='travel' />
            <ExerciseCard concluded={true} materia='história' title='museu do terraplanismo' type='travel' />
            
            <Text text='Simulados' />
            
            <ExerciseCard concluded={false} materia='enem' title='fazer simulado de matemática' type='exercise' />
            <ExerciseCard concluded={true} materia='enem' title='fazer simulado de história' type='exercise' />
            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}