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

//TIPAGENS DAS PROPS DO COMPONENTE
interface Props {
    msg: any,
}

//IMPORTAÇÃO DOS ICONES
import { FaStar } from "react-icons/fa";

export default function FeedbackCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    const RenderStars = (count: number) => {
        return (
            <div className={`flex flex-row gap-1 mr-2`}>
                {Array(count).fill(<FaStar className='text-[#4882fe] text-[14px]' />)}
            </div>
        );
    };

    return(
        <>
            {props.msg.userID != userS.id ? (
                <div
                    key={Math.random() * 999999999999}   
                    className={`p-1 w-full rounded-[10px]`}
                >
                    <div className={`flex flex-col justify-between items-start gap-2 p-1`}>
                        <div className={`flex flex-row items-center gap-2`}>
                            <img src={props.msg.userImg} className='w-6 h-6 rounded-[50%]' />
                            <p
                                className={`font-black text-[16px] my-2 text-my-secondary`}
                            >
                                {props.msg.name}
                            </p>
                        </div>
                        <p className={`flex ps-1 flex-row items-center gap-1  text-[16px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>
                            {RenderStars(props.msg.raiting)}

                            {props.msg.data}
                        </p>
                    </div>
                    
                    <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'} my-1 mx-3`}>{props.msg.message}</p>
                </div> 
            ):(
                <div className={`p-1 w-full rounded-[10px]`}>
                    <div className={`flex flex-col justify-between items-start gap-2 p-1`}>
                        <div className={`flex flex-row items-center gap-2`}>
                            <img src={userS.img} className='w-6 h-6 rounded-[50%]' />
                            <p
                                className={`text-my-quartenary font-black text-[16px] my-2`}
                            >
                                {userS.name}
                            </p>
                        </div>

                        <p className={`flex ps-1 flex-row items-center gap-1  text-[16px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>
                            {RenderStars(props.msg.raiting)}

                            {props.msg.data}
                        </p>
                    </div>
                    
                    <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'} my-1 mx-3`}>{props.msg.message}</p>
                </div>
            )}
        </>
    )
}