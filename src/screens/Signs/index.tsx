import Button from "../../components/Button/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import Text from "../../components/Text/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"
import ToggleTheme from "../../components/ToggleTheme/index.tsx"
import { useMyContext } from "../../provider/geral";

import Person from '../../assets/person_2.png'
import Navbar from "../../components/Navbar/index.tsx";
import Return from "../../components/Return/index.tsx";

export default function Signs(){

    const states:any = useMyContext()
    const { theme, userS } = states

    return(
        <ScreenPage>
            <Navbar>
                <Return />
                <TitlePage
                    text={`salve seu progresso`}
                />
                <ToggleTheme />
            </Navbar>
            
            <Text
                text="Faça login ou cadastre-se para não perder seus dados"
            />

            <img
                src={Person}
                alt=""
            />

            {userS.logged == true && (
                <>
                    <img
                        src={userS.img}
                        alt=""
                        className='rounded-[50%] mb-2 w-20 h-20'
                    />
                    <p className={`text-[22px] font-bold
                        ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                    `}>{userS.name}</p>
                </>
            )}
                        
            <Button text="login" route="/sign-in" />
            <Button text="criar conta" route="/sign-up" />
        </ScreenPage>
    )
}