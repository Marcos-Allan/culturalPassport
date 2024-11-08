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

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    i: number,
    getResultQuestion: boolean,
    alterResponse: (a:any, b:any) => any
    yourResponse: any
    quest: any,
    questIndex: any,
    setGetResultQuestion: any
}

export default function SimulationResponses(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleAlert, sucessColor } = states

    return(
        <li
            key={props.i}
            onClick={() => {
                if(props.getResultQuestion == true) {
                    toggleAlert('error', 'Não é possível alterar a sua resposta')
                    return
                }else {

                    //COLOCA AS RESPOSTAS DO USUÁRIO DENTRO DO ARRAY
                    props.alterResponse(props.quest.option, props.questIndex)
                    
                    //ESCREVE NO CONSOLE AS RESPOSTAS DO USUÁRIO
                    console.log(props.yourResponse)
                    
                    //SETA A VARIÁVEL DE ER RESULTADO PARA true
                    props.setGetResultQuestion(true)
                }
            }}
            className={`
                text-[20px] border-[1px] py-2 my-1 px-3 rounded-[40px] cursor-pointer
                ${props.quest.option == props.yourResponse[props.questIndex] ?
                    `${theme == 'light' ?'text-my-secondary border-my-secondary' : 'text-my-secondary border-my-secondary'}` :
                    ` ${theme == 'light' ?'text-my-black border-my-black' : 'text-my-white border-my-white'}`
                }
            `}
            style={{ color: props.getResultQuestion == true && props.quest.correct == true && sucessColor, borderColor: props.getResultQuestion == true && props.quest.correct == true && sucessColor }}
        >{props.quest.option}){props.quest.text}</li>
    )
}