//IMPORTAÇÃO DA TIPAGEM PARA COMPONENTES FILHOS DIRETO DO REACT
import { ReactNode } from "react"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    children: ReactNode
}

export default function ScreenPage(props: Props) {
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, menuOpen, toggleMenuOpen } = states

    return(
        <div
            className={`
                w-screen h-screen flex justify-start items-center flex-col overflow-x-hidden pb-12
                ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}
            `}
            onClick={() => {
                if(menuOpen == true){
                    toggleMenuOpen()
                }
            }}
        >
            {props.children}
        </div>
    )
}