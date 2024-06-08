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

//IMPORTAÇÃO DAS BIBLIOECAS
import { useRef } from 'react'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DOS ICONES
import { MdOutlineEmail } from "react-icons/md";

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    value?: string,
    checked?: boolean,
    event?: (e:React.ChangeEvent<HTMLInputElement>) => void,
}

export default function EmailInput(props: Props) {
    
    //PEGA A REFERÊNCIA A ELEMENTOS 
    const input = useRef<HTMLInputElement>(null)
    const label = useRef<HTMLLabelElement>(null) 
    const message = useRef<HTMLParagraphElement>(null) 
    const span = useRef<HTMLSpanElement>(null) 

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //FUNÇÃO QUE VERIFICA SE O CAMPO ESTÁ DENTRO DO PADRÃO
    function handleValidateEmail() {

        //VÊ SE O VALOR DO INPUT EXISTE
        if(props.value){
            //VERIFICA SE O VALOR DO INPUT ESTÁ NO PADRÃO DA REGEX
            if(props.checked == true){
                //PEGA AS REFERÊNCIAS ATUAIS DOS ELEMENTOS
                if(input.current && label.current && message.current && span.current){
                    //MUDA O ESTILO COMO CORES DE LETRAS, ICONES E BORDAS DOS RESPECTIVOS ELEMENTOS 
                    input.current.style.border = `1px solid #00ff00`
                    label.current.style.color = `#00ff00`
                    input.current.style.color = `#00ff00`
                    message.current.style.color = `#00ff00`
                    span.current.style.color = `#00ff00`
                    
                    //MUDA A OPACIDADE DA MENSAGEM PARA
                    message.current.style.opacity = `100%`
                    
                    //ALTERA O TEXTO DA MENSAGEM
                    message.current.innerText = `Email dentro do padrão`
                }
                //VERIFICA SE O VALOR DO INPUT NÃO ESTÁ NO PADRÃO DA REGEX padraoEmail
            }else{
                //PEGA AS REFERÊNCIAS ATUAIS DOS ELEMENTOS
                if(input.current && label.current && message.current && span.current){
                    //MUDA O ESTILO COMO CORES DE LETRAS, ICONES E BORDAS DOS RESPECTIVOS ELEMENTOS 
                    input.current.style.border = `1px solid #ff0000`
                    label.current.style.color = `#ff0000`
                    input.current.style.color = `#ff0000`
                    message.current.style.color = `#ff0000`
                    span.current.style.color = `#ff0000`
                    
                    //MUDA A OPACIDADE DA MENSAGEM PARA
                    message.current.style.opacity = `100%`
                    
                    //ALTERA O TEXTO DA MENSAGEM
                    message.current.innerText = `Email fora do padrão`
                }
            }
        }
    }

    return(
        <div className="w-[90%] sm:w-[60%] relative mb-1">
            {/* INPUT DE EMAIL */}
            <label
            ref={label}
            className={`
                w-full
                text-[20px]
                ms-2
                mb-2
                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
            `}
            htmlFor="emailInput"
        >
            Email
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
                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}    
            `}>
                <MdOutlineEmail/>
            </span>

            <input
                ref={input}
                onChange={props.event && props.event}
                id="emailInput"
                // type="email"
                value={props.value && props.value}
                onBlur={handleValidateEmail}
                placeholder="Digite seu endereço de email"
                className={`
                    w-full
                    text-[20px]
                    rounded-[16px]
                    ps-[40px]
                    py-3
                    border
                    ${theme == 'light'
                    ? 'text-my-gray placeholder-my-gray border-my-gray bg-my-white'
                    : 'text-my-gray-black placeholder-my-gray-black border-my-gray-black bg-my-black'
                    }
                    focus:outline-none
                `}
            />
        </div>
        <p ref={message} className={`w-full opacity-0 ps-2 absolute bottom-[-3%]`}>oioioi</p>
    </div>
    )
}