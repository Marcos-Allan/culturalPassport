//IMPORTAÇÃO DAS BIBLIOTECAS
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

//IMPORTAÇÃO DOS ICONES
import { FcGoogle } from "react-icons/fc";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

//IMPORTAÇÃO DOS SERVIÇOS DO FIREBASE
import { auth, getRedirectResult, provider, signInWithRedirect } from '../../utils/firebase.tsx'

export default function GoogleLogin() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleUser, toggleLoading } = states

    //FUNÇÃO QUE FAZ LOGIN COM O GOOGLE COM REDIRECIONAMENTO DE PÁGINA
    function signInRedirect() {
        signInWithRedirect(auth, provider);
    }
    
    //FUNÇÃO PARA PEGAR O RESULTADO DO LOGIN QUE FOI REDIRECIONADO
    function getLoginResult() {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential ? credential.accessToken : null;
    
            // The signed-in user info.

            //PUXA OS DADOS DO USUÁRIO
            const user = result ? result.user : null;
            
            //VE SE O USUÁRIO FEZ LOGIN OU NÃO
            if(user){
                //FAZ O LOGIN DO USUÁRIO COM O NOME E COM A FOTO DA CONTA DO GOOGLE DELE
                toggleUser(user.displayName, user.photoURL)

                //NAVEGA PARA A PÁGINA INICIAL
                navigate('/')
                
            }

            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //RETORNA true
            return true

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            //RETORNA O ERRO PARA O USUÁRIO
            console.log('erro de autenticação: ', error)

            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //RETORNA false
            return false
        });
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
        toggleLoading(false)
        getLoginResult()
    },[])

    return(
        <>
            <FcGoogle
                className={`
                    text-[70px]
                    border
                    rounded-[50%]
                    p-3
                    ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'}
                `}
                onClick={() => {
                    //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
                    toggleLoading(true)

                    //FAZ LOGIN COM REDIRECIONAMENTO PARA OUTRA PÁGINA
                    signInRedirect()
                }}
            />
            {/* VERIFICA SE O ESTADO DO LOADING É IGUAL A true */}
            {/* {loading == true ? (
                //COLOCA UM LOADER NA TELA SE O ESTADO DE LOADING FOR IGUAL A true
                <div className={`animate-spin ease-linear rounded-full border-8 border-t-8 h-20 w-20 border-t-my-terciary border-transparent`}></div>
            ) : (
                //COLOCA O BOTÃO DE LOGIN COM O GOOGLE SE O ESTADO DO LOADING FOR IGUAL A false
                <>
                    <FcGoogle
                        className={`
                            text-[70px]
                            border
                            rounded-[50%]
                            p-3
                            ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'}
                        `}
                        onClick={() => {
                            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
                            toggleLoading(true)
                            signInRedirect()
                        }}
                    />
                </>
            )} */}
        </>

    )
}