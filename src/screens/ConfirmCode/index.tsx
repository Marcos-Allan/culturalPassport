import { IoArrowBackOutline } from "react-icons/io5";
import Button from '../../components/Button'
import EmailInput from '../../components/EmailInput'
import ScreenPage from '../../components/ScreenPage'
import Text from '../../components/Text'
import TitlePage from '../../components/TitlePage'
import { useNavigate } from 'react-router-dom'
import { useMyContext } from '../../provider/geral';
import ToggleTheme from "../../components/ToggleTheme";

export default function ConfirmCode() {

    const navigate = useNavigate()

    const states:any = useMyContext()
    const { theme } = states

    function previousPage() {
        navigate(-1)
    }

    return(
        <ScreenPage>
                
        <div className={`w-[90%] gap-3 flex justify-start items-center flex-row`}>
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
            <TitlePage
                text={`Confirmar o Código`}
            />
        </div>
        <Text text={`Digite o código que foi enviado por email`} />

        <form className={`mt-8 items-center flex flex-col w-[90%]`}>
            <EmailInput />
            <Text text={`enviamos um código para o email enviado`} />
            <Button route='/switch-password' text={`Confirmar`} />
        </form>
        <ToggleTheme />
    </ScreenPage >
    )
}