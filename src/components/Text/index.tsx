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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string,
    position?: string
}

export default function Text(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <SkeletonTheme baseColor={`${theme == 'light' ? '#818181bb' : '#c0c0c0bb'}`} highlightColor={`#ffffffbb`}>
            <p
                className={`
                    w-[90%] sm:w-[60%] my-3 sm:my-1 text-[22px] sm:text-[20px] lg:text-[24px]
                    ${props.position && props.position == 'left' && 'text-left'}
                    ${props.position && props.position == 'right' && 'text-right'}
                    ${!props.position && 'text-center'}
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                `}
            >
                {props.text || <Skeleton count={5} />}
            </p>
        </SkeletonTheme>
    )
}