//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"
import MenuBUtton from "../../components/MenuButton/index.tsx";
import Button from "../../components/Button/index.tsx"
import Text from "../../components/Text/index.tsx";

//IMPORTAÇÃO DA IMAGEM USADA NA TELA
import Person from '../../assets/person_1.png'
import Menu from "../../components/Menu/index.tsx";

export default function Home(){

    return(
        <>
            <Navbar>
                <TitlePage text="Bem Vindo Estudante" />
                <MenuBUtton />
            </Navbar>

            <Text
                text="Seja muito bem-vindo ao nosso app de estudos. Se prepare para os vestibulares com simulados e conteúdos diversos"
            />

            <img
                src={Person}
                className={`w-full sm:w-[30%]`}
                alt=""
            />
                        
            <Button text="iniciar" route="/signs" />
            <Menu />
        </>
    )
}