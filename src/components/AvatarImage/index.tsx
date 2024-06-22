//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    event?: () => void
    active: boolean,
    img: string
}

export default function AvatarImage(props: Props) {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme } = states

    return(
        <img
            onClick={() => {
                props.event && props.event()
                // toggleImg(1)
            }}
            className={`
                w-[90px] rounded-[50%] border-2 p-1
                ${props.active == true ? `${theme == 'light' ? 'border-my-terciary translate-y-[-16px]' : 'border-my-quartenary translate-y-[-16px]'}` : `border-transparent hover:translate-y-[-16px] transition-all duration-[.3s] cursor-pointer`}
            `}
            src={props.img} alt=""
        />
    )
}