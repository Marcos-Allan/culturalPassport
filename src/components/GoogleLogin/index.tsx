import { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useMyContext } from "../../provider/geral";
import { auth, getRedirectResult, provider, signInWithRedirect } from '../../utils/firebase.tsx'
import Linkin from '../Linkin/index.tsx';
export default function GoogleLogin() {

    const states:any = useMyContext()
    const { theme, userS, toggleUser } = states

    const [loading, setLoading] = useState<boolean>(false)

    //CRIA UMA FUNÇÃO PARA SER EXPORTADA DE LOGIN COM O GOOGLE DE FORMA REDIRECIONADA
    function signInRedirect() {
        signInWithRedirect(auth, provider);
    }
    
    //CRIA UMA FUNÇÃO PARA SER EXPORTADA QUE PEGA O RESULTADO DO LOGIN REDIRECIONADO
    function getLoginResult() {
        getRedirectResult(auth)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential ? credential.accessToken : null;
    
            // The signed-in user info.
            const user = result ? result.user : null;

            if(user){
                toggleUser(user.displayName, user.photoURL)
            }
            return true
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            console.log('erro de autenticação: ', error)
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(false)
            return false
        });
        console.log('finaized')
        return 'finaized'
    }

    useEffect(() => {
        const login = getLoginResult()
        if(login == 'finaized'){
            setLoading(false)
        }else{
            setLoading(true)
        }
    },[])

    return(
        <>
            {loading == true ? (
                <div
                    className={`animate-spin ease-linear rounded-full border-8 border-t-8 h-20 w-20 border-t-my-terciary border-transparent`
                }>
                </div>
            ) : (
                <>
                    <FcGoogle
                        className={`
                            text-[70px]
                            border border-my-primary
                            rounded-[50%]
                            p-3
                            ${theme == 'light' ? '' : ''}
                        `}
                        onClick={() => {
                            // alert('Calma... função a ser implementada')
                            setLoading(true)
                            signInRedirect()
                        }}
                    />
                    {userS.logged == true && (
                        <Linkin route='/' text='voltar' />
                    )}
                </>
            )}
        </>

    )
}