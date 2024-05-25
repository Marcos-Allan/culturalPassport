//IMPORTAÇÃO DOS ICONES
import { IoMenu, IoCloseOutline } from "react-icons/io5";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function MenuBUtton() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, menuOpen, toggleMenuOpen, userS } = states

    return(
        <>
            {/* VERIFICA SE O MENU ESTÁ ABERTO */}
            {menuOpen == true ? (
                //MUDA O ICONE DO MENU SE O MENU ESTIVER ABERTO
                <>
                    <IoCloseOutline 
                        className={`mt-4 text-[40px] sm:text-[34px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} z-[40]`}
                        onClick={() => toggleMenuOpen()}
                        />
                </>
            ):(
                //MUDA O ICONE DO MENU SE O MENU ESTIVER FECHADO
                <div className={`relative`}>
                    <IoMenu
                        className={`mt-4 text-[40px] sm:text-[34px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} z-[40]`}
                        onClick={() => toggleMenuOpen()}
                    />
                    {/* VERIFICA SE O ESTADO DA VARIAVEL GLOBAL userS.logged É IGUAL A TRUE */}
                    {userS.logged == true && (
                        //COLOCA UMA ANIMAÇÃO NO MENU PARA MOSTRAR QUE TEM MUDANÇAS NO MENU
                        <div className={`w-[14px] h-[14px] rounded-[50%] absolute top-[18%] right-[-10%] animate-bounce
                        ${theme == 'light' ? 'bg-my-terciary' : 'bg-my-quartenary'}`}></div>
                    )}
                </div>
            )}
        </>
    )
}