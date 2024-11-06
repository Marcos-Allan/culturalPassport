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
import { useNavigate, useLocation } from 'react-router-dom';

//IMPORTAÇÃO DOS ICONES
import { GoHome } from "react-icons/go";
import { GrTrophy, GrTrain } from "react-icons/gr";
import { IoChatbubbleOutline, IoPersonOutline } from "react-icons/io5";
import { LuMedal } from "react-icons/lu";
import { BsGear } from "react-icons/bs";

export default function BottomNavigation() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //VERIFICA A ROTA ATUAL
    const location = useLocation();

    //FUNÇÃO RESPONSÁVEL POR VER SE A PALAVRA CONTÉM A STRING DESEJADA
    function containsWord(text:string, icon:string) {
        return text.toLowerCase().includes(icon)
    }

    return(
        <div className={`fixed bottom-0 w-full sm:px-[20%] h-[80px] px-3 bg-my-terciary flex justify-around items-center lg:h-full lg:w-[80px] lg:top-0 lg:left-0 lg:px-0 lg:flex-col`}>

            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/materias')}
            >
                <div className={`flex items-center justify-center rounded-[50%] transition-all duration-[.2s] cursor-pointer
                    ${containsWord(location.pathname, 'materias') ? 'bg-my-white text-my-terciary' : 'text-my-white hover:bg-my-white hover:text-my-terciary'}
                `}>
                    <GoHome className={`text-[36px] p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Inicio</p>
            </div>

            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/achievements')}
            >
                <div className={`flex items-center justify-center rounded-[50%] transition-all duration-[.2s] cursor-pointer
                    ${location.pathname == '/achievements' ? 'bg-my-white text-my-terciary' : 'text-my-white hover:bg-my-white hover:text-my-terciary'}`}>
                    <GrTrophy className={`text-[36px] p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Conquistas</p>
            </div>
            
            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/travels')}
            >
                <div className={`flex items-center justify-center rounded-[50%] transition-all duration-[.2s] cursor-pointer
                    ${containsWord(location.pathname, 'travels') ? 'bg-my-white text-my-terciary' : 'text-my-white hover:bg-my-white hover:text-my-terciary'}`}>
                    <GrTrain className={`text-[36px] p-[6px] `} />
                </div>
                <p className={`text-[10px] text-my-white`}>Passeios</p>
            </div>

            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/my-perfil')}
            >
                <div className={`flex items-center justify-center rounded-[50%] transition-all duration-[.2s] cursor-pointer
                ${location.pathname == '/my-perfil'  ? 'bg-my-white text-my-terciary' : 'text-my-white hover:bg-my-white hover:text-my-terciary'}`}>
                    <IoPersonOutline className={`text-[36px] p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Perfil</p>
            </div>

            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/feedback')}
            >
                <div className={`flex items-center justify-center rounded-[50%] transition-all duration-[.2s] cursor-pointer
                ${location.pathname == '/feedback'  ? 'bg-my-white text-my-terciary' : 'text-my-white hover:bg-my-white hover:text-my-terciary'}`}>
                    <IoChatbubbleOutline className={`text-[36px] p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Feedback</p>
            </div>
            
            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/ranking')}
            >
                <div className={`flex items-center justify-center rounded-[50%] transition-all duration-[.2s] cursor-pointer
                ${location.pathname == '/ranking'  ? 'bg-my-white text-my-terciary' : 'text-my-white hover:bg-my-white hover:text-my-terciary'}`}>
                    <LuMedal className={`text-[36px] p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Ranking</p>
            </div>

            <div className={`bg-my-white h-[90%] w-[1px] lg:h-[1px] lg:w-[90%] lg:mt-[-10px] lg:mb-[-20px]`} />

            <div
                className={`lg:w-full flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/configuration')}
            >
                <div className={`flex items-center justify-center rounded-[50%] transition-all duration-[.2s] cursor-pointer
                    ${containsWord(location.pathname, 'configuration') ? 'bg-my-white text-my-terciary' : 'text-my-white hover:bg-my-white hover:text-my-terciary'}
                `}>
                    <BsGear className={`text-[36px] p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Config</p>
            </div>

        </div>
    )
}