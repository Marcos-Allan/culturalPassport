//IMPORTAÇÃO DAS BIBLIOTECAS
import { Link } from "react-router-dom"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string,
    route: string,
    event?: () => void,
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
                        text-center
                        p-[10px]
                        text-[24px]
                        font-medium
                        capitalize
                        w-[90%]
                        focus:bg-transparent
                        focus:outline-none
                        border-[2px]
                        ${theme == 'light'
                            ? 'bg-my-primary text-my-white border-my-primary focus:text-my-primary'
                            : 'bg-my-secondary text-my-black border-my-secondary focus:text-my-secondary'
                        }
                    `}
                >
                <input
                    type="submit"
                    className="capitalize"
                    onClick={() => {
                        props.event && props.event()
                    }}
                    value={props.text}
                />
                </Link>
            ):(
                //EXECUTA A FUNÇÃO PASSADA POR PROPS
                <input
                    type="submit"
                    onClick={() => {
                        props.event && props.event()
                    }}
                    className={`
                        w-[90%]
                        my-3
                        rounded-[8px]
                        text-center
                        p-[10px]
                        text-[24px]
                        font-medium
                        capitalize
                        focus:bg-transparent focus:outline-none border-[2px]
                        ${theme == 'light'
                            ? 'bg-my-primary text-my-white border-my-primary focus:text-my-primary'
                            : 'bg-my-secondary text-my-black border-my-secondary focus:text-my-secondary'
                        }
                    `}
                    value={props.text}
                />
            )}
        </>
    )
}