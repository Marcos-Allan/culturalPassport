//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

interface Props {
    questIndex: number,
    questions: any
}

export default function SimulationQuestion(props: Props) {
    
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme } = states

    return(
        <div className={`flex flex-col items-center border-[1px] ${theme == 'light' ? 'border-my-black' : 'border-my-white'} my-2 mt-5 p-3 pt-1 rounded-[20px] min-h-[100px] overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
            <h1 className={`text-[24px] font-medium ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.questIndex + 1} - {props.questions[props.questIndex].content}</h1>
            <div className={`w-full h-[1px] ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'} my-2 lg:hidden`}/>
            <p className={`text-[22px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} `}>{props.questions[props.questIndex].answer}</p>
        </div>
    )
}