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
import { useState, useRef, useEffect } from "react";
import InputMask from "react-input-mask"

//IMPORTAÇÃO DOS ICONES
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineLock, MdOutlineEmail, MdOutlinePerson, MdOutlinePhoneIphone } from "react-icons/md";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string,
    placeholder: string,
    placeholderLarge: string,
    mask: string,
    hidden?: boolean,
    value?: string,
    checked?: boolean,
    icon: string,
    messageCorrect: string,
    messageError: string,
    event?: (e:React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Input(props: Props) {

    //PEGA A REFERÊNCIA A ELEMENTOS 
    const passwordInputVisible = useRef<HTMLInputElement>(null)
    const label = useRef<HTMLLabelElement>(null) 
    const message = useRef<HTMLParagraphElement>(null) 
    const span = useRef<HTMLSpanElement>(null) 
    const spanOne = useRef<HTMLSpanElement>(null)

    //UTILIZAÇÃO DO HOOK useState
    const [placeholderText, setPlaceholderText] = useState<string>(props.placeholder)

    //FUNÇÃO RESPONSÁVEL POR TROCAR TEXTO DO PLACEHOLDER DEPENDENDO DO TAMANHO DA JANELA
    const updatePlaceholder = () => {
        //VERIFICA SE O TAMANHO DA JANELA ATUAL É MENOR QUE 1024
        if(window.innerWidth < 1024){
            //TROCA O TEXTO DO PLACEHOLDER
            setPlaceholderText(props.placeholder)
            if(passwordInputVisible.current){
                passwordInputVisible.current.style.borderStyle = `solid`
                passwordInputVisible.current.style.borderWidth = `1px`
            }
        }else{
            //TROCA O TEXTO DO PLACEHOLDER
            setPlaceholderText(props.placeholderLarge)
            if(passwordInputVisible.current){
                passwordInputVisible.current.style.border = `none`
                passwordInputVisible.current.style.borderBottomStyle = `solid`
                passwordInputVisible.current.style.borderBottomWidth = `1px`
            }
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É CARREGADA
    useEffect(() => {
        //CHAMA A FUNÇÃO QUE TROCA O TEXTO
        updatePlaceholder()

        //ADICIONA UM EVENTO DE REDIMENSIONAMENTO DE TELA NA JANELA
        window.addEventListener('resize', updatePlaceholder)

        //REMOVE O EVENTO DE REDIMENSIONAR A TELA DA JANELA AO FECHAR O COMPONENTE
        return () => window.removeEventListener('resize', updatePlaceholder)
    },[])

    useEffect(() => {
        setRandomNumber(getRandomNumber(0, 10000))
    },[])
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, sucessColor, errorColor } = states

    //UTILIZA O HOOK useState
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [randomNumber, setRandomNumber] = useState<number>(0)

    //FUNÇÃO QUE VERIFICA SE O CAMPO ESTÁ DENTRO DO PADRÃO
    function handleValidatePassword() {

        //VÊ SE O VALOR DO INPUT EXISTE
        if(props.value){
            //VERIFICA SE O VALOR DO INPUT ESTÁ NO PADRÃO DA REGEX padraoPasswors
            if(props.checked == true){
                //PEGA AS REFERÊNCIAS ATUAIS DOS ELEMENTOS
                if(passwordInputVisible.current && label.current && message.current && span.current && spanOne.current){
                    //MUDA O ESTILO COMO CORES DE LETRAS, ICONES E BORDAS DOS RESPECTIVOS ELEMENTOS 
                    if(placeholderText == props.placeholderLarge){
                        passwordInputVisible.current.style.borderBottom = `1px solid ${sucessColor}`
                    }else{
                        passwordInputVisible.current.style.border = `1px solid ${sucessColor}`
                    }
                    label.current.style.color = `${sucessColor}`
                    passwordInputVisible.current.style.color = `${sucessColor}`
                    message.current.style.color = `${sucessColor}`
                    span.current.style.color = `${sucessColor}`
                    spanOne.current.style.color = `${sucessColor}`
                    
                    //MUDA A OPACIDADE DA MENSAGEM PARA
                    message.current.style.opacity = `100%`

                    //DEIXA O PADÃO DO TEXTO COM A PRIMEIRA LETRA EM CAIXA ALTA
                    message.current.style.textTransform = 'capitalize'
                    
                    //ALTERA O TEXTO DA MENSAGEM
                    message.current.innerText = props.messageCorrect
                }
                //VERIFICA SE O VALOR DO INPUT NÃO ESTÁ NO PADRÃO DA REGEX padraoEmail
            }else{
                //PEGA AS REFERÊNCIAS ATUAIS DOS ELEMENTOS
                if(passwordInputVisible.current && label.current && message.current && span.current && spanOne.current){
                    //MUDA O ESTILO COMO CORES DE LETRAS, ICONES E BORDAS DOS RESPECTIVOS ELEMENTOS 
                    if(placeholderText == props.placeholderLarge){
                        passwordInputVisible.current.style.borderBottom = `1px solid ${errorColor}`
                    }else{
                        passwordInputVisible.current.style.border = `1px solid ${errorColor}`
                    }
                    label.current.style.color = `${errorColor}`
                    passwordInputVisible.current.style.color = `${errorColor}`
                    message.current.style.color = `${errorColor}`
                    span.current.style.color = `${errorColor}`
                    spanOne.current.style.color = `${errorColor}`
                    
                    //MUDA A OPACIDADE DA MENSAGEM PARA
                    message.current.style.opacity = `100%`

                    //DEIXA O PADÃO DO TEXTO COM A PRIMEIRA LETRA EM CAIXA ALTA
                    message.current.style.textTransform = 'capitalize'

                    //ALTERA O TEXTO DA MENSAGEM
                    message.current.innerText = props.messageError
                }
            }
        }
    }

    //FUNÇÃO RESPONSÁVEL POR TROCAR O TIPO DO INPUT
    function toggleIsVisiblePassword() {
        //VERIFICA O ESTADO REFERENCIADO 
        if(passwordInputVisible.current) {

            //VÊ SE O ESTADO isVisible É IGUAL false E TROCA O TIPO DO INPUT PARA text
            if(isVisible == false){
                passwordInputVisible.current.type = 'text'
            }else{
                //VÊ SE O ESTADO isVisible É IGUAL true E TROCA O TIPO DO INPUT PARA password
                passwordInputVisible.current.type = 'password'
            }

            //TROCA O ESTADO isVisible PARA true SE ELE FOR IGUAL A false OU PARA false SE ELE FOR IGUAL A true
            setIsVisible(!isVisible)
        }
    }

    //FUNÇÃO RESPONSÁVEL POR GERAR NÚMERO ALEATÓRIO 
    function getRandomNumber(min: number, max:number){
        const numberMin = Math.ceil(min)
        const numberMax = Math.floor(max)

        return Math.floor(Math.random() * (numberMax - numberMin + 1)) + numberMin
    }

    useEffect(() => {
        handleValidatePassword()
    },[props.value, props.checked])

    return(
        <div className="w-[90%] sm:w-[60%] relative">
            <label
                ref={label}
                className={`
                    w-full
                    text-[20px]
                    ms-2
                    mb-2
                    lg:hidden
                    cursor-pointer
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                `}
                htmlFor={`input-${randomNumber}`}
            >
                {props.text}
            </label>

            <div
                className={`
                    w-full relative flex justify-center items-start flex-col mb-5
                `}
            >
                <span
                    ref={span}
                    className={`
                    absolute
                    ms-2
                    left-0
                    text-[24px]
                    lg:hidden
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}
                >
                    {props.icon == 'password' && (<MdOutlineLock />)}
                    {props.icon == 'email' && (<MdOutlineEmail />)}
                    {props.icon == 'person' && (<MdOutlinePerson />)}
                    {props.icon == 'code' && (<MdOutlinePhoneIphone />)}
                </span>

                <span
                    ref={spanOne}
                    className={`
                    absolute
                    me-2
                    right-0
                    text-[24px]
                    cursor-pointer
                    hover:scale-[1.1]
                    transition-all
                    duration-[.3s]
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}
                    onClick={() => toggleIsVisiblePassword()}
                >
                    {props.hidden && props.hidden == true && (
                        <>
                            {isVisible == true ? (
                                <IoEyeOutline />
                            ):(
                                <IoEyeOffOutline />
                            )}
                        </>
                    )}
                </span>

                <InputMask
                    mask={props.mask}
                    onChange={props.event && props.event}
                    onBlur={handleValidatePassword}
                    value={props.value && props.value}
                    placeholder={placeholderText}
                >
                    <input
                        id={`input-${randomNumber}`}
                        autoComplete='oio'
                        type={`${props.hidden == true ? 'password' : 'text'}`}
                        ref={passwordInputVisible}
                        className={`
                        w-full
                        text-[20px]
                        rounded-[16px]
                        lg:rounded-[0px]
                        ps-[40px]
                        lg:ps-[0px]
                        py-3
                        border
                        lg:border-t-[0px]
                        lg:border-s-[0px]
                        lg:border-e-[0px]
                        ${theme == 'light'
                        ? 'text-my-gray placeholder-my-gray border-my-gray bg-my-white'
                        : 'text-my-gray-black placeholder-my-gray-black border-my-gray-black bg-my-black'
                        }
                        focus:outline-none
                        `}
                    />
            </InputMask>
            </div>
            <p ref={message} className={`w-full ps-2 opacity-0 absolute bottom-[-3%]`}>oioioi</p>
        </div>
    )
}