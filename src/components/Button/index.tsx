import { Link } from "react-router-dom"
import { useMyContext } from "../../provider/geral"

interface Props {
    text: string,
    route: string,
    event?: () => void,
}

export default function Button(props: Props) {

    const states:any = useMyContext()
    const { theme } = states

    return(
        <>
            {props.route !== 'undefined' ? (
                <Link
                    to={props.route}
                    className={`
                        w-[90%]
                        my-3
                        rounded-[8px]
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
                        >{props.text}</p>
                </Link>
            ):(
                <div
                    onClick={() => {
                        props.event && props.event()
                    }}
                    className={`
                        w-[90%]
                        my-3
                        rounded-[8px]
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
                        >{props.text}</p>
                </div>
            )}
        </>
    )
}