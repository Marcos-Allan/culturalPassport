import { Link } from "react-router-dom";
import { useMyContext } from "../../provider/geral";

interface Props {
    route: string,
    text: string,
}

export default function Linkin(props: Props) {
    
    const states:any = useMyContext()
    const { theme } = states

    return(
        <Link
            to={`${props.route}`}
            className={`
                font-medium
                text-[20px]
                ${theme == 'light' ? 'text-my-primary' : 'text-my-secondary'}
            `}
        >
            {props.text}
        </Link>
    )
}