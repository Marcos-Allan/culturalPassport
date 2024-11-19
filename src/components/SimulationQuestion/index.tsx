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
import { useMyContext } from "../../provider/geral"

interface Props {
    questIndex: number,
    questions: any
}

export default function SimulationQuestion(props: Props) {
    
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme } = states

    return(
        <div className={`flex flex-col items-center border-[1px] ${theme == 'light' ? 'border-my-black' : 'border-my-white'} my-2 mt-5 p-3 pt-1 rounded-[20px]`}>
            <h1 className={`text-[24px] font-medium ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.questIndex + 1} - {props.questions[props.questIndex].content}</h1>
            <div className={`w-full h-[1px] ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'} my-2 lg:hidden`}/>
            <p className={`text-[22px] h-auto ${theme == 'light' ? 'text-my-black' : 'text-my-white'} `}>{props.questions[props.questIndex].answer}</p>
        </div>
    )
}