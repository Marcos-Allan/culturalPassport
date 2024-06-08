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
import { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from '../../components/TitlePage'
import MenuBUtton from '../../components/MenuButton'
import Text from '../../components/Text'
import EmailInput from '../../components/EmailInput'
import Button from '../../components/Button'
import Menu from '../../components/Menu';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

export default function ConfirmCode() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, toggleLoading, toggleAlert } = states

    //CRIA OS ESTADOS DO COMPONENTE
    const [inputCodeValue, SetInputCodeValue] = useState<string>('')
    const [stateCode, setStateCode] = useState<boolean>(false)
    const [formValidate, setFormValidate] = useState<boolean>(true)

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == true){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/materias')
        }
    },[])

    //FUNÇÃO RESPONSÁVEL POR ENVIAR CÓDIGO PARA O EMAIL DO USUÁRIO
    function verifyCode() {

        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        instance.get(`/verifycode/${inputCodeValue}`)
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //ESCREVE NO CONSOLE DO SITE 
            console.log(response.data)

            //VERIFICA SE A CONTA EXISTE NO BANCO DE DADOS
            if(response.data == "Código de verificação errado"){
                //COLOCA ALERT NA TELA
                toggleAlert(`error`, `Código Inválido`)
            }else if(response.data == "Código de verificação correto"){
                //COLOCA ALERT NA TELA
                toggleAlert(`success`, `Autenticação completa`)
                //REDIRECIONA O USUÁRIO PARA A PRÓXIMA PÁGINA
                navigate('/switch-password')
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

    //FUNÇÃO UTILIZADA PARA MUDAR O VALOR DA VARIAVEL COM BASE NO INPUT
    function handleInputCodeChange(e:ChangeEvent<HTMLInputElement>) {
        SetInputCodeValue(e.target.value)

        //CHAMA UMA FUNÇÃO PARA VER A VALIDAÇÃO DO INPUT
        validateInputEmail()
    }

    //FUNÇÃO RESPONSÁVEL POR VER SE O CAMPO ESTÁ NO PADRÃO
    function validateInputEmail(){
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoCode = /^\d{3}-\d{2}/
        
        if(padraoCode.test(inputCodeValue) == true){
            setStateCode(true)
        }else{
            setStateCode(false)
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE RECARREGA A PÁGINA
    useEffect(() => {
        //VERIFICA SE O INPUT ESTÁ NO PADRÃO
        if(stateCode == true){
            setFormValidate(false)
        }else{
            setFormValidate(true)
        }
    },[stateCode])

    return(
        <>      
            <Navbar>
                <Return />
                <TitlePage
                    text={`Confirmar código`}
                />
                <MenuBUtton />
            </Navbar>
            <Text text={`Digite o código que foi enviado por email`} />

            <form className={`mt-8 items-center flex flex-col w-[90%]`} onSubmit={(e) => e.preventDefault()}>
                {/* <EmailInput value={inputCodeValue} event={} /> */}
                <EmailInput value={inputCodeValue} event={handleInputCodeChange} checked={stateCode} />
                <Text text={`Confirme o código enviado para o seu email para alterar a senha`} />
                <Button route='undefined' text={`Confirmar`} disabled={formValidate} event={verifyCode} />
            </form>
            <Menu />
        </>
    )
}