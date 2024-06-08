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
import { useState } from "react";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS ICONES
import { IoChevronDownOutline } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";

export default function PersonType() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //UTILIZA O HOOK useState
    const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false)
    const [personType, setPersonType] = useState<string>('')

    //FUNÇÃO QUE ABRE OU FECHA AS OPÇÕES DE ESCOLHA
    function toggleIsTypeOpen() {
        //TROCA DE true PARA false OU false PARA true
        setIsTypeOpen(!isTypeOpen)
    }

    //FUNÇÃO RESPONSÁVEL POR DEIXAR TODAS AS INICIAIS DE UMA PALAVRA EM MAIUSCULAS E O RESTANTE EM MINUSCULAS
    function capitalizeText(text:string) {
        return text.replace(/\b\w/g, function(letter) {
            return letter.toUpperCase();
        })
    }

    return(
        <div className="my-5 sm:my-3 w-full sm:w-[66.6%] flex flex-col items-center">
            <div 
                className={`
                    relative
                    flex
                    items-center
                    w-[90%]
                    border
                    p-3
                    ps-4
                    rounded-[16px]
                    ${theme == 'light'
                    ? 'border-my-gray'
                    : 'border-my-gray-black'}
                `}
                onClick={() => toggleIsTypeOpen()}
            >
                {personType == '' ?(
                    <>
                        <p
                            className={`
                                text-[20px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        >Entrar como</p>

                        <IoChevronDownOutline
                            className={`
                                transition-all
                                duration-[350ms]
                                ${isTypeOpen == false ? 'rotate-[0deg]' : 'rotate-[180deg]'}
                                absolute right-0 me-2
                                text-[24px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                    </>
                ):(
                    <>
                        <p
                            className={`
                                text-[20px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        >{capitalizeText(personType)}</p>
                        {personType == 'aluno' && (
                            <PiStudent
                                className={`
                                absolute right-0 me-3
                                text-[38px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                                `}
                            />
                        )}

                        {personType == 'professor' && (
                            <GiTeacher
                                className={`
                                absolute right-0 me-3
                                text-[38px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                                `}
                            />
                        )}
                    </>
                )}
                
            </div>

            {isTypeOpen !== false && (
                <>
                    <div
                        className={`
                            relative
                            w-[90%]
                            flex
                            items-center
                            justify-start
                            border
                            text-[20px]
                            p-3
                            ps-[60px]
                            mt-3
                            rounded-[16px]
                            ${theme == 'light'
                            ? 'border-my-gray text-my-gray'
                            : 'border-my-gray-black text-my-gray-black'}
                        `}
                        onClick={() => {
                            setIsTypeOpen(false)
                            setPersonType('professor')
                        }}
                    >
                        Professor
                        <GiTeacher
                            className={`absolute left-0 text-[38px] ms-3`}
                        />
                    </div>
                    
                    <div
                        className={`
                        relative
                        w-[90%]
                        flex
                        mb-6
                        items-center
                        justify-start
                        border
                        text-[20px]
                        p-3
                        ps-[60px]
                        mt-3
                        rounded-[16px]
                        ${theme == 'light'
                        ? 'border-my-gray text-my-gray'
                        : 'border-my-gray-black text-my-gray-black'}
                            `}
                        onClick={() => {
                            setIsTypeOpen(false)
                            setPersonType('aluno')
                        }}
                    >
                        Aluno
                        <PiStudent
                            className={`absolute left-0 text-[38px] ms-3`}
                        />
                    </div>
                </>
            )}
        </div>
    )   
}