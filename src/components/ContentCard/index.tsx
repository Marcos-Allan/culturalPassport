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
import { useSpring, animated } from '@react-spring/web';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    background: number,
    title: string,
    key: number,
    ind: number,
    event?: () => void,
}

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function ContentCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA
    const propsStyle:any = useSpring({
        opacity: 1,
        transform: 'translateX(0px)',
        from: { transform: `${props.ind % 2 == 0 ? 'translateX(-100vw)' :  'translateX(100vw)'}`},
        config: { tension: 0, friction: 0 },
        delay: Number(Number(props.ind) + 1)* 50
    });

    return(
        <animated.div
            onClick={() => {
                props.event && props.event()
            }}
            className={`
                w-full mb-4 flex justify-center rounded-[24px] py-4 hover:scale-[0.9] lg:hover:scale-[0.9] transition-all duration-[.3s] cursor-pointer border-[2px]
                ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}
                ${props.background == 0 || props.background == 4 || props.background == 8 || props.background == 12 ? 'border-[#5A94F2] text-[#5A94F2]' : ''}
                ${props.background == 1 || props.background == 5 || props.background == 9 || props.background == 13 ? 'border-[#8D46DC] text-[#8D46DC]' : ''}
                ${props.background == 2 || props.background == 6 || props.background == 10 || props.background == 14 ? 'border-[#4882FE] text-[#4882FE]' : ''}
                ${props.background == 3 || props.background == 7 || props.background == 11 || props.background == 15 ? 'border-[#20DB48] text-[#20DB48]' : ''}
            `}
            style={propsStyle}
        >
            <p className={`capitalize font-semibold text-[18px] text-center`}>{props.title}</p>
        </animated.div>
    )
}