import Button from "../../components/Button/index.tsx"
import EmailInput from "../../components/EmailInput/index.tsx"
import Linkin from "../../components/Linkin/index.tsx"
import NameInput from "../../components/NameInput/index.tsx"
import PasswordInput from "../../components/PasswordInput/index.tsx"
import PersonType from "../../components/PersonType/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import TitlePage from "../../components/TitlePage/index.tsx"
import ToggleTheme from "../../components/ToggleTheme/index.tsx"

export default function SignUp(){

    return(
        <ScreenPage>
            <TitlePage text="cadastrar" />

            <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                <NameInput />
                <EmailInput />   
                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={false} />
                <PasswordInput text="Confirmar Password" placeholder="Digite a confirmação da senha" hidden={false} />
                <PersonType />
                <Button text="criar" route="undefined" />
            </form>
            
            <Linkin route="/signin" text="Já possui uma conta?" />
            <ToggleTheme />
        </ScreenPage>
    )
}