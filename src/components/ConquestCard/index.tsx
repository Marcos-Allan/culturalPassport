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
import { useState, useEffect } from 'react';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

// TIPAGEM DAS PROPRIEDADES DO COMPONENTE
interface Props {
    level: number;
    porcentage: number;
    title: string;
    message: string;
    backImg: string;
}

export default function ConquestCard(props: Props) {

    // RESGATA AS VARIÁVEIS GLOBAIS
    const states: any = useMyContext();

    // DESESTRUTURA AS VARIÁVEIS ESPECIFICADAS
    const { theme, userS } = states;

    // ESTADO PARA ARMAZENAR SE A CONQUISTA FOI ALCANÇADA
    const [achievement, setAchievement] = useState<boolean>(false);

    // FUNÇÃO PARA VERIFICAR SE A CONQUISTA EXISTE
    const checkAchievement = (param: string) => {
        
        console.log(userS)

        //VERIFICA SE O USUÁRIO E AS CONQUISTAS DELE JÁ FORAM CARREGADOS
        if (!userS || !userS.simulations) {
            console.error("Dados de usuário ou simulações não estão disponíveis");
            return false;
        }

        //VERIFICA SE A CONQUISTA EXISTE NO BD
        const hasAchievement = userS.simulations.some((item: any) => item.name === param);
        console.log(`Verificando conquista: ${param} - Resultado: ${hasAchievement}`);
        
        //RETORNA A CONQUISTA PARA PODER COLOCAR NO BD DO USUÁRIO
        return hasAchievement;
    };

    // FUNÇÃO RESPONSÁVEL POR RENDERIZAR AS BARRAS DE LEVEL
    function renderLevel(quantity: number) {
        //INICIA UM ARRAY VAZIO
        const level = [];

        //FAZ UM LOOP PARA CLONAR O CONTEÚDO USANDO O NÚMERO PASSADO POR PARÂMETRO
        for (let i = 0; i < quantity; i++) {
            level.push(
                <div
                    key={i}
                    className="h-[10px] flex-grow-[1] rounded-[2px] bg-my-white-opacity"
                />
            );
        }
        return level;
    }

    // useEffect para monitorar mudanças em userS e props.title
    useEffect(() => {
        setAchievement(checkAchievement(props.title));
    }, [userS, props.title]);

    return (
        <div
            className={`w-[90%] sm:w-[60%] my-2 p-3 border-2 border-solid flex min-h-[180px] gap-[6px] rounded-[8px] transition-all duration-[.2s] ${
                achievement ? 'animate-colorChange' : theme === 'light' ? 'border-my-secondary' : 'border-my-quartenary'
            }`}
        >
            {/* ${props.title == "No caminho certo" && userS.simulationsConcludeds == 1 ? '' : 'grayscale(100%)'} */}
            <div
                style={{
                    backgroundImage: `url('${props.backImg}')`,
                    filter: `${achievement ? '' : 'grayscale(100%)'}`,
                }}
                className="bg-cover bg-center h-full min-w-[40%] flex flex-row p-2 items-end gap-1 rounded-[5px]"
            >
                {/* CHAMA A FUNÇÃO QUE RENDERIZA OS LEVELS DEPENDENDO DA QUANTIDADE ESPECIFICADA */}
                {renderLevel(props.level)}
            </div>

            <div className="flex-grow-[1] flex flex-col h-full justify-between bg-transparent p-2 rounded-[5px]">
                <div>
                    <h1
                        className={`font-bold text-[17px] ${
                            theme === 'light' ? 'text-my-black' : 'text-my-white'
                        }`}
                    >
                        {props.title}
                    </h1>

                    <p
                        className={`text-[15px] ${
                            theme === 'light' ? 'text-my-gray' : 'text-my-gray-black'
                        }`}
                    >
                        {props.message}
                    </p>
                </div>

                <div className="w-full flex flex-row justify-between items-center">
                    <div
                        className={`align-bottom w-[80%] h-[10px] ${
                            theme === 'light' ? 'bg-my-gray' : 'bg-my-gray-black'
                        }`}
                    >
                        {/* ${props.title == "No caminho certo" && userS.simulationsConcludeds == 1 ? 100 : Number(props.porcentage)}% */}
                        <div
                            style={{
                                width: `${achievement ? 100 : Number(props.porcentage)}%`,
                            }}
                            className={`h-full ${
                                theme === 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'
                            }`}
                        ></div>
                    </div>

                    {/* ${props.title == "No caminho certo" && userS.simulationsConcludeds == 1 ? 100 : props.porcentage} */}
                    <p
                        className={`text-[14px] ${
                            theme === 'light' ? 'text-my-gray' : 'text-my-gray-black'
                        }`}
                    >
                        {achievement ? 100 : props.porcentage}%
                    </p>
                </div>
            </div>
        </div>
    );
}
