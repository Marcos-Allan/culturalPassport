//IMPORTAÇÃO DA TIPAGEM PARA COMPONENTES FILHOS DIRETO DO REACT
import { ReactNode } from "react"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    children: ReactNode
}

export default function DividersButton(props: Props) {
    return(
        <div className={`w-[90%] sm:w-[60%] flex flex-col sm:flex-row justify-center items-center sm:gap-[10px]`}>
            {props.children}
        </div>
    )
}