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

//IMPORTAÇÃO DAS IMAGENS
import imageLoading from '../../../public/loading.gif'

export default function LoadingPage() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const {  loading } = states

    return(
        <>
            {/* <div className={`
                fixed top-0 left-0 w-screen h-screen flex justify-center items-center transition-all duration-[.3s]
                ${loading == true ? 'opacity-1 z-[2]' : 'opacity-0 z-[-1]'}
                ${theme == 'light' ? 'bg-my-black-opacity' : 'bg-my-white-opacity'}
            `}>
                <div className={`
                    w-[80px] h-[80px] bg-my-transparent rounded-[50%] border-[6px] border-t-transparent animate-spin
                    ${theme == 'light' ? 'border-my-quartenary' : 'border-my-terciary'}
                    `}></div>
            </div> */}
            <div
                className={`
                    fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-cover bg-center transition-all duration-[.3s]
                    ${loading == true ? 'opacity-1 z-[2]' : 'opacity-0 z-[-1]'}
                    bg-[#1F6CC7]
                `}
            >
                <img src={imageLoading} className={`w-full sm:w-[50%] h-auto`} />
            </div>
        </>
    )
}