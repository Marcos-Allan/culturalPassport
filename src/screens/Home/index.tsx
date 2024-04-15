import Button from "../../components/Button/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import TitlePage from "../../components/TitlePage/index.tsx"
import ToggleTheme from "../../components/ToggleTheme/index.tsx"

export default function Home(){

    return(
        <ScreenPage>
            <TitlePage text="Inicio" />
            <Button text="login" route="/signin" />
            <Button text="criar conta" route="/signup" />
            <ToggleTheme />
        </ScreenPage>
    )
}