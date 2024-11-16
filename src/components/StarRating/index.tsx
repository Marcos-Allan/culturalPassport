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

//IMPORTAÇÃ DAS BIBLIOTECAS
import { useState } from 'react'

//IMPORTAÇÃO DOS ICONES
import { FaStar } from "react-icons/fa";

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    maxStars: number;
    onRatingSelect: (rating: number) => void;
}

export default function StarRating(props: Props) {

    //UTLIZAÇÃO DO HOOK useState
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    //FUNÇÃO RESPONSÁVEL POR PINTAR AS ESTRELAS
    function handleClick(starValue: number){
        //SETA O VALOR RECEBIDO POR PARÂMETRO
        setRating(starValue);

        //VERIFICA SE A PROP DE VALOR FOI PASSADA
        if (props.onRatingSelect) {
            //MUDA O VALOR DA PROP PELO PARÂMETRO PASSADO
            props.onRatingSelect(starValue);
        }
    }

    const handleMouseEnter = (starValue: number) => {
        //MUDA O VALOR DO HOVER DO COMPONENTE
        setHoveredRating(starValue);
    };
    
    const handleMouseLeave = () => {
        //MUDA O VALOR DO HOVER DO COMPONENTE
        setHoveredRating(0);
    };


    return(
        <div className={`flex w-full gap-2 mb-1`}>
            {Array.from({ length: props.maxStars ? props.maxStars : 0 }, (_, index) => index + 1).map(starValue => (
                <button
                    key={starValue}
                    type="button"
                    className={`cursor-pointer text-[18px] focus:outline-none ${starValue <= (hoveredRating || rating) ? 'text-[#e2ff3b]' : 'text-gray-400'}`}
                    onClick={() => handleClick(starValue)}
                    onMouseEnter={() => handleMouseEnter(starValue)}
                    onMouseLeave={handleMouseLeave}
                >
                    <FaStar />
                </button>
            ))}
        </div>
    )
}