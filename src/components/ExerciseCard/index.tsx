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
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS ICONES
import { BsAirplane } from 'react-icons/bs';
import { FiBook } from 'react-icons/fi';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    type: string,
    title: string,
    materia: string,
    concluded: boolean
}

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function TravelCard(props: Props) {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <div
            onClick={() => navigate(`/travels/${props.title}`)}
            className={`w-[90%] sm:w-[60%] border-2 my-2 ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'} p-3 rounded-[16px] flex items-center justify-center hover:scale-[0.92] cursor-pointer transition-all duration-[.2s]`}
        >
                
            <div className={`flex-grow-[1] flex flex-col`}>
                <h1 className={`capitalize font-bold text-[20px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.title}</h1>
                <p className={`capitalize text-[16px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}>{props.materia}</p>
            </div>

            {props.type == 'travel' ? (
                <BsAirplane className={`${props.concluded == true ? 'text-[#00ff00]' : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} text-[28px]`} />
            ) : (
                <FiBook className={`${props.concluded == true ? 'text-[#00ff00]' : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} text-[28px]`} />
            )}
        </div>
    )
}