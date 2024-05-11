//IMPORTAÇÃO DOS ICONES
import { useMyContext } from "../../provider/geral"
import { IoCloseOutline } from "react-icons/io5";

//IMPORTAÇÃO DOS COMPONENTES
import ToggleTheme from "../ToggleTheme";

export default function Menu() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, menuOpen, toggleMenuOpen, userS } = states

    return(
        <div
            className={`
                flex items-center flex-col absolute top-0 w-[280px] h-full pt-32
                ${theme == 'light' ? 'bg-my-black text-my-white' : 'bg-my-white text-my-black'}
                ${menuOpen == true ? 'left-0' : 'left-[-280px]'}
                transition-[left] duration-[0.6s]
            `}
        >
            <IoCloseOutline
                className={`
                    absolute top-0 end-0 text-[36px] m-2
                    ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                `}
                onClick={() => toggleMenuOpen()}
            />

            {/* VERIFICA SE O ESTADO DA VARIAVEL GLOBAL userS.logged É IGUAL A TRUE */}
            {userS.logged == true && (
                //COLOCA OS DADOS DE FOTO E NOME DO USUÁRIO NA TELA
                <div className={`flex items-center gap-[10px] absolute top-0 left-0 m-3`}>
                    <img
                        src={userS.img}
                        alt=""
                        className={`rounded-[50%] mb-2 w-20 h-20 border-[1px] ${theme == 'light' ? 'border-my-quartenary' : 'border-my-terciary'} p-1`}
                    />
                    <p className={`text-[22px] font-bold
                        ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                    `}>{userS.name}</p>
                </div>
            )}

            <ToggleTheme />
        </div>
    )
}