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
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from '../../components/TitlePage'
import MenuButton from '../../components/MenuButton'
import Text from '../../components/Text'
import Input from '../../components/Input';
import Button from '../../components/Button'
import Menu from '../../components/Menu';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DAS IMAGENS
import bg from '../../assets/imgs/03bg.png'

export default function ForgoutPassword() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, toggleAlert, toggleLoading, toggleUser } = states

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == true){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/materias')
        }
    },[userS.logged])

    //CRIA OS ESTADOS DO COMPONENTE
    const [inputEmailValue, setInputEmailValue] = useState<string>('')
    const [stateEmail, setStateEmail] = useState<boolean>(false)
    const [formValidate, setFormValidate] = useState<boolean>(true)

    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputEmailChange(e:ChangeEvent<HTMLInputElement>) {
        setInputEmailValue(e.target.value)

        //CHAMA UMA FUNÇÃO PARA VER A VALIDAÇÃO DO INPUT
        validateInputEmail()
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

    //FUNÇÃO RESPONSÁVEL POR ENVIAR CÓDIGO PARA O EMAIL DO USUÁRIO
    function sendEmail() {

        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        instance.get(`/forgoutpassword/${inputEmailValue}`)
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //ESCREVE NO CONSOLE DO SITE 
            console.log(response.data)

            //VERIFICA SE O USUÁRIO FOI ENCONTRADO E MANDA MENSAGEM DE SUCEESO PARA ELE
            if(response.data.message == "Código enviado para o email informado"){
                //COLOCA ALERT NA TELA
                toggleAlert(`success`, `Email enviado`)
                //RESGATA O ID DO USUÁRIO
                toggleUser('', '', response.data.user._id, [], 0, [], 'https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fsounds%2F14.mp3?alt=media&token=05af905e-a0c0-4552-b428-bfa036e28a13', [10, 0], false)
                //REDIRECIONA O USUÁRIO PARA A PRÓXIMA PÁGINA
                navigate('/confirm-code')
            }else{
                //COLOCA ALERT NA TELA
                toggleAlert(`error`, response.data)
            }

        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log('ocorreu algum erro: ', error);

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `lamentamos, erro interno no servidor`)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
        })
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE RECARREGA A PÁGINA
    useEffect(() => {
        //VERIFICA SE O INPUT ESTÁ NO PADRÃO
        if(stateEmail == true){
            setFormValidate(false)
        }else{
            setFormValidate(true)
        }
    },[stateEmail])

    return(
        <>
            <div className='lg:hidden w-full flex justify-center items-center'>
                <Navbar>
                    <Return />
                    <TitlePage
                        text={`esqueceu a senha`}
                    />
                    <MenuButton />
                </Navbar>
            </div>

            <div className={`w-full flex justify-center h-[100vh]`}>
                <img className={`hidden lg:flex h-full`} src={bg} alt="pilha de livros" />

                <form className={`mt-8 items-center flex flex-col w-[90%] gap-[16px] relative`}
                    onSubmit={(e) => e.preventDefault()}>
                    <div className={`hidden w-full lg:flex justify-center mb-16`}>
                        <Navbar>
                            <Return />
                            <TitlePage
                                text={`Esqueceu a senha?`}
                            />
                            <MenuButton />
                        </Navbar>
                    </div>

                    <Text text={`Digite o endereço de email no campo abaixo`} />
                    
                    <Input
                        mask=''
                        value={inputEmailValue}
                        event={handleInputEmailChange}
                        checked={stateEmail}
                        placeholder='Digite seu email'
                        placeholderLarge='Email' 
                        text='Email'
                        icon='email'
                        messageCorrect='email dentro do padrão'
                        messageError='email fora do padrão'
                    />
                    
                    <Text text={`enviaremos um código para o endereço de email digitado`} />
                        
                    <Button route='undefined' text={`Enviar`}  disabled={formValidate} event={sendEmail} />

                </form>
            </div>
            <Menu />
        </>
    )
}