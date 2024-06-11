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
import MenuButton from '../../components/MenuButton/index.tsx'
import Input from '../../components/Input/index.tsx'
import Button from "../../components/Button/index.tsx"
import Linkin from "../../components/Linkin/index.tsx"
import Menu from '../../components/Menu/index.tsx'

//IMPORTAÇÃO DAS IMAGENS
import bg from '../../assets/imgs/02bg.png'

export default function SignUp(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { toggleLoading, toggleAlert, userS, theme } = states

    //UTILIZA O HOOK useState
    const [inputEmailValue, setInputEmailValue] = useState<string>('')
    const [inputNameValue, setInputNameValue] = useState<string>('')
    const [inputLastNameValue, setInputLastNameValue] = useState<string>('')
    const [inputDateValue, setInputDateValue] = useState<string>('')
    const [inputPasswordValue, setInputPasswordValue] = useState<string>('')
    const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState<string>('')

    const [statePassword, setStatePassword] = useState<boolean>(false)
    const [stateConfirmPassword, setStateConfirmPassword] = useState<boolean>(false)
    const [stateEmail, setStateEmail] = useState<boolean>(false)
    const [stateName, setStateName] = useState<boolean>(false)
    const [stateLastName, setStateLastName] = useState<boolean>(false)
    const [stateDate, setStateDate] = useState<boolean>(false)
    const [formValidate, setFormValidate] = useState<boolean>(true)

    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputNameChange(e:ChangeEvent<HTMLInputElement>){
        setInputNameValue(e.target.value)

        //CHAMA UMA FUNÇÃO PARA VER A VALIDAÇÃO DO INPUT
        validateInputName()
    }
    
    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputLastNameChange(e:ChangeEvent<HTMLInputElement>){
        setInputLastNameValue(e.target.value)

        //CHAMA UMA FUNÇÃO PARA VER A VALIDAÇÃO DO INPUT
        validateInputLastName()
    }
    
    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputDateChange(e:ChangeEvent<HTMLInputElement>){
        setInputDateValue(e.target.value)

        //CHAMA UMA FUNÇÃO PARA VER A VALIDAÇÃO DO INPUT
        validateInputDate()
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
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputName(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoName = /^[A-Za-z' -]{1,50}$/

        if(padraoName.test(inputNameValue) == true){
            setStateName(true)
        }else{
            setStateName(false)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputLastName(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoLastName = /^[A-Za-z' -]{1,50}$/

        if(padraoLastName.test(inputLastNameValue) == true){
            setStateLastName(true)
        }else{
            setStateLastName(false)
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputDate(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{1}$/

        if(padraoDate.test(inputDateValue) == true){
            setStateDate(true)
        }else{
            setStateDate(false)
        }
    }

    useEffect(() => {
        if(stateEmail == true && statePassword == true && stateConfirmPassword == true && stateName == true && stateLastName == true && stateDate == true){
            setFormValidate(false)
        }else{
            setFormValidate(true)
        }
    },[stateEmail, statePassword, stateConfirmPassword, stateName, stateLastName, stateDate]) 

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

            //COLOCA ALERT NA TELA
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
    },[])

    return(
        <>
            <div className='lg:hidden w-full flex justify-center items-center'>
                <Navbar>
                    <Return />
                    <TitlePage
                        text={`cadastrar`}
                    />
                    <MenuButton />
                </Navbar>
            </div>

            <div className={`w-full flex justify-center h-[100vh]`}>
                <img className={`hidden lg:flex h-full`} src={bg} alt="pilha de livros" />

                <form className={`mt-8 lg:mt-0 items-center flex lg:h-full flex-col w-full overflow-y-scroll mb-6 sm:mb-20 relative scrollbar scrollbar-track-transparent ${theme == 'light' ? 'scrollbar-thumb-my-secondary' : 'scrollbar-thumb-my-terciary'}`} onSubmit={(e) => e.preventDefault()}>
                    <h1 className={`hidden lg:flex text-center text-[30px] font-bold mt-6 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Cadastre-se</h1>

                    <Input
                        placeholder='Digite seu nome'
                        placeholderLarge='Nome'
                        text='Nome'
                        event={handleInputNameChange}
                        value={inputNameValue}
                        checked={stateName}
                        icon='person'
                        messageCorrect='nome aceito'
                        messageError='nome inválido'
                    />   

                    <Input
                        placeholder='Digite seu sobrenome'
                        placeholderLarge='Sobrenome' 
                        text='Sobrenome'
                        event={handleInputLastNameChange}
                        value={inputLastNameValue}
                        checked={stateLastName}
                        icon='person'
                        messageCorrect='sobrenome aceito'
                        messageError='sobrenome inválido'
                    />   
                    
                    <Input
                        placeholder='Digite sua data de nascimento'
                        placeholderLarge='Data de Nasc'
                        text='Data de Nasc'
                        event={handleInputDateChange}
                        value={inputDateValue}
                        checked={stateDate}
                        icon='person'
                        messageCorrect='data dentro do padrão'
                        messageError='formato inválido'
                    /> 

                    <Input
                        placeholder='Digite um endereço de email'
                        placeholderLarge='Email'
                        text='Email'
                        event={handleInputEmailChange}
                        value={inputEmailValue}
                        checked={stateEmail}
                        icon='email'
                        messageCorrect='email dentro do padrão'
                        messageError='email fora do padrão'
                    />   

                    <Input
                        text="Senha"
                        placeholder="Digite uma senha"
                        placeholderLarge='Senha'
                        hidden={true}
                        value={inputPasswordValue}
                        event={handleInputPasswordChange} 
                        checked={statePassword}
                        icon='password'
                        messageCorrect='senha dentro dos padrões'
                        messageError='senha precisa ter pelo menos 6 caracteres'
                    />
                    <Input
                        text="Confirma a Senha"
                        placeholder="Digite a confirmação da senha"
                        placeholderLarge='Confirme a Senha'
                        hidden={true}
                        value={inputConfirmPasswordValue}
                        event={handleInputConfirmPasswordChange}
                        checked={stateConfirmPassword}
                        icon='password'
                        messageCorrect='senhas estão iguais'
                        messageError='as senhas não são iguais'
                    />
                    
                    <Button text="criar" route="undefined" event={signup} disabled={formValidate} />
                    
                    <Linkin route="/sign-in" text="Já possui uma conta?" />

                    <div className={`hidden lg:block absolute top-0 right-0 me-5`}>
                        <MenuButton />
                    </div>
                </form>

            </div>
            <Menu />
        </>
    )
}