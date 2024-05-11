//IMPORTAÇÃO DOS COMPONENTES
import ScreenPage from '../../components/ScreenPage'
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from '../../components/TitlePage'
import MenuBUtton from '../../components/MenuButton'
import Text from '../../components/Text'
import EmailInput from '../../components/EmailInput'
import Button from '../../components/Button'

export default function ForgoutPassword() {

    return(
            <ScreenPage >
                
                <Navbar>
                    <Return />
                    <TitlePage
                        text={`esqueceu a senha`}
                    />
                    <MenuBUtton />
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