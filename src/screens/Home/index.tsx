import Button from "../../components/Button/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import Text from "../../components/Text/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"
import ToggleTheme from "../../components/ToggleTheme/index.tsx"
import { useMyContext } from "../../provider/geral";

import Person from '../../assets/person_1.png'
import Navbar from "../../components/Navbar/index.tsx";

export default function Home(){

    const states:any = useMyContext()
    const { theme, userS } = states

    return(
        <ScreenPage>
            <Navbar>
                <TitlePage text="Bem Vindo Estudante" />
                <ToggleTheme />
            </Navbar>

            <Text
                text="Seja muito bem-vindo ao nosso app de estudos. Se prepare para os vestibulares com simulados e conteúdos diversos"
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
                        
            <Button text="iniciar" route="/signs" />
        </ScreenPage>
    )
}