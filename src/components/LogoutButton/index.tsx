//IMPORTAÇÃO DOS ICONES
import { CiLogout } from "react-icons/ci";

//IMPORTA O MÉTODE DE PEGAR A AUTENTICAÇÃO ATUAL E O MÉTODO DE LOGOUT DO FIREBASE
import { getAuth, signOut } from 'firebase/auth';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function LogoutButton() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, toggleMenuOpen, toggleUser, toggleAlert } = states

    //FUNÇÃO RESPONSÁVEL PELO LOGOUT
    function handleLogout() {
        //PEGA A AUTENTICAÇÃO DO ATUAL DO FIREBASE
        const auth = getAuth()

        signOut(auth).then(() => {
            console.log('Usuário deslogado com sucesso.')

            //COLOCA O ALERT NA TELA
            toggleAlert('success', 'conta desconectada com sucesso')
            
        }).catch((error) => {
            console.error('Erro ao deslogar:', error)
        })
        //FECHA O MENU
        toggleMenuOpen(false)

        //TIRA OS DADOS DA CONTA DO USUÁRIO DO FRONTEND
        toggleUser('', '', '', false)
    }

    return(
        <div className={`w-[80%] flex py-3`}
            onClick={() => handleLogout()}
        >
            <CiLogout className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'} text-[30px]`} />
            <p className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'} text-[18px] font-semibold capitalize flex-grow-[1] text-right`}>logout</p>
        </div>
    )
}