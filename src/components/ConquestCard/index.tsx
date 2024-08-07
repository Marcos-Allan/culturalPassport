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
    backImg: string,
}

export default function ConquestCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, userS } = states

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
                    bg-my-white-opacity   
                `}/>
            )

        }

        //RETORNA O COMPONENTE A QUANTIDADE DE VEZES FORNECIDA PELA FUNÇÃO
        return level
    }

    //FUNÇÃO RESPONSÁVEL POR VER SE A CONQUISTA FOI CONCLUIDA OU NÃO
    const checkAchievement = (param:string) => {
        return userS.simulations.some((item:any) => item.name === param)
    };

    return(
        <div
            className={`w-[90%] sm:w-[60%] my-2 p-3 border-2 border-solid flex min-h-[180px] gap-[6px] rounded-[8px] transition-all duration-[.2s]
            ${checkAchievement(props.title) == true ? 'animate-colorChange' : `
                ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}
            `}
        `}>
            
            {/* ${props.title == "No caminho certo" && userS.simulationsConcludeds == 1 ? '' : 'grayscale(100%)'} */}
            <div
                style={{ backgroundImage: `url('${props.backImg}')`, filter: `
                    ${checkAchievement(props.title) == true ? '' : 'grayscale(100%)'}
                ` }}
                className={`bg-cover bg-center  h-full min-w-[40%] flex flex-row p-2 items-end gap-1 rounded-[5px]
                
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
                        {/* `${props.title == "No caminho certo" && userS.simulationsConcludeds == 1 ? 100 : Number(props.porcentage)}%` */}
                        <div
                            style={{ width: 
                                `${checkAchievement(props.title) == true ? 100 : Number(props.porcentage)}`
                             }}
                            className={`h-full
                            ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}
                        `}></div>
                    </div>
                    
                    {/* ${props.title == "No caminho certo" && userS.simulationsConcludeds == 1 ? 100 : props.porcentage} */}
                    <p
                        className={`text-[14px]
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}>{checkAchievement(props.title) == true ? 100 : props.porcentage}%</p>

                </div>

            </div>
        </div>
    )
}