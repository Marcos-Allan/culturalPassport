import { FcGoogle } from "react-icons/fc";
import { useMyContext } from "../../provider/geral";

export default function GoogleLogin() {

    const states:any = useMyContext()
    const { theme } = states

    return(
        <FcGoogle
            className={`
                text-[70px]
                border border-my-primary
                rounded-[50%]
                p-3
                ${theme == 'light' ? '' : ''}
            `}
            onClick={() => alert('Calma... função a ser implementada')}
        />

    )
}