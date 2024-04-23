import Button from "../../components/Button/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import TitlePage from "../../components/TitlePage/index.tsx"
import ToggleTheme from "../../components/ToggleTheme/index.tsx"
import { useMyContext } from "../../provider/geral";

export default function Home(){

    const states:any = useMyContext()
    const { theme, userS } = states

    return(
        <ScreenPage>
            <TitlePage text="Inicio" />
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
            <ToggleTheme />
        </ScreenPage>
    )
}