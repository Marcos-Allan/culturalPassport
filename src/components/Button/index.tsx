//IMPORTAÇÃO DAS BIBLIOTECAS
import { Link } from "react-router-dom"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string,
    route: string,
    event?: () => void,
    disabled?: boolean,
}

export default function Button(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        //VÊ SE A POR PROPS FOI PASSADA UMA ROTA DE NAVEGAÇÃO, SE NÃO DTERMINA A ROTA PASSADA POR PROPS
        <>
            {props.route !== 'undefined' ? (
                <Link
                    to={props.route}
                    className={`
                        rounded-[8px]
                        my-2
                        sm:my-1
                        text-center
                        p-[10px]
                        text-[24px]
                        sm:text-[18px]
                        font-medium
                        capitalize
                        w-[90%]
                        sm:w-[60%]
                        focus:bg-transparent
                        focus:outline-none
                        border-[2px]
                        ${theme == 'light'
                            ? 'bg-my-primary text-my-white border-my-primary focus:text-my-primary'
                            : 'bg-my-secondary text-my-black border-my-secondary focus:text-my-secondary'
                        }
                    `}
                >
                <p
                    className="capitalize"
                >
                    {props.text}
                </p>
                </Link>
            ):(
                //EXECUTA A FUNÇÃO PASSADA POR PROPS
                <input
                    disabled={props.disabled}
                    type="submit"
                    onClick={() => {
                        props.event && props.event()
                    }}
                    className={`
                        w-[90%]
                        sm:w-[60%]
                        my-2
                        sm:my-1
                        rounded-[8px]
                        text-center
                        p-[10px]
                        sm:p-[6px]
                        text-[24px]
                        sm:text-[16px]
                        font-medium
                        capitalize
                        focus:bg-transparent focus:outline-none border-[2px]
                        ${theme == 'light'
                            ? 'bg-my-primary disabled:bg-my-gray text-my-white border-my-primary disabled:border-my-gray focus:text-my-primary'
                            : 'bg-my-secondary disabled:bg-my-gray-black text-my-black border-my-secondary disabled:border-my-gray-black focus:text-my-secondary'
                        }
                    `}
                    value={props.text}
                />
            )}
        </>
    )
}