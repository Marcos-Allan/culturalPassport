//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string
}

export default function Text(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <p
            className={`
                w-[90%] sm:w-[60%] my-3 sm:my-1 text-[22px] sm:text-[20px]
                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
            `}
        >
            {props.text}
        </p>
    )
}