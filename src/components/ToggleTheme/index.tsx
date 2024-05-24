//IMPORTAÇÃO DOS ICONES
import { IoSunny, IoMoon } from "react-icons/io5";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function ToggleTheme() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleTheme } = states

    return(
        <div
            className={`w-[80%] flex py-3`}
            onClick={() => toggleTheme()}
        >
            {/* VERIFICA SE O TEMA ESTÁ NO MODO dark OU light */}
            {theme == 'light' ? (
                //BOTA O ICONE DE SOL SE ESTIVER NO MODO LIGHT
                <>
                    <IoSunny
                        className={`text-my-white text-[30px]`}
                        />
                    <p className="text-my-white text-[18px] font-semibold capitalize flex-grow-[1] text-right">light mode</p>
                </>
            ):(
                //BOTA O ICONE DE LUA SE ESTIVER NO MODO DARK
                <>
                    <IoMoon
                        className={`text-my-black text-[30px]`}
                    />
                    <p className="text-my-black text-[18px] font-semibold capitalize flex-grow-[1] text-right">dark mode</p>
                </>
            )}
        </div>
    )
}