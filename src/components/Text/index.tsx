import { useMyContext } from "../../provider/geral"

export default function Text({ text }:{ text:string }) {

    const states:any = useMyContext()
    const { theme } = states

    return(
        <p
            className={`
                w-[90%] my-3 text-[22px]
                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
            `}
        >
            {text}
        </p>
    )
}