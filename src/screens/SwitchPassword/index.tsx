import Button from '../../components/Button'
import ScreenPage from '../../components/ScreenPage'
import Text from '../../components/Text'
import TitlePage from '../../components/TitlePage'
import PasswordInput from "../../components/PasswordInput";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import MenuBUtton from '../../components/MenuButton';

export default function SwitchPassword() {

    return(
        <ScreenPage>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Trocar a Senha`}
                />
                <MenuBUtton />
            </Navbar>
            <Text text={`Crie sua nova senha`} />

            <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                <PasswordInput hidden={false} placeholder="Senha" text="Senha" />
                <PasswordInput hidden={false} placeholder="Senha" text="Confirmação da Senha" />
                <Button route='/sign-in' text={`confirmar`} />
            </form>
        </ScreenPage >
    )
}