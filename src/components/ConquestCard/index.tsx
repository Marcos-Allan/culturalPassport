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

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//TIPAGEM DAS PROPRIEDADES DO COMPONENTE
interface Props {
    level: number,
    porcentage: number,
    title: string,
    message: string,
}

export default function ConquestCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //FUNÇÃO RESPONSÁVEL POR RENDERIZAR AS BARRAS DE LEVEL
    function renderLevel(quantity: number) {
        //INICIA ARRAY VAZIO
        const level = []

        //FAZ LOOP PELA QUANTIDADE FORNECIDA PELA FUNÇÃO
        for(let i = 0; i < quantity; i++) {

            //ADICIONA UM COMPONENTE NO ARRAY
            level.push(
                <div
                    key={i}
                    className={`h-[10px] flex-grow-[1] rounded-[2px]
                    ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}    
                `}/>
            )

        }

        //RETORNA O COMPONENTE A QUANTIDADE DE VEZES FORNECIDA PELA FUNÇÃO
        return level
    }

    return(
        <div
            className={`w-[90%] sm:w-[60%] my-2 p-3 border-2 flex h-[180px] gap-[6px] rounded-[8px] hover:scale-[0.92] cursor-pointer transition-all duration-[.2s]
            ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}
        `}>
            
            <div
                className={`h-full w-[40%] flex flex-row p-2 items-end gap-1 rounded-[5px]
                ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}
            `}>
                {/* CHAMA A FUNÇÃO QUE RENDERIZA OS LEVELS DEPENDENDO DA QUANTIDADE ESPECIFICADA */}
                {renderLevel(props.level)} 
            </div>

            <div className={`flex-grow-[1] flex flex-col h-full justify-between bg-transparent p-2 rounded-[5px]`}>
                
                <div>
                    <h1
                        className={`font-bold text-[17px]
                        ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                    `}>{props.title}</h1>

                    <p
                        className={`text-[15px]
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}>{props.message}</p>
                </div>
                
                <div className='w-full flex flex-row justify-between items-center'>

                    <div
                        className={`align-bottom w-[80%] h-[10px]
                        ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                    `}>
                        <div
                            className={`h-full w-[${Number(props.porcentage)}%]
                            ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}
                        `}></div>
                    </div>
                    
                    <p
                        className={`text-[14px]
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}>{props.porcentage}%</p>

                </div>

            </div>
        </div>
    )
}