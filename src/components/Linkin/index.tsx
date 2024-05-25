// IMPORTAÇÃO DAS BIBLIOTECAS
import { Link } from "react-router-dom";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    route: string,
    text: string,
}

export default function Linkin(props: Props) {
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <Link
            to={`${props.route}`}
            className={`
                font-medium
                text-[20px]
                sm:text-[16px]
                ${theme == 'light' ? 'text-my-primary' : 'text-my-secondary'}
            `}
        >
            {props.text}
        </Link>
    )
}