//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//TIPAGEM DAS PROPRIEDADES DO COMPONENTE
interface Props {
    level: number,
    porcentage: number,
    title: string,
    message: string,
}

export default function ConquestCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <div
            className={`w-[90%] my-2 p-3 border-2 flex h-[180px] gap-[6px] rounded-[8px]
            ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}
        `}>
            
            <div
                className={`h-full w-[40%] flex flex-row p-2 items-end gap-1 rounded-[5px]
                ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}
            `}>
                {props.level == 1 && (
                    <div
                        className={`h-[10px] flex-grow-[1] rounded-[2px]
                        ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                    `}></div>
                )}
                {props.level == 2 && (
                    <>
                        <div
                            className={`h-[10px] flex-grow-[1] rounded-[2px]
                            ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                        `}></div>
                        <div
                            className={`h-[10px] flex-grow-[1] rounded-[2px]
                            ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                        `}></div>
                    </>
                )}
                {props.level == 3 && (
                    <>
                        <div
                            className={`h-[10px] flex-grow-[1] rounded-[2px]
                            ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                        `}></div>
                        <div
                            className={`h-[10px] flex-grow-[1] rounded-[2px]
                            ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                        `}></div>
                        <div
                            className={`h-[10px] flex-grow-[1] rounded-[2px]
                            ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                        `}></div>
                    </>
                )}

                
            </div>

            <div className={`flex-grow-[1] flex flex-col h-full justify-between bg-transparent p-2 rounded-[5px]`}>
                
                <div>
                    <h1
                        className={`font-bold text-[17px]
                        ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                    `}>{props.title}</h1>

                    <p
                        className={`text-[15px]
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}>{props.message}</p>
                </div>
                
                <div className='w-full flex flex-row justify-between items-center'>

                    <div
                        className={`align-bottom w-[80%] h-[10px]
                        ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}
                    `}>
                        <div
                            className={`h-full w-[${Number(props.porcentage)}%]
                            ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}
                        `}></div>
                    </div>
                    
                    <p
                        className={`text-[14px]
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}>{props.porcentage}%</p>

                </div>

            </div>
        </div>
    )
}