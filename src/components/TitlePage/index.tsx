//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string
}

export default function TitlePage(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <h1 className={`text-center w-[90%] pt-4 text-[26px] sm:text-[28px] font-bold capitalize
            ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
        `}>{props.text}</h1>
    )
}