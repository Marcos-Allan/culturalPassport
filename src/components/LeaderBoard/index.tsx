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

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    ind: number;
    user: any;
}

//IMPORTAÇÃO DAS IMAGENS
import medal_one from '../../assets/imgs/medals/gold-medal2.png'
import medal_two from '../../assets/imgs/medals/silver-medal2.png'
import medal_three from '../../assets/imgs/medals/bronze-medal2.png'

export default function LeaderBoard(props: Props) {
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO ENTRE PÁGINAS DO react-router-dom
    const navigate = useNavigate()

    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA DO 1° LUGAR
    const propsStyleFirst = useSpring({
        transform: 'translateY(0)',
        from: { transform: 'translateY(-100vh)' },
        config: { tension: 170, friction: 26 },
        delay: 100
    });
    
    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA DO 2° LUGAR
    const propsStyleSecond = useSpring({
        transform: 'translateY(0)',
        from: { transform: 'translateY(-100vh)' },
        config: { tension: 170, friction: 26 },
        delay: 300
    });
    
    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA DO 3° LUGAR
    const propsStyleThird = useSpring({
        transform: 'translateY(0)',
        from: { transform: 'translateY(-100vh)' },
        config: { tension: 170, friction: 26 },
        delay: 500
    });

    return (
        <>
            {props.ind == 0 && (
                <animated.div
                    onClick={() => navigate(`/ranking/user/${props.user.email}`)}
                    className='flex-grow-[1] h-[200px] bg-my-quartenary relative flex items-center justify-center order-1 rounded-t-[8px] transition-all cursor-pointer'
                    style={propsStyleFirst}
                >
                    <img src={medal_one} alt="" className={`absolute top-[-2px] w-[36px]`} />

                    <div className={`mt-10 absolute top-0`}>
                        <img src={props.user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transparent mb-1 `} />
                        <p className={`text-center font-bold text-my-white`}>1°</p>
                    </div>
                </animated.div>
            )}
            {props.ind == 1 && (
                <animated.div
                    onClick={() => navigate(`/ranking/user/${props.user.email}`)}
                    className='flex-grow-[1] h-[150px] bg-my-quintenary relative flex items-center justify-center order-2 rounded-tr-[8px] transition-all cursor-pointer'
                    style={propsStyleSecond}
                >

                    <img src={medal_two} alt="" className={`absolute top-[-2px] w-[36px]`} />

                    <div className={`mt-10 absolute top-0`}>
                        <img src={props.user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transparent mb-1`} />
                        <p className={`text-center font-bold text-my-white`}>2°</p>
                    </div>
                </animated.div>
            )}
            {props.ind == 2 && (
                <animated.div
                    onClick={() => navigate(`/ranking/user/${props.user.email}`)}
                    className='flex-grow-[1] h-[120px] bg-my-secondary relative flex items-center justify-center order-0 rounded-tl-[8px] transition-all cursor-pointer'
                    style={propsStyleThird}
                >

                    <img src={medal_three} alt="" className={`absolute top-[-2px] w-[36px]`} />

                    <div className={`mt-10 absolute top-0`}>
                        <img src={props.user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transparent mb-1`} />
                        <p className={`text-center font-bold text-my-white`}>3°</p>
                    </div>
                </animated.div>
            )}
        </>
    );
}
