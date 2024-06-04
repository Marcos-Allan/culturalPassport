//IMPORTAÇÃO DOS ICONES
import { IoIosNotificationsOutline, IoIosCloseCircle } from "react-icons/io"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//TIPAGEM DAS PROPS DAS NOTIFICAÇÕES
interface Props {
    materia: string,
    content: string,
    event?: () => any
}

export default function NotificationCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <div className={`w-[90%] flex flex-row items-center justify-between p-2 rounded-[6px] border-2 ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black'}`}>
            
            <div className={`flex flex-row justify-start items-center truncate w-[35%] me-6`}>
                <IoIosNotificationsOutline className={`text-my-secondary text-[38px]`} />
                <p className={`capitalize ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.materia}</p>
            </div>

            <div className={`flex justify-start items-center w-[65%]`}>
                <div className={`w-[18px] h-[18px] rounded-[50%] me-2 ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'}`}></div>
                <p className={`truncate capitalize text-left text-[14px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{props.content}</p>
            </div>

            <IoIosCloseCircle className={`text-my-secondary text-[38px]`}
                onClick={() => {
                    props.event && props.event()
                }}
            />
        </div>
    )
}5