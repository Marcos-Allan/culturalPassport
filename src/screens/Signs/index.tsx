//IMPORTAÇÃO DOS COMPONENTES DA PÁGINA
import Navbar from "../../components/Navbar/index.tsx";
import Return from "../../components/Return/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"
import MenuBUtton from "../../components/MenuButton/index.tsx";
import Text from "../../components/Text/index.tsx";
import Button from "../../components/Button/index.tsx"

//IMPORTAÇÃO DA IMAGEM USADA NA PÁGINA
import Person from '../../assets/person_2.png'
import Menu from "../../components/Menu/index.tsx";
import DividersButton from "../../components/DividersButton/index.tsx";


export default function Signs(){

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`salve seu progresso`}
                />
                <MenuBUtton />
            </Navbar>
            
            <Text
                text="Faça login ou cadastre-se para não perder seus dados"
            />

            <img
                src={Person}
                className="w-[93%] sm:w-[30%]"
                alt=""
            />
            <DividersButton>
                <Button text="login" route="/sign-in" />
                <Button text="criar conta" route="/sign-up" />
            </DividersButton>
            <Menu />
        </>
    )
}