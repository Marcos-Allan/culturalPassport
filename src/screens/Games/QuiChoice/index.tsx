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
import { useState } from 'react'
import axios from 'axios'

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../../components/Navbar";
import Return from "../../../components/Return";
import TitlePage from "../../../components/TitlePage";
import BottomNavigation from '../../../components/BottomNavigation';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../../provider/geral';

export default function QuiChoice() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [levelSelected, setLevelSelected] = useState<string>('')
    const [acertos, setAcertos] = useState<number>(0)
    const [erros, setErros] = useState<number>(0)
    const [questionsTotal, setQuestionsTotal] = useState<number>(0)
    const [question, setQuestion] = useState<any>()
    const [options, setOptions] = useState<any[]>([])

    //FUNÇÃO RESPONSÁVEL POR SELECIONAR A DIFICULDADE
    function selectLevel(level:string) {
        setLevelSelected(level)
    }

    //FUNÇÃO RESPONSÁVEL POR GERAR AS QUESTÕES
    function getQuestion() {
        console.log('pegando os dados')
        axios.get('/tb.json')
        .then(function (response) {
            console.log(response.data)

            const number = randomNumber(118)
        
            getResults(number, randomNumber(118), randomNumber(118), response.data)
            
            const type = randomNumber(3)
            
            if(type == 0){
                const result = `${response.data[number].numato}°`
                
                setQuestion(`${response.data[number].numato}°`)
                
                return result
            }else if(type == 1){
                const result = `${response.data[number].de}`
                
                setQuestion(`${response.data[number].de}`)
                
                return result
            }else{
                const result = `${response.data[number].nms}`
                
                setQuestion(`${response.data[number].nms}`)
                
                return result

            }
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR GERAR NÚMEROS ALEATÓRIOS
    function randomNumber(limit:number) {
        return Math.floor(Math.random() * limit)
    }

    //FUNÇÃO RESPONSÁVEL POR GERAR OS RESULTADOS
    function getResults(num1:number, num2:number, num3:number, datas:any) {
        
        console.log(datas)
        
        setTimeout(() => {
            const response1 = {
                isCorrect: false,
                value: datas[num3]
            }
            const response2 = {
                isCorrect: false,
                value: datas[num2]
            }
            const response3 = {
                isCorrect: true,
                value: datas[num1]
            }

            const randomNumberOptions = Math.floor(Math.random() * 3)
            if(randomNumberOptions == 0){
                setOptions([response1, response2, response3])
            }else if(randomNumberOptions == 1){
                setOptions([response1, response3, response2])
            }else{
                setOptions([response3, response1, response2])
            }  
        }, 0);
    }

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={'QuiChoice'}
                />
            </Navbar>
            
            <div className={`w-[90%] h-full sm:px-12 sm:w-[70%] mb-[200px] sm:mb-[40px] lg:mb-0 flex items-center relative flex-col overflow-y-scroll scrollbar-none overflow-x-hidden`}>
                
                
                {levelSelected == "" && (
                    <>
                        <h1 className={`mt-6 text-[28px] text-center ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Selecione uma dificuldade</h1>
                        <div className={`w-full h-full absolute top-0 flex items-center justify-center`}>
                            <div className={`flex border-[1px] w-[80%] max-w-[450px] flex-col items-center justify-center p-2 gap-2
                                ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
                            `}>
                                <button
                                    onClick={() => {
                                        selectLevel('fácil')
                                        getQuestion()
                                    }}
                                    className={`w-full text-center uppercase py-2 text-[24px] bg-my-secondary cursor-pointer`}
                                >
                                    fácil
                                </button>
                                <button
                                    onClick={() => {
                                        selectLevel('médio')
                                        getQuestion()
                                    }}
                                    className={`w-full text-center uppercase py-2 text-[24px] bg-my-quintenary cursor-pointer`}
                                >
                                    médio
                                </button>
                                <button
                                    onClick={() => {
                                        selectLevel('dificil')
                                        getQuestion()
                                    }}
                                    className={`w-full text-center uppercase py-2 text-[24px] bg-my-quartenary cursor-pointer`}
                                    >
                                    dificil
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {levelSelected !== "" && (
                    <>
                        <div className={`w-full border-[1px] flex items-center justify-center mt-5 py-10 text-[24px] font-bold rounded-[8px]`}>
                            <p className={`${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}`}>{question}</p>
                        </div>
                        <div className={`mt-2 text-[18px] uppercase w-full flex flex-row justify-between items-center flex-wrap ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>
                            <p className={`font-bold text-my-quartenary`}>acertos: {acertos}</p>
                            <p className={`font-bold text-my-secondary`}>erros: {erros}</p>
                            <p className={`font-bold text-my-quintenary`}>questões: {questionsTotal}</p>
                        </div>
                    </>
                )}

                <div className={`w-full flex flex-row items-center justify-between`}>
                    {options.length > 0 && options.map((option:any, i:number) => (
                        <button
                            key={i}
                            className={`w-[22vw] h-[22vw] sm:w-[18vw] sm:h-[18vw] border-[1px] flex items-center justify-center mt-3 text-[20px] rounded-[8px] cursor-pointer
                                ${i == 0 && 'bg-my-secondary'}
                                ${i == 1 && 'bg-my-quintenary'}
                                ${i == 2 && 'bg-my-quartenary'}
                                ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
                            `}
                            onClick={() => {
                                if(option.isCorrect == true){
                                    setAcertos(acertos + 1)
                                    console.log(options)
                                    getQuestion()
                                }else{
                                    setErros(erros + 1)
                                }
                                setQuestionsTotal(questionsTotal + 1)
                            }}  
                        >
                            {option.value.icn}
                        </button>
                    ))}
                </div>

            </div>
            <BottomNavigation />
        </>
    )
}