//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    i: number,
    getResultQuestion: boolean,
    alterResponse: (a:any, b:any) => any
    yourResponse: any
    quest: any,
    questIndex: any,
    setGetResultQuestion: any
}

export default function SimulationResponses(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleAlert, sucessColor } = states

    return(
        <li
            key={props.i}
            onClick={() => {
                if(props.getResultQuestion == true) {
                    toggleAlert('error', 'Não é possível alterar a sua resposta')
                    return
                }else {

                    //COLOCA AS RESPOSTAS DO USUÁRIO DENTRO DO ARRAY
                    props.alterResponse(props.quest.option, props.questIndex)
                    
                    //ESCREVE NO CONSOLE AS RESPOSTAS DO USUÁRIO
                    console.log(props.yourResponse)
                    
                    //SETA A VARIÁVEL DE ER RESULTADO PARA true
                    props.setGetResultQuestion(true)
                }
            }}
            className={`
                text-[20px] border-[1px] py-2 my-1 px-3 rounded-[40px] cursor-pointer
                ${props.quest.option == props.yourResponse[props.questIndex] ?
                    `${theme == 'light' ?'text-my-secondary border-my-secondary' : 'text-my-secondary border-my-secondary'}` :
                    ` ${theme == 'light' ?'text-my-black border-my-black' : 'text-my-white border-my-white'}`
                }
            `}
            style={{ color: props.getResultQuestion == true && props.quest.correct == true && sucessColor, borderColor: props.getResultQuestion == true && props.quest.correct == true && sucessColor }}
        >{props.quest.option}){props.quest.text}</li>
    )
}