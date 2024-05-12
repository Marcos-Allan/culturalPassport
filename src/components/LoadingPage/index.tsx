//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function LoadingPage() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, loading } = states

    return(
        <>
            {loading == true && (
                <div className={`
                    absolute top-0 left-0 w-screen h-screen flex justify-center items-center
                    ${theme == 'light' ? 'bg-my-black-opacity' : 'bg-my-white-opacity'}
                `}>
                    <div className={`
                        w-[80px] h-[80px] bg-my-transparent rounded-[50%] border-[6px] border-t-transparent animate-spin
                        ${theme == 'light' ? 'border-my-quartenary' : 'border-my-terciary'}
                    `}></div>
                </div>
            )}
        </>
    )
}