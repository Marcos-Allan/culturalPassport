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
import { Link } from "react-router-dom"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string,
    route: string,
    event?: () => void,
    disabled?: boolean,
}

export default function Button(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        //VÊ SE A POR PROPS FOI PASSADA UMA ROTA DE NAVEGAÇÃO, SE NÃO DTERMINA A ROTA PASSADA POR PROPS
        <>
            {props.route !== 'undefined' ? (
                <Link
                    to={props.route}
                    className={`
                        rounded-[8px]
                        my-2
                        sm:my-1
                        text-center
                        p-[10px]
                        text-[24px]
                        sm:text-[18px]
                        font-medium
                        capitalize
                        w-[90%]
                        sm:w-[60%]
                        lg:w-[25%]
                        lg:rounded-[24px]
                        focus:bg-transparent
                        focus:outline-none
                        border-[2px]
                        ${theme == 'light'
                            ? 'bg-my-primary text-my-white border-my-primary focus:text-my-primary'
                            : 'bg-my-secondary text-my-black border-my-secondary focus:text-my-secondary'
                        }
                    `}
                >
                    <p
                        className="capitalize"
                    >
                        {props.text}
                    </p>
                </Link>
            ):(
                //EXECUTA A FUNÇÃO PASSADA POR PROPS
                <input
                    disabled={props.disabled}
                    type="submit"
                    onClick={() => {
                        props.event && props.event()
                    }}
                    className={`
                        w-[90%]
                        sm:w-[60%]
                        lg:w-[25%]
                        my-2
                        sm:my-1
                        rounded-[8px]
                        lg:px-14
                        lg:rounded-[24px]
                        lg:my-4
                        text-center
                        p-[10px]
                        sm:p-[6px]
                        text-[24px]
                        sm:text-[16px]
                        font-medium
                        capitalize
                        focus:bg-transparent focus:outline-none border-[2px]
                        ${theme == 'light'
                            ? 'bg-my-primary disabled:bg-my-gray text-my-white border-my-primary disabled:border-my-gray focus:text-my-primary'
                            : 'bg-my-secondary disabled:bg-my-gray-black text-my-black border-my-secondary disabled:border-my-gray-black focus:text-my-secondary'
                        }
                    `}
                    value={props.text}
                />
            )}
        </>
    )
}