import Button from '../../components/Button'
import EmailInput from '../../components/EmailInput'
import ScreenPage from '../../components/ScreenPage'
import Text from '../../components/Text'
import TitlePage from '../../components/TitlePage'
import ToggleTheme from "../../components/ToggleTheme";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";

export default function ConfirmCode() {

    return(
        <ScreenPage>
                
            <Navbar>
                <Return />
                <TitlePage
                    text={`Confirmar código`}
                />
                <ToggleTheme />
            </Navbar>
            <Text text={`Digite o código que foi enviado por email`} />

            <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                <EmailInput />
                <Text text={`enviamos um código para o email enviado`} />
                <Button route='/switch-password' text={`Confirmar`} />
            </form>
        </ScreenPage >
    )
}