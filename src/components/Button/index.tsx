import { Link } from "react-router-dom"
import { useMyContext } from "../../provider/geral"

export default function Button({ text, route }:{ text: string, route: string }) {

    const states:any = useMyContext()
    const { theme } = states

    return(
        <>
            {route !== 'undefined' ? (
                <Link
                    to={route}
                    className={`
                        w-[90%]
                        my-3
                        rounded-[20px]
                        ${theme == 'light' ? 'bg-my-primary' : 'bg-my-secondary'}
                    `}
                >
                    <p
                        className={`
                            text-center
                            p-[10px]
                            text-[24px]
                            font-medium
                            capitalize
                            ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                        `}
                        // onClick={() => alert('Paciência é uma virtude que nem todos tem')}
                        >{text}</p>
                </Link>
            ):(
                <div
                    className={`
                        w-[90%]
                        my-3
                        rounded-[20px]
                        ${theme == 'light' ? 'bg-my-primary' : 'bg-my-secondary'}
                    `}
                >
                    <p
                        className={`
                            text-center
                            p-[10px]
                            text-[24px]
                            font-medium
                            capitalize
                            ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                        `}
                        // onClick={() => alert('Paciência é uma virtude que nem todos tem')}
                        >{text}</p>
                </div>
            )}
        </>
    )
}