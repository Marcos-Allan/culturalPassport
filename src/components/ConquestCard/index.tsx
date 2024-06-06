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

    //FUNÇÃO RESPONSÁVEL POR RENDERIZAR AS BARRAS DE LEVEL
    function renderLevel(quantity: number) {
        //INICIA ARRAY VAZIO
        const level = []

        //FAZ LOOP PELA QUANTIDADE FORNECIDA PELA FUNÇÃO
        for(let i = 0; i < quantity; i++) {

            //ADICIONA UM COMPONENTE NO ARRAY
            level.push(
                <div
                    key={i}
                    className={`h-[10px] flex-grow-[1] rounded-[2px]
                    ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'}    
                `}/>
            )

        }

        //RETORNA O COMPONENTE A QUANTIDADE DE VEZES FORNECIDA PELA FUNÇÃO
        return level
    }

    return(
        <div
            className={`w-[90%] my-2 p-3 border-2 flex h-[180px] gap-[6px] rounded-[8px]
            ${theme == 'light' ? 'border-my-secondary' : 'border-my-quartenary'}
        `}>
            
            <div
                className={`h-full w-[40%] flex flex-row p-2 items-end gap-1 rounded-[5px]
                ${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quartenary'}
            `}>
                {/* CHAMA A FUNÇÃO QUE RENDERIZA OS LEVELS DEPENDENDO DA QUANTIDADE ESPECIFICADA */}
                {renderLevel(props.level)} 
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