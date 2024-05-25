//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS COMPONENTES
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
import Menu from '../../components/Menu';

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
    
    const [statePassword, setStatePassword] = useState<boolean>(false)
    const [stateEmail, setStateEmail] = useState<boolean>(false)
    const [formValidate, setFormValidate] = useState<boolean>(true)

    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputEmailChange(e:ChangeEvent<HTMLInputElement>) {
        setInputEmailValue(e.target.value)

        //CHAMA UMA FUNÇÃO PARA VER A VALIDAÇÃO DO INPUT
        validateInputEmail()
    }
    
    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputPasswordChange(e:ChangeEvent<HTMLInputElement>) {
        setInputPasswordValue(e.target.value)

        //CHAMA UMA FUNÇÃO PARA VER A VALIDAÇÃO DO INPUT
        validateInputPassword()
    }

    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputEmail(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoEmail = /^[\w._-]+@[\w._-]+\.[\w]{2,}/i
        
        if(padraoEmail.test(inputEmailValue) == true){
            setStateEmail(true)
        }else{
            setStateEmail(false)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputPassword(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPassword = /^[\w._-]{6,10}$/i

        if(padraoPassword.test(inputPasswordValue) == true){
            setStatePassword(true)
        }else{
            setStatePassword(false)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL PELO LOGIN COM EMAIL E SENHA
    function signIn() {

        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //FAZ UMA REQUISIÇÃO POST PARA O BACKEND DA APLICAÇÃO
        instance.post('/signin', {
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

                //REGISTRA O NOME E A FOTO E O ID DO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
                toggleUser(response.data.name, response.data.img, response.data._id)

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

    useEffect(() => {
        if(stateEmail == true && statePassword == true){
            setFormValidate(false)
        }else{
            setFormValidate(true)
        }
    },[stateEmail, statePassword])  

    return(
        <>  
            <Navbar>   
                <Return />
                <TitlePage
                    text={`login`}
                />
                <MenuBUtton />
            </Navbar>

            <form className={`mt-8 sm:mt-4 items-center flex flex-col w-[90%]`} onSubmit={(e) => e.preventDefault()}>
                
                <EmailInput value={inputEmailValue} event={handleInputEmailChange} checked={stateEmail} />   
                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={true} value={inputPasswordValue} event={handleInputPasswordChange} checked={statePassword}/>
                <PersonType />

                <Button text="entrar" route="undefined" event={signIn} disabled={formValidate} />
                
                <Linkin route="/forgout-passowrd" text="Esqueceu sua senha?" />

                <Linkin route="/sign-up" text="Crie sua conta" />

                <Separation />

                <GoogleLogin />
            </form>
            <Menu />
        </>
    )
}