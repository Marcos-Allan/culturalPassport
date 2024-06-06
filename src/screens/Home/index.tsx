//IMPORTAÇÃO DAS BIBLIOTECAS    
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"
import MenuBUtton from "../../components/MenuButton/index.tsx";
import Button from "../../components/Button/index.tsx"
import Text from "../../components/Text/index.tsx";
import Menu from "../../components/Menu/index.tsx";

//IMPORTAÇÃO DA IMAGEM USADA NA TELA
import Person from '../../assets/person_1.png'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Home(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS } = states

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == true){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/materias')
        }
    },[])

    return(
        <>
            <Navbar>
                <TitlePage text="Bem Vindo Estudante" />
                <MenuBUtton />
            </Navbar>

            <Text
                text="Seja muito bem-vindo ao nosso app de estudos. Se prepare para os vestibulares com simulados e conteúdos diversos"
            />

            <img
                src={Person}
                className={`w-full sm:w-[30%]`}
                alt=""
            />
                        
            <Button text="iniciar" route="/signs" />
            <Menu />
        </>
    )
}