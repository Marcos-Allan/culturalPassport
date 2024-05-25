//IMPORTAÇÃO DA TIPAGEM PARA COMPONENTES FILHOS DIRETO DO REACT
import { ReactNode } from "react"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    children: ReactNode
}

export default function Navbar(props: Props) {

    return(
        <div className={`w-[90%] sm:w-[60%] gap-3 sm:gap-1 flex justify-start items-center flex-row`}>
            {props.children}
        </div>
    )
}