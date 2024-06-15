//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    background: number,
    title: string,
    key: number
}

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function ContentCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <div className={`w-full mb-4 flex justify-center rounded-[24px] py-4 border-2 hover:scale-[0.9] lg:hover:scale-[1.1] transition-all duration-[.3s] cursor-pointer
            ${theme == 'light' ? 'border-my-black' : 'border-my-white'}
            ${props.background == 0 || props.background == 3 || props.background == 6 ? 'bg-my-primary' : ''}
            ${props.background == 1 || props.background == 4 || props.background == 7 ? 'bg-my-secondary' : ''}
            ${props.background == 2 || props.background == 5 || props.background == 8 ? 'bg-my-terciary' : ''}
        `}>
            <p className={`capitalize font-semibold text-[18px] text-my-white`}>{props.title}</p>
        </div>
    )
}