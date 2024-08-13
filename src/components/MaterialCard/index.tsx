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
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//TIPAGEM DAS PROPRIEDADES DO COMPONENTE
interface Props {
    background: Number,
    titleMateria: String,
}

export default function MaterialCard(props: Props) {
    
    //USO DO HOOK useState
    const [colors, setColors] = useState<String[]>([
        '#52bd9b', //0
        '#c47e3d', //1
        '#e41c1c', //2
        '#f7c957', //3
        '#e843f1', //4
        '#987dd0', //5
        '#c66193', //6
        '#38da56', //7
        '#527fef', //8
        '#281b6e', //9
    ])

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //COLOCA UMA NOVA COR NO ARRAY DE CORES
        setColors((colors) => [...colors, '#40a6b0'])
    },[])

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()
    
    return(
        <div
            className={`relative mt-[30px] w-[90%] sm:w-3/12 h-[100px] rounded-[8px] p-3 hover:scale-[0.9] lg:hover:scale-[0.9] cursor-pointer transition-all duration-[.2s]`}
            style={{ backgroundColor: `${colors[Number(props.background)]}` }}
            onClick={() => navigate(`/materias/${props.titleMateria.toLowerCase()}`)}
        >
            <p className={`text-[22px] text-my-white font-semibold capitalize`}>{props.titleMateria}</p>

            <div
                className={`rounded-[50%] w-[50px] h-[50px] absolute bottom-[-12%] right-[5%] border-[3px] bg-my-white
                `}
                style={{ borderColor: `${colors[Number(props.background)]}` }}
            >
            </div>
            
        </div>
    )
}