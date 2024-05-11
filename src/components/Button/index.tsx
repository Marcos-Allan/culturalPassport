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
                        w-[90%]
                        my-3
                        rounded-[8px]
                        ${theme == 'light' ? 'bg-my-primary' : 'bg-my-secondary'}
                    `}
                >
                    <p
                        className={`
                            text-center
                            p-[10px]
                            text-[24px]
                            font-medium
                            capitalize
                            ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                        `}
                        // onClick={() => alert('Paciência é uma virtude que nem todos tem')}
                        >{props.text}</p>
                </Link>
            ):(
                //EXECUTA A FUNÇÃO PASSADA POR PROPS
                <div
                    onClick={() => {
                        props.event && props.event()
                    }}
                    className={`
                        w-[90%]
                        my-3
                        rounded-[8px]
                        ${theme == 'light' ? 'bg-my-primary' : 'bg-my-secondary'}
                    `}
                >
                    <p
                        className={`
                            text-center
                            p-[10px]
                            text-[24px]
                            font-medium
                            capitalize
                            ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                        `}
                        >{props.text}</p>
                </div>
            )}
        </>
    )
}