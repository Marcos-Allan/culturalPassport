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
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DOS ICONES
import {  IoArrowForward } from "react-icons/io5";
import instance from '../../utils/axios';

export default function CronogramPage() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, userS, toggleLoading, toggleUser, toggleAlert, toggleCronogram } = states

    //UTILIZAÇÃO DO HOOK useState
    const [matters, setMatters] = useState<any[]>([])
    const [cronogramS, setCronogramS] = useState<any[]>([])
    
    const [hours, setHours] = useState<number | string>(0)
    const [minutes, setMinutes] = useState<number | string>(59)

    const ord = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    
    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {

        //DEFINE O ARRAY COM AS MATÉRIAS
        setMatters([
            'fisíca',
            'história',
            'inglês',
            'geografia',
            'artes',
            'português',
            'química',
            'biologia',
            'matemática',
            'filosofia',
            'sociologia',
            'espanhol',
        ])
        
        //DEFINE O ARRAY COM AS MATÉRIAS
        setCronogramS([
            'fisíca',
            'história',
            'inglês',
            'geografia',
            'artes',
            'português',
            'química',
            'biologia',
            'matemática',
            'filosofia',
            'sociologia',
            'espanhol',
        ])
    },[])

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS DADOS DO USUÁRIO
    async function updateUser() {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true);

            //FAZ UMA REQUISIÇÃO DO TIPO put PARA ATUALIZAR OS DADOS DO USUÁRIO
             instance.put(`/users/update/${userS.id}`, {
                cronogram: JSON.stringify(cronogramS)
            })
            .then(function(response) {

                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false);
    
                //MOSTRA OS DADOS DA REQUISIÇÃO
                console.log(response.data);

                //FORMATA E SEPARA A STRING PARA VER MATÉRIA POR MATÉRIA DO CRONOGRAMA
                const cronogram = response.data.cronogram.split('[')[1].split(']')[0].split(',')

                //ESCREVE NO CONSOLE
                console.log(cronogram)
    
                //REGISTRA O NOME E A FOTO E O ID DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
                toggleUser(response.data.name, response.data.img, response.data._id, response.data.simulations, response.data.simulationsConcludeds, cronogram)
    
                //COLOCA ALERT NA TELA
                toggleAlert(`success`, `Cronograma atualizado com sucesso`);
            })
            .catch(function(error) {

                //ESCREVE NO CONSOLE O ERRO OCORRIDO
                console.log(`Requisição feita com falhas ${error}`);
    
                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false);
    
                //COLOCA ALERT NA TELA
                toggleAlert(`error`, `Ocorreu um erro interno no servidor`);
            })
    }

    //FUNÇÃO RESPONSÁVL POR REORDENAR OS ITEMS DO ARRAY
    function reorder(list: any[], startIndex: number, endIndex: number) {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    function handleHours(value:any) {
        if(Number(value.target.value) > 23){
            setHours(0)
        }else if(Number(value.target.value < 0)) {
            setHours(23)
        }else{
            setHours(value.target.value)
        }
    }
    
    function handleMinutes(value:any) {
        if(Number(value.target.value) > 59) {
            setMinutes(0)
        }else if(Number(value.target.value < 0)) {
            setMinutes(59)
        }else{
            setMinutes(value.target.value)
        }
    }

    //FUNÇÃO RESPONSÁVL POR FINALIZAR O DRAG 
    function onDragEnd(result:any) {
        //VERIFICA SE TEM RESULTADO 
        if(!result){
            return
        }

        //CRIA UM NOVO ARRAY CHAMANDO A FUNÇÃO PARA REORDENAR
        const items = reorder(matters, result.source.index, result.destination.index)

        //SALVA O ARRAY DAS MATÉRIAS NO ESTADO DE MATÉRIA
        setMatters(items)
        
        //SALVA O ARRAY DAS MATÉRIAS NO ESTADO DE CRONOGRAMA
        setCronogramS(items)
    }

    return(
        <>
            {userS.logged === true && userS.cronogram.length < 1 && (
                <div className={`
                    absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center
                    ${theme == 'light' ? 'bg-my-black-opacity' : 'bg-my-white-opacity'}
                `}>
                    <h1 className={`w-[80%] text-center text-[20px] font-medium mb-[14px] ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>Olá <span className={`font-bold ${theme == 'light' ? 'text-my-quartenary' : 'text-my-secondary'}`}>{userS.name}</span>, defina seu cronograma de estudos</h1>

                    
                    <div className={`ml-[40px] flex flex-row flex-wrap mb-3 text-[24px] py-2 px-4 ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}`}>
                        <h1 className={`capitalize mr-3 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>horário: </h1>
                        <input
                            type="number"
                            value={Number(hours) >= 0 && Number(hours) <= 9 ? '0'+hours : hours}
                            className={`w-[34px] flex items-center justify-center text-center bg-transparent outline-none border-none
                                ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                            `}
                            onChange={handleHours}
                        />
                        <p className={`mx-1 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>:</p>
                        <input
                            type="number"
                            value={Number(minutes) >= 0 && Number(minutes) <= 9 ? '0'+minutes : minutes}
                            className={`w-[34px] flex items-center justify-center text-center bg-transparent outline-none border-none
                                ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                            `}
                            onChange={handleMinutes}
                        />
                    </div>

                    <div className={`ml-[40px] relative flex flex-row w-[80%] sm:w-[70%] lg:w-[50%] min-h-[280px] rounded-[8px] ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'} border-4 ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}`}>
                        <div
                            className={`flex-grow-[1] py-8 px-4 rounded-[8px] ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}
                        >
                            <div className={`absolute top-0 left-[-39px] text-my-white mt-[28px] border-[4px] text-center ${theme == 'light' ? 'border-l-my-secondary border-t-my-secondary border-b-my-secondary border-r-my-white bg-my-white' : 'border-t-my-quartenary border-l-my-quartenary border-b-my-quartenary border-r-my-black bg-my-black'} flex flex-col gap-[5px] rounded-tl-[8px] rounded-bl-[8px]`}>
                                <p className='capitalize py-[3px] bg-my-primary'>seg</p>
                                <p className='capitalize py-[3px] bg-my-secondary'>ter</p>
                                <p className='capitalize py-[3px] bg-my-terciary'>qua</p>
                                <p className='capitalize py-[3px] bg-my-quartenary'>qui</p>
                                <p className='capitalize py-[3px] bg-my-quintenary'>sex</p>
                                <p className='capitalize py-[3px] bg-my-primary'>sab</p>
                            </div>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="matters" type="list" direction="vertical">
                                    {(provided) => (
                                        <div
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                gap: '5px'
                                            }}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {matters.map((mat, ind) => (
                                            <Draggable draggableId={`${ind}`} index={ind} key={ind}>
                                                {(provided2) => (
                                                <div
                                                    style={{ order: `${ord[ind]}` }}
                                                    className={`order-[${ord[ind]}]`}
                                                    ref={provided2.innerRef}
                                                    {...provided2.draggableProps}
                                                    {...provided2.dragHandleProps}
                                                >
                                                    <p
                                                    className={`capitalize h-[30px] flex items-center justify-center cursor-pointer hover:underline transition-all duration-[.3s] text-[14px] text-center py-1 text-my-white ${
                                                        theme === 'light'
                                                            ? 'bg-my-secondary'
                                                            : 'bg-my-quartenary'
                                                        } `}
                                                    >
                                                    {mat}
                                                    </p>
                                                </div>
                                                )}
                                            </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>

                        </div>

                         <IoArrowForward
                             onClick={() => {
                                updateUser()
                                toggleCronogram(hours, minutes)
                            }}
                             className={`
                             absolute right-[0%] top-[0%] text-[20px] m-1 hover:scale-[1.2] transition-all duration-[.2s] cursor-pointer
                                 ${theme == 'light'
                                 ? 'text-my-secondary'
                                 : 'text-my-quartenary'
                                 }
                             `}
                         />
                    </div>
                </div>
            )}
        </>
    )
}