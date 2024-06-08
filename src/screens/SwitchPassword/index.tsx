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

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from '../../components/TitlePage'
import MenuBUtton from '../../components/MenuButton';
import Text from '../../components/Text'
import PasswordInput from "../../components/PasswordInput";
import Button from '../../components/Button'
import Menu from '../../components/Menu';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';
import instance from '../../utils/axios';

export default function SwitchPassword() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, toggleLoading, toggleAlert } = states

    //UTILIZA O HOOK useState
    const [inputPasswordValue, setInputPasswordValue] = useState<string>('')
    const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState<string>('')
    const [statePassword, setStatePassword] = useState<boolean>(false)
    const [stateConfirmPassword, setStateConfirmPassword] = useState<boolean>(false)
    const [formValidate, setFormValidate] = useState<boolean>(true)

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
        if(statePassword == true && stateConfirmPassword == true){
            setFormValidate(false)
        }else{
            setFormValidate(true)
        }
    },[statePassword, stateConfirmPassword]) 

    function updateUser() {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)
        
        instance.put(`/users/update/${userS.id}`, {
            password: inputPasswordValue
        }).then((response) => {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //MOSTRA OS DADOS DA REQUISIÇÃO
            console.log(response.data)

            //COLOCA ALERT NA TELA
            toggleAlert(`success`, `Senha alterada com sucesso`)

            //REDIRECIONA O USUÁRIO PARA A PRÓXIMA PÁGINA
            navigate('/sign-in')
        }).catch((error) => {
            //ESCREVE NO CONSOLE O ERRO OCORRIDO
            console.log(`Requisição feita com falhas ${error}`)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Ocorreu um erro interno no servidor`)
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
            <Navbar>
                <Return />
                <TitlePage
                    text={`Trocar a Senha`}
                />
                <MenuBUtton />
            </Navbar>
            <Text text={`Crie sua nova senha`} />

            <form className={`mt-8 items-center flex flex-col w-[90%]`} onSubmit={(e) => e.preventDefault()}>
                {/* <PasswordInput hidden={false} placeholder="Senha" text="Senha" />
                <PasswordInput hidden={false} placeholder="Senha" text="Confirmação da Senha" />
                <Button route='/sign-in' text={`confirmar`} /> */}

                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={false} value={inputPasswordValue} event={handleInputPasswordChange} checked={statePassword} />
                <PasswordInput text="Confirm Password" placeholder="Digite a confirmação da senha" hidden={false} value={inputConfirmPasswordValue} event={handleInputConfirmPasswordChange} checked={stateConfirmPassword} />
                
                <Button text="confirmar" route="undefined" event={updateUser} disabled={formValidate} />
            </form>
            
            <Menu />
        </>
    )
}