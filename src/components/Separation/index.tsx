//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function Separation() {
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return (
        <>
            <div className={`my-8 w-full flex justify-center items-center`}>
                <div className={`flex-grow-[1] h-[2px] ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} `}/>
                <p className={`text-[24px] font-semibold pb-3 ${theme == 'light' ? 'text-my-black' : 'text-my-white'} px-3`}>
                    ou
                </p>
                <div className={`flex-grow-[1] h-[2px] ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'}`}/>
            </div>
        </>
    )
}