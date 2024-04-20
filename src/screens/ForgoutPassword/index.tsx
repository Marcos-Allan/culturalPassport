import { IoArrowBackOutline } from "react-icons/io5";
import Button from '../../components/Button'
import EmailInput from '../../components/EmailInput'
import ScreenPage from '../../components/ScreenPage'
import Text from '../../components/Text'
import TitlePage from '../../components/TitlePage'
import { useNavigate } from 'react-router-dom'
import { useMyContext } from '../../provider/geral';
import ToggleTheme from "../../components/ToggleTheme";

export default function ForgoutPassword() {

    const navigate = useNavigate()

    const states:any = useMyContext()
    const { theme } = states

    function previousPage() {
        navigate(-1)
    }

    return(
            <ScreenPage >
                
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
                        text={`esqueceu a senha`}
                    />
                </div>
                <Text text={`Digite o endereço de email no campo abaixo`} />

                <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                    
                    <EmailInput />
                    <Text text={`enviaremos um código para o endereço de email`} />
                        
                    <Button route='/confirm-code' text={`Enviar`} />
                </form>
                <ToggleTheme />
            </ScreenPage >
    )
}