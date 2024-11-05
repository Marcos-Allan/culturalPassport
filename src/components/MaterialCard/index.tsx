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
import { useSpring, animated } from '@react-spring/web';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//TIPAGEM DAS PROPRIEDADES DO COMPONENTE
interface Props {
    background: Number,
    titleMateria: String,
}

//IMPORTAÇÃO DAS IMAGENS
import img1 from '../../assets/imgs/icons/physics.png'
import img2 from '../../assets/imgs/icons/history.png'
import img3 from '../../assets/imgs/icons/english.png'
import img4 from '../../assets/imgs/icons/geography.png'
import img5 from '../../assets/imgs/icons/art.png'
import img6 from '../../assets/imgs/icons/portuguese.png'
import img7 from '../../assets/imgs/icons/chemistry.png'
import img8 from '../../assets/imgs/icons/biology.png'
import img9 from '../../assets/imgs/icons/mathmatics.png'
import img10 from '../../assets/imgs/icons/sociology.png'
import img11 from '../../assets/imgs/icons/philosophy.png'
import img12 from '../../assets/imgs/icons/spanish.png'

export default function MaterialCard(props: Props) {
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states
    
    //USO DO HOOK useState
    const [image, setImage] = useState<any>()
    const [colors, setColors] = useState<String[]>([
        '#5A94F2',
        '#8D46DC',
        '#4882FE',
        '#20DB48',
        '#5A94F2',
        '#8D46DC',
        '#4882FE',
        '#20DB48',
        '#5A94F2',
        '#8D46DC',
        '#4882FE',
    ])

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //COLOCA UMA NOVA COR NO ARRAY DE CORES
        setColors((colors) => [...colors, '#20DB48'])

        //FUNÇÃO QUE PEGA A IMAGEM DA MATÉRIA
        switch (props.background) {
            case 0:
                setImage(img1)
            break;
                
            case 1:
                setImage(img2) 
            break;
            
            case 2:
                setImage(img3) 
            break;
            
            case 3:
                setImage(img4) 
            break;
            
            case 4:
                setImage(img5) 
            break;
            
            case 5:
                setImage(img6) 
            break;
            
            case 6:
                setImage(img7)
            break;
                
            case 7:
                setImage(img8) 
            break;
            
            case 8:
                setImage(img9) 
            break;
            
            case 9:
                setImage(img10) 
            break;
            
            case 10:
                setImage(img11) 
            break;
            
            case 11:
                setImage(img12) 
            break;
        
            default:
                break;
        }
    },[])

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA
    const propsStyle:any = useSpring({
        opacity: 1,
        transform: 'translateY(0px)',
        from: { transform: 'translateY(100vh)' },
        config: { tension: 0, friction: 0 },
        delay: Number(Number(props.background) + 1) * 250
    });
    
    return(
        <animated.div
            className={`relative mt-[20px] mx-2 w-5/12 sm:w-3/12 sm:mt-[10px] sm:mx-1 flex flex-col items-center justify-start rounded-[8px] border-[3px] hover:scale-[0.9] lg:hover:scale-[0.9] cursor-pointer transition-all duration-[.2s]`}
            style={{ borderColor: `${colors[Number(props.background)]}`, ...propsStyle }}
            onClick={() => navigate(`/materias/${props.titleMateria.toLowerCase()}`)}
        >
            <div className={`w-full flex items-center justify-center p-8`} style={{ backgroundColor: `${colors[Number(props.background)]}` }}>
                <img src={image} alt="" className={`w-[90px]`} />
            </div>
            <p
                className={`flex items-center justify-center w-full h-full text-[22px] sm:text-[18px] font-semibold capitalize text-center rounded-b-[6px] py-2 ${theme == 'light' ? 'bg-my-white' : 'bg-my-black' }`}
                style={{ color: `${colors[Number(props.background)]}` }}
            >{props.titleMateria}</p>
            
        </animated.div>
    )
}