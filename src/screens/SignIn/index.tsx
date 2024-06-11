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
import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import MenuButton from '../../components/MenuButton';
import Input from '../../components/Input';
import PersonType from "../../components/PersonType";
import Linkin from "../../components/Linkin";
import Button from "../../components/Button";
import Separation from "../../components/Separation";
import GoogleLogin from "../../components/GoogleLogin";
import Menu from '../../components/Menu';

//IMPORTAÇÃO DAS IMAGENS
import bg from '../../assets/imgs/01bg.png'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function SignIn(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, toggleUser, toggleLoading, toggleAlert, theme } = states

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
                navigate('/materias')

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
                        text={`login`}
                        />
                    <MenuButton />
                </Navbar>
            </div>

            <div className={`w-full flex justify-center h-[100vh]`}>
                <form className={`mt-8 sm:mt-4 lg:mt-0 items-center lg:justify-start flex flex-col w-[100%] px-[5%] sm:overflow-y-scroll sm:pb-[80px] lg:pb-[30px] lg:px-[0%] relative scrollbar-none`} onSubmit={(e) => e.preventDefault()}>
                    <h1 className={`hidden lg:flex text-center text-[30px] font-bold mt-6 mb-8 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Login</h1>
                    
                    <Input
                        text='Email'
                        placeholder='Digite seu email'
                        placeholderLarge='Email'
                        value={inputEmailValue}
                        event={handleInputEmailChange}
                        checked={stateEmail}
                        icon='email'
                        messageCorrect='Email dentro do padrão'
                        messageError='Email fora do padrão'
                    />   
                    <Input
                        text="Senha" 
                        placeholder="Digite sua senha"
                        placeholderLarge="Senha"
                        hidden={true}
                        value={inputPasswordValue}
                        event={handleInputPasswordChange}
                        checked={statePassword}
                        icon='password'
                        messageCorrect='Senha dentro do padrão'
                        messageError='Senha precisa ter pelo menos 6 caracteres'
                    />
                    <PersonType />

                    <Button text="entrar" route="undefined" event={signIn} disabled={formValidate} />
                    
                    <Linkin route="/forgout-password" text="Esqueceu sua senha?" />

                    <Linkin route="/sign-up" text="Crie sua conta" />

                    <Separation />

                    <GoogleLogin />
                    
                    <div className={`hidden lg:block absolute top-0 right-0 me-5`}>
                        <MenuButton />
                    </div>
                </form>

                <img className={`hidden lg:flex h-full`} src={bg} alt="livros com óculos em cima" />

            </div>
            <Menu />
        </>
    )
}