import Button from '../../components/Button'
import EmailInput from '../../components/EmailInput'
import ScreenPage from '../../components/ScreenPage'
import Text from '../../components/Text'
import TitlePage from '../../components/TitlePage'
import ToggleTheme from "../../components/ToggleTheme";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";

export default function ForgoutPassword() {

    return(
            <ScreenPage >
                
                <Navbar>
                    <Return />
                    <TitlePage
                        text={`esqueceu a senha`}
                    />
                    <ToggleTheme />
                </Navbar>

                <Text text={`Digite o endereço de email no campo abaixo`} />

                <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                    
                    <EmailInput />
                    <Text text={`enviaremos um código para o endereço de email digitado`} />
                        
                    <Button route='/confirm-code' text={`Enviar`} />
                </form>
            </ScreenPage >
    )
}