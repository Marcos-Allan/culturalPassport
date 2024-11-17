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
import TimePicker from 'react-time-picker';

//IMPORTAÇÃO DOS COMPONENTES
import Button from '../Button';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS ESTILOS DO INPUT
import './TimePickerStyles.css';

export default function CronogramPage() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, userS, toggleLoading, toggleUser, toggleAlert, toggleCronogram, soundNotification } = states

    //UTILIZAÇÃO DO HOOK useState
    const [column1Matters, setColumn1Matters] = useState<string[]>([
        'fisíca',
        'história',
        'inglês',
        'geografia',
        'artes',
        'português',
    ]);
    const [column2Matters, setColumn2Matters] = useState<string[]>([
        'química',
        'biologia',
        'matemática',
        'filosofia',
        'sociologia',
        'espanhol',
    ]);

    const [cronogramS, setCronogramS] = useState<any[]>([])
    const [time, setTime] = useState(`${userS.timeCronograma[0]}:${userS.timeCronograma[1]}`);

    const handleTimeChange = (event:any) => {
        // setTime(event.target.value);
        setTime(event);
        console.log(event.split(':')[0])
        console.log(event.split(':')[1])
    };
    
    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {

        //DEFINE O ARRAY COM AS MATÉRIAS DA PRIMEIRA COLUNA
        setColumn1Matters([
            'fisíca',
            'história',
            'inglês',
            'geografia',
            'artes',
            'português',
        ])
        
        //DEFINE O ARRAY COM AS MATÉRIAS DA SEGUNDA COLUNA
        setColumn2Matters([
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
                cronogram: JSON.stringify(cronogramS),
                timeCronograma: [time.split(':')[0], time.split(':')[1]],
                soundAlert: soundNotification
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
                toggleUser(response.data.name, response.data.img, response.data._id, response.data.simulations, response.data.simulationsConcludeds, cronogram, response.data.soundAlert, response.data.timeCronograma)
    
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

    //FUNÇÃO RESPONSÁVL POR FINALIZAR O DRAG 
    function onDragEnd(result: any) {
        const { source, destination } = result;
    
        //VERIFICA SE TROCOU A MATÉRIA DE LUGAR
        if (!destination) return;
    
        //MOVENDO ENTRE AS COLUNAS
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn =
                source.droppableId === "column1" ? column1Matters : column2Matters;
            const destinationColumn =
                destination.droppableId === "column1" ? column1Matters : column2Matters;
            const setSourceColumn =
                source.droppableId === "column1" ? setColumn1Matters : setColumn2Matters;
            const setDestinationColumn =
                destination.droppableId === "column1" ? setColumn1Matters : setColumn2Matters;
    
            //CLONA AS COLUNAS PARA EVITAR MUTAÇÃO DIRETA
            const updatedSource = [...sourceColumn];
            const updatedDestination = [...destinationColumn];
    
            //REMOVE O ITEM DA COLUNA ORIGINAL
            const [removed] = updatedSource.splice(source.index, 1);
    
            //ADICIONA O ITEM NA POSIÇÃO DESEJADA DA COLUNA ESPECÍFICADA
            updatedDestination.splice(destination.index, 0, removed);
    
            //REMOVE O ULTIMO ITEM DA COLUNA ESPECIFICADA E COLOCA NA COLUNA ORIGINAL
            const [lastItem] = updatedDestination.splice(updatedDestination.length - 1, 1);
            updatedSource.push(lastItem);
    
            //ATUAIZA OS ESTADOS DA COLUNA
            setSourceColumn(updatedSource);
            setDestinationColumn(updatedDestination);
    
            //ATUALIZA O CRONOGRAMA APÓS OS ESTADOS DAS COLUNAS ATUALIZAREM
            setTimeout(() => {
                updateCronogram(updatedSource, updatedDestination);
            }, 0);
    
            return;
        }
    
        //MOVENDO DENTRO DA MESMA COLUNA
        const sourceColumn =
            source.droppableId === "column1" ? column1Matters : column2Matters;
        const setColumn =
            source.droppableId === "column1" ? setColumn1Matters : setColumn2Matters;
    
        const updatedColumn = [...sourceColumn];
        const [removed] = updatedColumn.splice(source.index, 1);
        updatedColumn.splice(destination.index, 0, removed);
    
        //ATUALIZA O ESTADO DA COLUNA
        setColumn(updatedColumn);
    
        //ATUALIZA O CRONOGRAMA APÓS OS ESTADOS DAS COLUNAS ATUALIZAREM
        setTimeout(() => {
            updateCronogram(
                source.droppableId === "column1" ? updatedColumn : column1Matters,
                source.droppableId === "column2" ? updatedColumn : column2Matters
            );
        }, 0);
    }
    
    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR O CRONGRAMA
    function updateCronogram(updatedColumn1: string[], updatedColumn2: string[]) {
        setCronogramS([
            updatedColumn1[0],
            updatedColumn2[0],
            updatedColumn1[1],
            updatedColumn2[1],
            updatedColumn1[2],
            updatedColumn2[2],
            updatedColumn1[3],
            updatedColumn2[3],
            updatedColumn1[4],
            updatedColumn2[4],
            updatedColumn1[5],
            updatedColumn2[5],
        ]);
    }

    return(
        <>
            {userS.logged === true && userS.cronogram.length < 1 && (
                <div className={`
                    absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center
                    ${theme == 'light' ? 'bg-my-black-opacity' : 'bg-my-white-opacity'}
                `}>
                    <h1 className={`w-[80%] text-center text-[20px] font-medium mb-[14px] ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}>Olá <span className={`font-bold ${theme == 'light' ? 'text-my-quintenary' : 'text-my-secondary'}`}>{userS.name}</span>, defina seu cronograma de estudos</h1>

                    
                    <div className={`flex flex-row flex-wrap mb-3 text-[24px] py-2 px-4 ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
                        <h1 className={`capitalize mr-3 ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>horário: </h1>
                        <TimePicker
                            onChange={handleTimeChange}
                            value={time}
                            className={`
                                custom-time-picker
                                ${theme === 'light' ? 'text-my-black' : 'text-my-white'}
                            `}
                            disableClock
                            clearIcon={null}
                        />
                    </div>


                    <div className={`relative flex flex-row flex-wrap items-center justify-center pb-2 w-[80%] sm:w-[70%] lg:w-[50%] min-h-[280px] rounded-[8px] ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
                        <div
                            className={`w-full flex flex-row pt-8 mb-2 px-4 rounded-[8px] ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}
                        >
                            <div className={`text-my-white flex flex-col items-center justify-between text-center ${theme == 'light' ? 'border-my-secondary' : 'border-my-quintenary bg-my-black'} flex flex-col gap-[5px]`}>
                                <p className={`capitalize h-[30px] flex items-center w-full px-1 mr-[6px] justify-center border-[1px] ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white' }`}>seg</p>
                                <p className={`capitalize h-[30px] flex items-center w-full px-1 mr-[6px] justify-center border-[1px] ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white' }`}>ter</p>
                                <p className={`capitalize h-[30px] flex items-center w-full px-1 mr-[6px] justify-center border-[1px] ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white' }`}>qua</p>
                                <p className={`capitalize h-[30px] flex items-center w-full px-1 mr-[6px] justify-center border-[1px] ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white' }`}>qui</p>
                                <p className={`capitalize h-[30px] flex items-center w-full px-1 mr-[6px] justify-center border-[1px] ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white' }`}>sex</p>
                                <p className={`capitalize h-[30px] flex items-center w-full px-1 mr-[6px] justify-center border-[1px] ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white' }`}>sab</p>
                            </div>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className="flex flex-row justify-center items-start gap-4 w-full">
                                    {/* Primeira Coluna */}
                                    <Droppable droppableId="column1" type="COLUMN" direction="vertical">
                                        {(provided) => (
                                            <div
                                                className="flex flex-col gap-2 w-[45%] border rounded p-2"
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {column1Matters.map((mat, ind) => (
                                                    <Draggable
                                                        key={`column1-mat-${ind}`}
                                                        draggableId={`column1-mat-${ind}`}
                                                        index={ind}
                                                    >
                                                        {(provided2) => (
                                                            <div
                                                                ref={provided2.innerRef}
                                                                {...provided2.draggableProps}
                                                                {...provided2.dragHandleProps}
                                                                className={`capitalize flex items-center justify-center hover:underline transition-all duration-[.3s] text-[14px] text-center py-1 border-[1px] rounded ${
                                                                    theme === "light"
                                                                    ? "text-my-black border-my-black"
                                                                    : "text-my-white border-my-white"
                                                                }
                                                                    ${ind == 0 || ind == 3 ? 'bg-my-secondary' : ''}
                                                                    ${ind == 1 || ind == 4 ? 'bg-my-quintenary' : ''}
                                                                    ${ind == 2 || ind == 5 ? 'bg-my-quartenary' : ''}
                                                                `}
                                                            >
                                                                {mat}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>

                                    {/* Segunda Coluna */}
                                    <Droppable droppableId="column2" type="COLUMN" direction="vertical">
                                        {(provided) => (
                                            <div
                                                className="flex flex-col gap-2 w-[45%] border rounded p-2"
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {column2Matters.map((mat, ind) => (
                                                    <Draggable
                                                        key={`column2-mat-${ind}`}
                                                        draggableId={`column2-mat-${ind}`}
                                                        index={ind}
                                                    >
                                                        {(provided2) => (
                                                            <div
                                                                ref={provided2.innerRef}
                                                                {...provided2.draggableProps}
                                                                {...provided2.dragHandleProps}
                                                                className={`capitalize flex items-center justify-center hover:underline transition-all duration-[.3s] text-[14px] text-center py-1 border-[1px] rounded ${
                                                                    theme === "light"
                                                                        ? "text-my-black border-my-black"
                                                                        : "text-my-white border-my-white"
                                                                }
                                                                    ${ind == 0 || ind == 3 ? 'bg-my-secondary' : ''}
                                                                    ${ind == 1 || ind == 4 ? 'bg-my-quintenary' : ''}
                                                                    ${ind == 2 || ind == 5 ? 'bg-my-quartenary' : ''}
                                                                `}
                                                            >
                                                                {mat}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </DragDropContext>



                        </div>
                    
                        <Button
                            text='Atualizar'
                            route='undefined'
                            disabled={false}
                            event={() => {
                                updateUser()
                                toggleCronogram(Number(time.split(':')[0]), Number(time.split(':')[1]))
                            }}
                        />

                    </div>
                </div>
            )}
        </>
    )
}