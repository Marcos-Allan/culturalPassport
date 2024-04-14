import Linkin from "../../components/Linkin/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import ToggleTheme from "../../components/ToggleTheme/index.tsx"

export default function Home(){

    return(
        <ScreenPage>
            <Linkin route="/signin" text="Login" />
            <Linkin route="/signup" text="Criar conta" />
            <ToggleTheme />
        </ScreenPage>
    )
}