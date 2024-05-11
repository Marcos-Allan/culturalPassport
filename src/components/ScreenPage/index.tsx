import { ReactNode } from "react"
import { useMyContext } from "../../provider/geral"

interface Props {
    children: ReactNode
}

export default function ScreenPage(props: Props) {
    
    const states:any = useMyContext()
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