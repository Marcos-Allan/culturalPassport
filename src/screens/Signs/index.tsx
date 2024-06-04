//IMPORTAÇÃO DAS BIBLIOTECAS    
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES DA PÁGINA
import Navbar from "../../components/Navbar/index.tsx";
import Return from "../../components/Return/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"
import MenuBUtton from "../../components/MenuButton/index.tsx";
import Text from "../../components/Text/index.tsx";
import Button from "../../components/Button/index.tsx"
import Menu from "../../components/Menu/index.tsx";
import DividersButton from "../../components/DividersButton/index.tsx";

//IMPORTAÇÃO DA IMAGEM USADA NA PÁGINA
import Person from '../../assets/person_2.png'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Signs(){

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
                <Return />
                <TitlePage
                    text={`salve seu progresso`}
                />
                <MenuBUtton />
            </Navbar>
            
            <Text
                text="Faça login ou cadastre-se para não perder seus dados"
            />

            <img
                src={Person}
                className="w-[93%] sm:w-[30%]"
                alt=""
            />
            <DividersButton>
                <Button text="login" route="/sign-in" />
                <Button text="criar conta" route="/sign-up" />
            </DividersButton>
            <Menu />
        </>
    )
}