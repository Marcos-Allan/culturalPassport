//IMPORTAÇÃO DAS BIBLIOTECAS
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, ChangeEvent } from 'react'

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios.ts'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar/index.tsx"
import Return from "../../components/Return/index.tsx"
import TitlePage from "../../components/TitlePage/index.tsx"
import MenuBUtton from '../../components/MenuButton/index.tsx'
import NameInput from "../../components/NameInput/index.tsx"
import EmailInput from "../../components/EmailInput/index.tsx"
import PasswordInput from "../../components/PasswordInput/index.tsx"
import Button from "../../components/Button/index.tsx"
import Linkin from "../../components/Linkin/index.tsx"
import Menu from '../../components/Menu/index.tsx'


export default function SignUp(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { toggleLoading, toggleAlert, userS } = states

    //UTILIZA O HOOK useState
    const [inputEmailValue, setInputEmailValue] = useState<string>('')
    const [inputNameValue, setInputNameValue] = useState<string>('')
    const [inputPasswordValue, setInputPasswordValue] = useState<string>('')
    const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState<string>('')

    const [statePassword, setStatePassword] = useState<boolean>(false)
    const [stateConfirmPassword, setStateConfirmPassword] = useState<boolean>(false)
    const [stateEmail, setStateEmail] = useState<boolean>(false)
    const [formValidate, setFormValidate] = useState<boolean>(true)

    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputNameChange(e:ChangeEvent<HTMLInputElement>){
        setInputNameValue(e.target.value)
    }

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
    
    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputConfirmPasswordChange(e:ChangeEvent<HTMLInputElement>) {
        setInputConfirmPasswordValue(e.target.value)

        //CHAMA UMA FUNÇÃO PARA VER A VALIDAÇÃO DO INPUT
        validateInputConfirmPassword()
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
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputConfirmPassword(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoConfirmPassword = new RegExp(`\^${inputPasswordValue.slice(0, -1)}$`)

        if(padraoConfirmPassword.test(inputConfirmPasswordValue) == true){
            setStateConfirmPassword(true)
        }else{
            setStateConfirmPassword(false)
        }
    }

    useEffect(() => {
        if(stateEmail == true && statePassword == true && stateConfirmPassword == true){
            setFormValidate(false)
        }else{
            setFormValidate(true)
        }
    },[stateEmail, statePassword, stateConfirmPassword]) 

    //FUNÇÃO RESPONSÁVEL POR CRAIR CONTA NO BANCO DE DADOS
    function signup(){
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //FAZ UMA REQUISIÇÃO POST PARA O BACKEND DA APLICAÇÃO
        instance.post('/signup', {
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

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == true){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/materias')
        }
    })

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`cadastrar`}
                />
                <MenuBUtton />
            </Navbar>

            <form className={`mt-8 items-center flex flex-col w-full`} onSubmit={(e) => e.preventDefault()}>
                
                <NameInput text="Name" placeholder="Digite seu nome" value={inputNameValue} event={handleInputNameChange} />

                <NameInput text="Last Name" placeholder="Digite seu sobrenome" />
                <NameInput text="RA/RM" placeholder="Digite seu RA ou RM" />

                <EmailInput event={handleInputEmailChange} value={inputEmailValue} checked={stateEmail} />   

                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={false} value={inputPasswordValue} event={handleInputPasswordChange} checked={statePassword} />
                <PasswordInput text="Confirm Password" placeholder="Digite a confirmação da senha" hidden={false} value={inputConfirmPasswordValue} event={handleInputConfirmPasswordChange} checked={stateConfirmPassword} />
                
                <Button text="criar" route="undefined" event={signup} disabled={formValidate} />
            </form>
            
            <Linkin route="/sign-in" text="Já possui uma conta?" />
            <Menu />
        </>
    )
}