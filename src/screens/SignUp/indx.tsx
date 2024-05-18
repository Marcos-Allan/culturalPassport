//IMPORTAÇÃO DAS BIBLIOTECAS
import { useNavigate } from 'react-router-dom'
import { useState, ChangeEvent } from 'react'
import axios from 'axios'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DOS COMPONENTES
import ScreenPage from "../../components/ScreenPage/index.tsx"
import Navbar from "../../components/Navbar/index.tsx"
import Return from "../../components/Return/index.tsx"
import TitlePage from "../../components/TitlePage/index.tsx"
import MenuBUtton from '../../components/MenuButton/index.tsx'
import NameInput from "../../components/NameInput/index.tsx"
import EmailInput from "../../components/EmailInput/index.tsx"
import PasswordInput from "../../components/PasswordInput/index.tsx"
import Button from "../../components/Button/index.tsx"
import Linkin from "../../components/Linkin/index.tsx"

export default function SignUp(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { toggleLoading, toggleAlert } = states

    //UTILIZA O HOOK useState
    const [inputEmailValue, setInputEmailValue] = useState<string>('')
    const [inputNameValue, setInputNameValue] = useState<string>('')
    const [inputPasswordValue, setInputPasswordValue] = useState<string>('')

    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputNameChange(e:ChangeEvent<HTMLInputElement>){
        setInputNameValue(e.target.value)
    }
    
    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputEmailChange(e:ChangeEvent<HTMLInputElement>){
        setInputEmailValue(e.target.value)
    }

    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputPasswordChange(e:ChangeEvent<HTMLInputElement>) {
        setInputPasswordValue(e.target.value)
    }

    //FUNÇÃO RESPONSÁVEL POR CRAIR CONTA NO BANCO DE DADOS
    function signup(){
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //FAZ UMA REQUISIÇÃO POST PARA O BACKEND DA APLICAÇÃO
        axios.post('https://backendculturalpassport-1.onrender.com/signup', {
            //MANDA OS DADOS PARA O BACKEND JUNTO COM A REQUISIÇÃO
            name: inputNameValue,
            email: inputEmailValue,
            password: inputPasswordValue
        })
        .then(function (response) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR BEM SUCEDIDA
            
            //MOSTRA A RESPOSTA DA REQUISIÇÃO NO CONSOLE DO BROWSER
            console.log(response.data)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //TRATAMENTO CASO A CONTA JA EXISTA NO BANCO DE DADOS
            if(response.data == 'Usuário já cadastrado com esse email'){
                //COLOCA ALERT NA TELA
                toggleAlert('error', 'A conta ja existe')
            }else{
                //COLOCA ALERT NA TELA
                toggleAlert('success', 'Conta criada com sucesso')

                //REDIRECIONA O USUÁRIO PARA A PÁGINA DE LOGIN
                navigate('/sign-in')
            }
            
        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log('ocorreu algum erro: ', error)

            //
            toggleAlert('error', 'erro de servidor')
        })
    }

    return(
        <ScreenPage>
            <Navbar>
                <Return />
                <TitlePage
                    text={`cadastrar`}
                />
                <MenuBUtton />
            </Navbar>

            <form className={`mt-8 items-center flex flex-col w-full`}>
                
                <NameInput text="Name" placeholder="Digite seu nome" value={inputNameValue} event={handleInputNameChange} />

                <NameInput text="Last Name" placeholder="Digite seu sobrenome" />
                <NameInput text="RA/RM" placeholder="Digite seu RA ou RM" />

                <EmailInput event={handleInputEmailChange} value={inputEmailValue} />   

                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={false} value={inputPasswordValue} event={handleInputPasswordChange} />
                <PasswordInput text="Confirm Password" placeholder="Digite a confirmação da senha" hidden={false} />
                
                <Button text="criar" route="undefined" event={signup} />
            </form>
            
            <Linkin route="/sign-in" text="Já possui uma conta?" />
        </ScreenPage>
    )
}