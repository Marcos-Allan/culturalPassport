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
        '#5A94F2', //0 5A94F2
        '#8D46DC', //1 8D46DC
        '#4882FE', //2 4882FE
        '#20DB48', //3 20DB48
        '#5A94F2', //4 5A94F2
        '#8D46DC', //5 8D46DC
        '#4882FE', //6 4882FE
        '#20DB48', //7 20DB48
        '#5A94F2', //8 5A94F2
        '#8D46DC', //9 8D46DC
        '#4882FE', //10 4882FE
    ])

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //COLOCA UMA NOVA COR NO ARRAY DE CORES
        setColors((colors) => [...colors, '#20DB48'])
    },[])

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()
    
    return(
        <div
            className={`relative mt-[30px] w-[90%] sm:w-3/12 h-[100px] flex items-center justify-center rounded-[8px] p-3 border-[3px] hover:scale-[0.9] lg:hover:scale-[0.9] cursor-pointer transition-all duration-[.2s]`}
            style={{ borderColor: `${colors[Number(props.background)]}` }}
            onClick={() => navigate(`/materias/${props.titleMateria.toLowerCase()}`)}
        >
            <p
                className={`text-[22px] text-my-white font-semibold capitalize text-center`}
                style={{ color: `${colors[Number(props.background)]}` }}
            >{props.titleMateria}</p>
            
        </div>
    )
}