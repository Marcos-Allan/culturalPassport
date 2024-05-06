import Button from "../../components/Button/index.tsx"
import EmailInput from "../../components/EmailInput/index.tsx"
import Linkin from "../../components/Linkin/index.tsx"
import NameInput from "../../components/NameInput/index.tsx"
import Navbar from "../../components/Navbar/index.tsx"
import PasswordInput from "../../components/PasswordInput/index.tsx"
import Return from "../../components/Return/index.tsx"
import ScreenPage from "../../components/ScreenPage/index.tsx"
import TitlePage from "../../components/TitlePage/index.tsx"
import ToggleTheme from "../../components/ToggleTheme/index.tsx"

export default function SignUp(){

    return(
        <ScreenPage>
            <Navbar>
                <Return />
                <TitlePage
                    text={`cadastrar`}
                />
                <ToggleTheme />
            </Navbar>

            <form className={`mt-8 items-center flex flex-col w-full`}>
                <NameInput text="Name" placeholder="Digite seu nome" />
                <NameInput text="Last Name" placeholder="Digite seu sobrenome" />
                <NameInput text="RA/RM" placeholder="Digite seu RA ou RM" />
                <EmailInput />   
                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={false} />
                <PasswordInput text="Confirm Password" placeholder="Digite a confirmação da senha" hidden={false} />
                <Button text="criar" route="/sign-in" />
            </form>
            
            <Linkin route="/sign-in" text="Já possui uma conta?" />
        </ScreenPage>
    )
}