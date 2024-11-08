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
import { useState } from 'react'

//IMPORTAÇÃO DOS ICONES
import { MdAudiotrack } from "react-icons/md"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    onClick: () => any,
    active: boolean,
    name: string
}

export default function AudioPlayer(props: Props) {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme } = states

    //UTILIZAÇÃO DO HOOK DE useState
    const [isHover, setIsHover] = useState<boolean>(false)

    return(
        <button
            onClick={() => {
                props.onClick()
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}

            className={`p-1 m-1 rounded-[50%] relative outline-none flex items-center justify-center border-none ${props.active == true ? `${theme == 'light' ? 'bg-my-quintenary' : 'bg-my-secondary'}` : `${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quintenary'}`}`}
        >
            <p className={`absolute top-[-30px] capitalize ${props.active == true ? 'block' : 'hidden'} ${theme == 'light' ? 'text-my-quintenary' : 'text-my-secondary'}`}>{props.name}</p>

            <MdAudiotrack className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'}`} />
            
            <p className={`absolute bottom-[-30px] text-center capitalize
                ${props.active !== true ? `${isHover == true ? 'opacity-1' : 'opacity-0'} ${theme == 'light' ? 'text-my-black' : 'text-my-white'}` : 'opacity-0'}
                `}>{props.name}</p>
        </button>
    )
}