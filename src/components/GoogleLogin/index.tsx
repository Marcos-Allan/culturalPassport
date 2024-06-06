//IMPORTAÇÃO DAS BIBLIOTECAS
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios.ts';

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
    const { theme, toggleUser, toggleLoading, toggleAlert } = states

    //FUNÇÃO QUE FAZ LOGIN COM O GOOGLE COM REDIRECIONAMENTO DE PÁGINA
    function signInRedirect() {
        signInWithRedirect(auth, provider);
    }

    //FUNÇÃO RESPONSÁVEL PELO LOGIN COM EMAIL E SENHA
    function signIn(email:string, name:string, img:string) {

        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //FAZ UMA REQUISIÇÃO POST PARA O BACKEND DA APLICAÇÃO
        instance.post('/signin_google', {
            //MANDA OS DADOS PARA O BACKEND JUNTO COM A REQUISIÇÃO
            email: email,
            name: name,
            img: img,
        })
        .then(function (response) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR BEM SUCEDIDA
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //REGISTRA O NOME E A FOTO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
            toggleUser(response.data.name, response.data.img, response.data._id)

            //COLOCA ALERT NA TELA
            toggleAlert(`success`, `seja bem-vindo(a) ${response.data.name}`)
            
            //REDIRECIONA O USUÁRIO PARA A PÁGINA INICIAL
            navigate('/materias')
        })
        .catch(function (error) {
            //EXECUTA UMA FUNÇÃO QUANDO A REQUISIÇÃO FOR MAL SUCEDIDA
            console.log('ocorreu algum erro: ', error);

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `lamentamos, erro interno no servidor`)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
        });
        
    }
    
    //FUNÇÃO PARA PEGAR O RESULTADO DO LOGIN QUE FOI REDIRECIONADO
    function getLoginResult() {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        getRedirectResult(auth)
        .then((result) => {
            //PEGA OS DADOS DO USUÁRIO
            const user = result ? result.user : null;
            
            //VERIFICA SE O USUÁRIO FEZ LOGIN
            if(user){
                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false)

                //FAZ O LOGIN CASO A CONTA EXISTA E SE NÃO EE CRIA NO BANCO DE DADOS
                signIn(String(user.email), String(user.displayName), String(user.photoURL))
                
            }else{
                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false)
            }

        }).catch((error) => {
            //RETORNA O ERRO PARA O USUÁRIO
            console.log('erro de autenticação: ', error)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Lamentamos, ocorreu algum erro inesperado`)
        });
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
        toggleLoading(false)

        //CHAMA A FUNÇÃO PARA PEGAR O RESULTADO DO LOGIN COM O GOOGLE
        getLoginResult()
    },[])

    return(
        <>
            <FcGoogle
                className={`
                    text-[70px]
                    sm:text-[50px]
                    border
                    rounded-[50%]
                    p-3
                    sm:p-2
                    ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'}
                `}
                onClick={() => {
                    //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
                    toggleLoading(true)

                    //FAZ LOGIN COM REDIRECIONAMENTO PARA OUTRA PÁGINA
                    signInRedirect()
                }}
            />
        </>

    )
}