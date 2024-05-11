import Button from "../../components/Button/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import Text from "../../components/Text/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"

import Person from '../../assets/person_2.png'
import Navbar from "../../components/Navbar/index.tsx";
import Return from "../../components/Return/index.tsx";
import MenuBUtton from "../../components/MenuButton/index.tsx";

export default function Signs(){

    return(
        <ScreenPage>
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
                alt=""
            />
                        
            <Button text="login" route="/sign-in" />
            <Button text="criar conta" route="/sign-up" />
        </ScreenPage>
    )
}