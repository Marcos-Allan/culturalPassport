//IMPORTAÇÃO DOS COMPONENTES
import ScreenPage from '../../components/ScreenPage'
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from '../../components/TitlePage'
import MenuBUtton from '../../components/MenuButton'
import Text from '../../components/Text'
import EmailInput from '../../components/EmailInput'
import Button from '../../components/Button'

export default function ConfirmCode() {

    return(
        <ScreenPage>
                
            <Navbar>
                <Return />
                <TitlePage
                    text={`Confirmar código`}
                />
                <MenuBUtton />
            </Navbar>
            <Text text={`Digite o código que foi enviado por email`} />

            <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                <EmailInput />
                <Text text={`Confirme o código enviado para o seu email para alterar a senha`} />
                <Button route='/switch-password' text={`Confirmar`} />
            </form>
        </ScreenPage >
    )
}