//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from 'react'

//IMPORTAÇÃO DOS ICONES
import { MdAudiotrack } from "react-icons/md"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    onClick: () => any,
    active: boolean,
    name: string
}

export default function AudioPlayer(props: Props) {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme } = states

    //UTILIZAÇÃO DO HOOK DE useState
    const [isHover, setIsHover] = useState<boolean>(false)

    return(
        <button
            onClick={() => {
                props.onClick()
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}

            className={`p-1 m-1 rounded-[50%] relative outline-none flex items-center justify-center border-none ${props.active == true ? `${theme == 'light' ? 'bg-my-quintenary' : 'bg-my-secondary'}` : `${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quintenary'}`}`}
        >
            <p className={`absolute top-[-30px] capitalize ${props.active == true ? 'block' : 'hidden'} ${theme == 'light' ? 'text-my-quintenary' : 'text-my-secondary'}`}>{props.name}</p>

            <MdAudiotrack className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'}`} />
            
            <p className={`absolute bottom-[-30px] text-center capitalize
                ${props.active !== true ? `${isHover == true ? 'opacity-1' : 'opacity-0'} ${theme == 'light' ? 'text-my-black' : 'text-my-white'}` : 'opacity-0'}
                `}>{props.name}</p>
        </button>
    )
}