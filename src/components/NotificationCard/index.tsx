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

//IMPORTAÇÃO DOS ICONES
import { IoIosNotificationsOutline, IoIosCloseCircle } from "react-icons/io"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//TIPAGEM DAS PROPS DAS NOTIFICAÇÕES
interface Props {
    materia: string,
    content: string,
    event?: () => any
}

export default function NotificationCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <div className={`w-[95%] flex flex-row items-center justify-between p-2 rounded-[6px] border-2 ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'}`}>
            
            <div className={`flex flex-row justify-start items-center truncate w-[35%] me-3`}>
                <IoIosNotificationsOutline className={`text-my-secondary text-[38px]`} />
                <p className={`truncate capitalize text-[12px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.materia}</p>
            </div>

            <div className={`flex justify-start items-center w-[65%]`}>
                <div className={`w-[18px] h-[18px] rounded-[50%] me-2 ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'}`}></div>
                <p className={`truncate capitalize text-left text-[14px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.content}</p>
            </div>

            <IoIosCloseCircle className={`text-my-secondary text-[38px] cursor-pointer hover:text-[#ff2424] hover:scale-[1.2] transition-all duration-[.2s] hover:rotate-180`}
                onClick={() => {
                    props.event && props.event()
                }}
            />
        </div>
    )
}5