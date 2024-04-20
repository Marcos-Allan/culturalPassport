import { IoArrowBackOutline } from "react-icons/io5";
import Button from '../../components/Button'
import ScreenPage from '../../components/ScreenPage'
import Text from '../../components/Text'
import TitlePage from '../../components/TitlePage'
import { useNavigate } from 'react-router-dom'
import { useMyContext } from '../../provider/geral';
import PasswordInput from "../../components/PasswordInput";
import ToggleTheme from "../../components/ToggleTheme";

export default function SwitchPassword() {

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
                text={`Trocar a Senha`}
            />
        </div>
        <Text text={`Crie sua nova senha`} />

        <form className={`mt-8 items-center flex flex-col w-[90%]`}>
            <PasswordInput hidden={false} placeholder="Senha" text="Senha" />
            <PasswordInput hidden={false} placeholder="Senha" text="Confirmação da Senha" />
            <Button route='/sign-in' text={`trocar`} />
        </form>
        <ToggleTheme />
    </ScreenPage >
    )
}