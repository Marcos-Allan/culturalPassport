//IMPORTAÇÃO DOS ICONES
import { MdAudiotrack } from "react-icons/md"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    onClick: () => any,
    active: boolean
}

export default function AudioPlayer(props: Props) {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme } = states

    return(
        <button
            onClick={() => props.onClick()}
            className={`p-1 m-1 rounded-[50%] outline-none border-none ${props.active == true ? `${theme == 'light' ? 'bg-my-quintenary' : 'bg-my-secondary'}` : `${theme == 'light' ? 'bg-my-secondary' : 'bg-my-quintenary'}`}`}
        >
            <MdAudiotrack className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'}`} />
        </button>
    )
}