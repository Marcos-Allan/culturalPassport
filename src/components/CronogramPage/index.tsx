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

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DOS ICONES
import {  IoArrowForward } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";

export default function CronogramPage() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, userS, isCronogram, toggleCronogram } = states

    //UTILIZAÇÃO DO HOOK useState
    const [matters, setMatters] = useState<any[]>([])
    const [cronogram, setCronogram] = useState<any[]>([])

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {

        //DEFINE O ARRAY COM AS MATÉRIAS
        setMatters([
            { matter: 'fisíca', id: 'inputFis' },
            { matter: 'história', id: 'inputHis' },
            { matter: 'inglês', id: 'inputIng' },
            { matter: 'geografia', id: 'inputGeo' },
            { matter: 'artes', id: 'inputArt' },
            { matter: 'português', id: 'inputPor' },
            { matter: 'química', id: 'inputQui' },
            { matter: 'biologia', id: 'inputBio' },
            { matter: 'matemática', id: 'inputMat' },
        ])
    },[])

    //FUNÇÃO QUE REMOVE OU TIRA A MATÉRIA DO CRONOGRAMA
    function setCro(matter:string) {
        setCronogram((items) => {
            if(items.includes(matter)) {
                return items.filter((item) => item !== matter)
            }else {
                return [...items, matter]
            }
        })
    }

    //FUNÇÃO PARA VER SE O ITEM JÁ ESTÁ NO CRONOGRAMA
    function isInCronogram(matter:string){
        return cronogram.includes(matter)
    }

    return(
        <>
            {userS.logged === true && isCronogram == false && (
                <div className={`
                    absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center
                    ${theme == 'light' ? 'bg-my-black-opacity' : 'bg-my-white-opacity'}
                `}>
                    <h1 className={`w-[90%] text-center text-[20px] font-medium mb-[14px] ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>Olá <span className={`font-bold ${theme == 'light' ? 'text-my-quartenary' : 'text-my-secondary'}`}>{userS.name}</span>, defina seu cronograma de estudos</h1>

                    <div className={`relative flex flex-row w-[90%] sm:w-[70%] lg:w-[50%] h-[240px] rounded-[8px] ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'} border-4 ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}>
                        <div
                            className={`flex-grow-[1] p-2 rounded-[8px] ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}
                        >
                            {matters.map((mat) => (
                                <div className={``}>
                                    <p className={`capitalize cursor-pointer hover:underline transition-all duration-[.3s]
                                        ${isInCronogram(mat.matter) == true
                                            ? `font-bold ${theme == 'light' ? 'text-my-secondary' : 'font-black text-my-quartenary'}`
                                            : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}
                                        `}
                                        onClick={() => setCro(mat.matter)}
                                    >
                                        {mat.matter}
                                    </p>
                                </div>
                            ))}

                        </div>
                        <div className={`${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'} h-full w-4/12 p-2`}>
                            {cronogram.length > 0 ? cronogram.map((mat, i) => (
                                <p className={`font-bold ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`} onClick={() => setCro(mat)}>{i+1} - <span className='capitalize cursor-pointer hover:underline transition-all duration-[.3s]'>{mat}</span></p>
                            )):(
                                <p className={`text-center font-bold ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`} >Defina o seu cronograma</p>
                            )}
                        </div>
                        {cronogram.length > 8 ? (
                         <IoArrowForward
                             onClick={() => toggleCronogram(true)}
                             className={`
                             absolute right-[0%] top-[0%] text-[20px] m-1 hover:scale-[1.2] transition-all duration-[.2s] cursor-pointer
                                 ${theme == 'light'
                                 ? 'text-my-white'
                                 : 'text-my-black'
                                 }
                             `}
                         />
                         ):(
                            <IoMdTrash
                                onClick={() => setCronogram([])}
                                className={`
                                absolute right-[0%] top-[0%] text-[20px] m-1 hover:scale-[1.2] transition-all duration-[.2s] cursor-pointer
                                    ${theme == 'light'
                                    ? 'text-my-white'
                                    : 'text-my-black'
                                    }
                                `}
                            />

                        )}
                    </div>
                </div>
            )}
        </>
    )
}