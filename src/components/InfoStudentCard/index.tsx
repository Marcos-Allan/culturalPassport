//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    prop: string,
    value: string
}

export default function InfoStudentCard(props: Props){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme } = states

    return(
        <p className={`
            flex justify-between px-3 w-full my-4 text-[18px] border-2 py-3 rounded-[32px]
            ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
        `}>
            {props.prop}:
            <span>{props.value}</span>
        </p>
    )
}