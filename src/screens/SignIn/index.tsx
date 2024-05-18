//IMPORTAÇÃO DAS BIBLIOTECAS
import axios from 'axios'
import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import ScreenPage from "../../components/ScreenPage";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import MenuBUtton from '../../components/MenuButton';
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import PersonType from "../../components/PersonType";
import Linkin from "../../components/Linkin";
import Button from "../../components/Button";
import Separation from "../../components/Separation";
import GoogleLogin from "../../components/GoogleLogin";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';


export default function SignIn(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { toggleUser, toggleLoading, toggleAlert } = states

    //UTILIZA O HOOK useState
    const [inputEmailValue, setInputEmailValue] = useState<string>('')
    const [inputPasswordValue, setInputPasswordValue] = useState<string>('')

    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputEmailChange(e:ChangeEvent<HTMLInputElement>) {
        setInputEmailValue(e.target.value)
    }
    
    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputPasswordChange(e:ChangeEvent<HTMLInputElement>) {
        setInputPasswordValue(e.target.value)
    }

    //FUNÇÃO RESPONSÁVEL PELO LOGIN PELO EMAIL
    function signIn() {

        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //FAZ UMA REQUISIÇÃO POST PARA O BACKEND DA APLICAÇÃO
        axios.post('https://backendculturalpassport-1.onrender.com/signin', {
            //MANDA OS DADOS PARA O BACKEND JUNTO COM A REQUISIÇÃO
            email: inputEmailValue,
            password: inputPasswordValue
        })
        .then(function (response) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR BEM SUCEDIDA
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //VERIFICA SE A CONTA FOI ENCONTRADA PELO TIPO DO DADO RETORNADO
            if(typeof response.data === "object"){

                //REGISTRA O NOME E A FOTO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
                toggleUser(response.data.name, response.data.img)

                //COLOCA ALERT NA TELA
                toggleAlert(`success`, `seja bem-vindo(a) ${response.data.name}`)
                
                //REDIRECIONA O USUÁRIO PARA A PÁGINA INICIAL
                navigate('/')

            }else{
                //RETORNA MENSAGEM DE ERRO AO USUARIO
                console.log(response)

                //COLOCA ALERT NA TELA
                toggleAlert(`error`, `${response.data}`)
            }
        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log('ocorreu algum erro: ', error);

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `lamentamos, erro interno no servidor`)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
        });
        
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        toggleLoading(false)
    },[])

    return(
        <ScreenPage>
            
            <Navbar>   
                <Return />
                <TitlePage
                    text={`login`}
                />
                <MenuBUtton />
            </Navbar>

            <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                
                <EmailInput value={inputEmailValue} event={handleInputEmailChange} />   
                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={true} value={inputPasswordValue} event={handleInputPasswordChange} />
                <PersonType />

                <Linkin route="/forgout-passowrd" text="Esqueceu sua senha?" />

                <Button text="entrar" route="undefined" event={signIn} />

                <Linkin route="/sign-up" text="Crie sua conta" />
                <Separation />

                <GoogleLogin />
            </form>

        </ScreenPage>
    )
}