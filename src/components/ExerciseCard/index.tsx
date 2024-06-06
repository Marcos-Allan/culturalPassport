//IMPORTAÇÃO DOS ICONES
import { BsAirplane } from 'react-icons/bs';
import { FiBook } from 'react-icons/fi';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    type: string,
    title: string,
    materia: string,
    concluded: boolean
}

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function ExerciseCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <div className={`w-[90%] border-2 my-2 ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'} p-3 rounded-[16px] flex items-center justify-center`}>
                
            <div className={`flex-grow-[1] flex flex-col`}>
                <h1 className={`capitalize font-bold text-[20px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.title}</h1>
                <p className={`capitalize text-[16px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}>{props.materia}</p>
            </div>

            {props.type == 'travel' ? (
                <BsAirplane className={`${props.concluded == true ? 'text-[#00ff00]' : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} text-[28px]`} />
            ) : (
                <FiBook className={`${props.concluded == true ? 'text-[#00ff00]' : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} text-[28px]`} />
            )}
        </div>
    )
}