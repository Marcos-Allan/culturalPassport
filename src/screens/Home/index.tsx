//IMPORTAÇÃO DOS COMPONENTES
import ScreenPage from "../../components/ScreenPage/index.tsx"
import Navbar from "../../components/Navbar/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"
import MenuBUtton from "../../components/MenuButton/index.tsx";
import Button from "../../components/Button/index.tsx"
import Text from "../../components/Text/index.tsx";

//IMPORTAÇÃO DA IMAGEM USADA NA TELA
import Person from '../../assets/person_1.png'

export default function Home(){

    return(
        <ScreenPage>
            <Navbar>
                <TitlePage text="Bem Vindo Estudante" />
                <MenuBUtton />
            </Navbar>

            <Text
                text="Seja muito bem-vindo ao nosso app de estudos. Se prepare para os vestibulares com simulados e conteúdos diversos"
            />

            <img
                src={Person}
                alt=""
            />
                        
            <Button text="iniciar" route="/signs" />
        </ScreenPage>
    )
}