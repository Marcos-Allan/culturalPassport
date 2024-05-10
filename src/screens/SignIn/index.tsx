//IMPORTAÇÃO DAS BIBLIOTECAS
import axios from 'axios'
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

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
import { useMyContext } from '../../provider/geral';


export default function SignIn(){

    const navigate = useNavigate()

    const states:any = useMyContext()
    const { toggleUser } = states

    const [inputValue, setInputValue] = useState<string>('')

    function handleInputChange(e:ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
        console.log(inputValue)
    }

    function signIn() {

        //FAZ UMA REQUISIÇÃO POST PARA O BACKEND DA APLICAÇÃO
        axios.post('http://localhost:3000/signin', {
            email: inputValue
            // email: 'allanmenezes888@gmail.com'
        })
        .then(function (response) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR BEM SUCEDIDA
            
            //VERIFICA SE A CONTA FOI ENCONTRADA PELO TIPO DO DADO RETORNADO
            if(typeof response.data === "object"){
                //MOSTRA OS DADOS DO USUÁRIO CADASTRADO NO BANCO DE DADOS
                console.log('Usuário encontrado')

                //REGISTRA O NOME E A FOTO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
                toggleUser(response.data.name, response.data.img)

                //REDIRECIONA O USUÁRIO PARA A PÁGINA INICIAL
                navigate('/')

            }else{
                //RETORNA MENSAGEM DE ERRO AO USUARIO
                console.log('Usuário não encontrado')
            }
        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log(error);
        });
        
    }

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
                
                <EmailInput value={inputValue} event={handleInputChange} />   
                <PasswordInput text="Password" placeholder="Digite uma senha" hidden={true} />
                <PersonType />

                <Linkin route="/forgout-passowrd" text="Esqueceu sua senha?" />

                <Button text="entrar" route="undefined" event={signIn} />

                <Linkin route="/sign-up" text="Crie sua conta" />
                <Separation />

                <GoogleLogin />
            </form>

        </ScreenPage>
    )
}