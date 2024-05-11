import Button from "../../components/Button/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import Text from "../../components/Text/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"

import Person from '../../assets/person_1.png'
import Navbar from "../../components/Navbar/index.tsx";
import MenuBUtton from "../../components/MenuButton/index.tsx";

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