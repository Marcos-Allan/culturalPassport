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

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    background: number,
    title: string,
    key: number,
    event?: () => void,
}

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function ContentCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <div
            onClick={() => {
                props.event && props.event()
            }}
            className={`w-full mb-4 flex justify-center rounded-[24px] py-4 border-2 hover:scale-[0.9] lg:hover:scale-[0.9] transition-all duration-[.3s] cursor-pointer
            ${theme == 'light' ? 'border-my-black' : 'border-my-white'}
            ${props.background == 0 || props.background == 3 || props.background == 6 || props.background == 9 ? 'bg-my-primary' : ''}
            ${props.background == 1 || props.background == 4 || props.background == 7 || props.background == 10 ? 'bg-my-secondary' : ''}
            ${props.background == 2 || props.background == 5 || props.background == 8 || props.background == 11 ? 'bg-my-terciary' : ''}
        `}>
            <p className={`capitalize font-semibold text-[18px] text-my-white text-center`}>{props.title}</p>
        </div>
    )
}