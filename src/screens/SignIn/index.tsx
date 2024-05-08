//IMPORTAÇÃO DOS COMPONENTES
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import ToggleTheme from "../../components/ToggleTheme";
import GoogleLogin from "../../components/GoogleLogin";
import PersonType from "../../components/PersonType";
import Linkin from "../../components/Linkin";
import Separation from "../../components/Separation";
import Button from "../../components/Button";
import TitlePage from "../../components/TitlePage";
import ScreenPage from "../../components/ScreenPage";
import Navbar from "../../components/Navbar";

import Return from "../../components/Return";


export default function SignIn(){

    return(
        <ScreenPage>
            
            <Navbar>   
                <Return />
                <TitlePage
                    text={`login`}
                />
                <ToggleTheme />
            </Navbar>

            <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                
                <EmailInput />   
                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={true} />
                <PersonType />

                <Linkin route="/forgout-passowrd" text="Esqueceu sua senha?" />

                <Button text="entrar" route="undefined" />

                <Linkin route="/sign-up" text="Crie sua conta" />
                <Separation />

                <GoogleLogin />
            </form>

        </ScreenPage>
    )
}