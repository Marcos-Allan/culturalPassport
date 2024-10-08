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

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    event?: () => void
    active: boolean,
    img: string
}

export default function AvatarImage(props: Props) {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme } = states

    return(
        <img
            onClick={() => {
                props.event && props.event()
                // toggleImg(1)
            }}
            className={`
                inline-block w-[90px] h-[90px] rounded-full border-2 p-1
                ${props.active == true ? `${theme == 'light' ? 'border-my-terciary translate-y-[-16px]' : 'border-my-quartenary translate-y-[-16px]'}` : `border-transparent hover:translate-y-[-16px] transition-all duration-[.3s] cursor-pointer`}
            `}
            src={props.img} alt=""
        />
    )
}