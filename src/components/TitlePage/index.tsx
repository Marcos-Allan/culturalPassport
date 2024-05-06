import { useMyContext } from "../../provider/geral"

export default function TitlePage({text}:{text:string}) {

    const states:any = useMyContext()
    const { theme } = states

    return(
        <h1 className={`text-center w-[90%] pt-4 text-[26px] font-bold capitalize
            ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
        `}>{text}</h1>
    )
}