import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { useMyContext } from "../../provider/geral";

export default function Return() {
    
    const navigate = useNavigate()

    const states:any = useMyContext()
    const { theme } = states
    
    function previousPage() {
        navigate(-1)
    }

    return(
        <IoArrowBackOutline
            onClick={previousPage}
            className={`
            text-[55px] pt-4
                ${theme == 'light'
                ? 'text-my-black'
                : 'text-my-white'
                }
            `}
        />
    )
}