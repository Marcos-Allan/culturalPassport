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
                    <p className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'} font-bold text-[36px]`}>Loading</p>
                </div>
            )}
        </>
    )
}