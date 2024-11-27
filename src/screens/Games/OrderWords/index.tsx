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
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../../components/Navbar";
import Return from "../../../components/Return";
import TitlePage from "../../../components/TitlePage";
import BottomNavigation from '../../../components/BottomNavigation';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../../provider/geral';
import Button from '../../../components/Button';

export default function OrderWords() {

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
        axios.get('/ow.json')
        .then(function (response) {
            console.log(response.data)

            const number = randomNumber(19)
            console.log(response.data[number].words)
        
            getResults(response.data[number].words[0], response.data[number].words[1], response.data[number].words[2])
            
            const result = `${response.data[number].sentence}`
            
            setQuestion(`${response.data[number].sentence}`)
            
            return result
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    // Função chamada quando o drag termina
    const onDragEnd = (result: any) => {
        const { destination, source } = result;

        // Se não for solto em um destino válido
        if (!destination) return;

        // Se o item não for movido
        if (destination.index === source.index) return;

        // Atualiza a lista de opções com a nova ordem
        const reorderedOptions = Array.from(options);
        const [removed] = reorderedOptions.splice(source.index, 1);
        reorderedOptions.splice(destination.index, 0, removed);

        setOptions(reorderedOptions); // Atualiza o estado com a nova ordem
        console.log("Tentativa: "+reorderedOptions[0].value.order, reorderedOptions[1].value.order, reorderedOptions[2].value.order,)
        console.log("Correto: "+0, 1, 2)
    };

    //FUNÇÃO RESPONSÁVEL POR GERAR NÚMEROS ALEATÓRIOS
    function randomNumber(limit:number) {
        return Math.floor(Math.random() * limit)
    }

    //FUNÇÃO RESPONSÁVEL POR GERAR OS RESULTADOS
    function getResults(value1:any, value2:any, value3:any) {
        
        setTimeout(() => {
            const response1 = {
                value: value3
            }
            const response2 = {
                value: value2
            }
            const response3 = {
                value: value1
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
                    text={'OrderWords'}
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
                            <p className={`w-[80%] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{question}</p>
                        </div>
                        <div className={`mt-2 text-[18px] uppercase w-full flex flex-row justify-between items-center flex-wrap ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>
                            <p className={`font-bold text-my-quartenary`}>acertos: {acertos}</p>
                            <p className={`font-bold text-my-secondary`}>erros: {erros}</p>
                            <p className={`font-bold text-my-quintenary`}>questões: {questionsTotal}</p>
                        </div>
                    </>
                )}
                {options && options.length > 0 && (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                                >
                                    {options.map((option, index) => (
                                        <Draggable
                                            key={option.value.id || `option-${index}`} // Garantindo que cada item tenha um ID único
                                            draggableId={String(option.value.id || `option-${index}`)} // ID único
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`w-[22vw] h-[22vw] sm:w-[14vw] sm:h-[14vw] border-[1px] flex items-center justify-center mt-3 text-[20px] rounded-[8px] capitalize cursor-pointer
                                                        ${index === 0 && 'bg-my-secondary'}
                                                        ${index === 1 && 'bg-my-quintenary'}
                                                        ${index === 2 && 'bg-my-quartenary'}`}
                                                >
                                                    {option.value.text}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Button route='undefined' text='confirmar' disabled={false} event={() => {
                            if(options[0].value.order == 0 && options[1].value.order == 1 && options[2].value.order == 2){
                                getQuestion()
                                setAcertos(acertos + 1)
                            }else{
                                setErros(erros + 1)
                            }
                            setQuestionsTotal(questionsTotal + 1)
                        }} />
                    </DragDropContext>
                )}

            </div>
            <BottomNavigation />
        </>
    )
}