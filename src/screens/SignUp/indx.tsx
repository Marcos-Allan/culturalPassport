//IMPORTAÇÃO DAS BIBLIOTECAS
import { useNavigate } from 'react-router-dom'
import { useState, ChangeEvent } from 'react'
import axios from 'axios'

//IMPORTAÇÃO DOS COMPONENTES
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

    const navigate = useNavigate()

    const [inputEmailValue, setInputEmailValue] = useState<string>('')
    const [inputNameValue, setInputNameValue] = useState<string>('')

    function handleInputNameChange(e:ChangeEvent<HTMLInputElement>){
        setInputNameValue(e.target.value)
    }
    
    function handleInputEmailChange(e:ChangeEvent<HTMLInputElement>){
        setInputEmailValue(e.target.value)
    }

    function signup(){
        axios.post('http://localhost:3000/signup', {
            name: inputNameValue,
            email: inputEmailValue,
            img: 'data:image/png;base64,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'
        })
        .then(function (response) {
            console.log(response.data)
            navigate('/sign-in')
        })
        .catch(function (error) {
            console.log('ocorreu algum erro: ', error)
        })
    }

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
                
                <NameInput text="Name" placeholder="Digite seu nome" value={inputNameValue} event={handleInputNameChange} />

                <NameInput text="Last Name" placeholder="Digite seu sobrenome" />
                <NameInput text="RA/RM" placeholder="Digite seu RA ou RM" />

                <EmailInput event={handleInputEmailChange} value={inputEmailValue} />   

                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={false} />
                <PasswordInput text="Confirm Password" placeholder="Digite a confirmação da senha" hidden={false} />
                <Button text="criar" route="undefined" event={signup} />
            </form>
            
            <Linkin route="/sign-in" text="Já possui uma conta?" />
        </ScreenPage>
    )
}