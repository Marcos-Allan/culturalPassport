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
import { useNavigate } from 'react-router-dom';

// Tipagem das props do componente
interface Props {
    ind: number;
    user: any;
}

export default function RankingCard(props: Props) {
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO ENTRE PÁGINAS DO react-router-dom
    const navigate = useNavigate()

    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA
    const propsStyle:any = useSpring({
        opacity: 1,
        transform: 'translateX(0px)',
        from: { transform: `${props.ind % 2 == 0 ? 'translateX(-100vw)' :  'translateX(100vw)'}`},
        config: { tension: 0, friction: 0 },
        delay: Number(Number(props.ind) + 1)* 50
    });

    return (
        <animated.div
            onClick={() => navigate(`/ranking/user/${props.user.email}`)}
            className={`
                w-[95%] flex justify-between items-center mb-2 text-my-white
                ${props.ind === 0 && 'bg-my-quartenary'}
                ${props.ind === 1 && 'bg-my-quintenary'}
                ${props.ind === 2 && 'bg-my-secondary'}
                ${props.ind >= 3 && 'bg-my-gray'}
                px-4 rounded-[6px] py-2 transition-all
            `}
            style={propsStyle} 
        >
            <div className="flex items-center justify-start gap-1">
                <p className="mr-3">{props.ind + 1}°</p>
                <img
                    src={props.user.img}
                    className={`w-[80px] h-[80px] rounded-[50%] border-[6px] ${props.ind === 0 ? 'border-transparent' : 'border-transparent'}`}
                />
                <p>{props.user.name}</p>
            </div>
            <p>{props.user.simulationsConcludeds}</p>
        </animated.div>
    );
}
