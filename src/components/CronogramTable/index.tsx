//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    mat: any
    i: number
}

export default function CronogramTable(props: Props) {

    //UTILIZAÇÃO DO HOOK useState
    const days = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, userS } = states

    //FUNÇÃO RESPONSÁVEL POR VER SE O DIA DA SEMANA
    function verifyDay(word:string) {
        //PEGA O OBJETO DATA DO SISTEMA
        const date = new Date()

        //VERIFICA O DIA DA ATUAL E RETORNA true OU false
        if(word == days[date.getDay()]){
            return true
        }else{
            return false
        }
    }

    return(
        <div
            className={`
                w-full flex items-center justify-between border-[1px] py-2 px-1
                ${verifyDay(days[Number(props.i) <= 6 ? Number(props.i) : Number(props.i - 7)]) == true
                    ? `border-[4px]
                ${theme == 'light' ? 'border-my-secondary' : 'border-my-quintenary'}` : `
                ${theme == 'light' ? 'text-my-gray border-my-gray' : 'text-my-gray-black border-my-gray-black'}`}
            `}
        >
            <p
                className={`
                    text-left w-[40%] pl-2
                    ${verifyDay(days[Number(props.i) <= 6 ? Number(props.i) : Number(props.i - 7)]) == true ? `
                        ${theme == 'light' ? 'text-my-secondary font-bold' : 'text-my-quintenary font-bold'}` : `
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}
                `}
            >{props.i+1} - </p>
            
            <p
                className={`
                    text-left flex-grow-[1] uppercase
                    ${verifyDay(days[Number(props.i) <= 6 ? Number(props.i) : Number(props.i - 7)]) == true ? `
                        ${theme == 'light' ? 'text-my-secondary font-bold' : 'text-my-quintenary font-bold'}` :`
                        ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}
                `}
            >
                {props.i <= 6 ? (
                    <p>{String(days[props.i]).slice(0, 3)}</p>
                ) : (
                    <p>{String(days[props.i - 7]).slice(0, 3)}</p>
                )}
            </p>
            
            <p className={`hidden`}>{props.mat}</p>

            <p
                className={`
                    text-left w-[30%] capitalize
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    ${verifyDay(days[Number(props.i) <= 6 ? Number(props.i) : Number(props.i - 7)]) == true && `${theme == 'light' ? 'text-my-secondary font-bold' : 'text-my-quintenary font-bold'}`}
                `}
            >
                {String(userS.cronogram[props.i == 0 ? props.i : props.i == 1 ? 2 : props.i == 2 ? 4 : props.i == 3 ? 6 : props.i == 4 ? 8 : 10]).replace(/"/g, '')}, {String(userS.cronogram[props.i == 0 ? props.i+1 : props.i == 1 ? 2+1 : props.i == 2 ? 4+1 : props.i == 3 ? 6+1 : props.i == 4 ? 8+1 : 10+1]).replace(/"/g, '')}
            </p>
        </div>
    )
}