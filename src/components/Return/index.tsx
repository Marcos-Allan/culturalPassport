//IMPORTAÇÃO DAS BIBLIOTECAS
import { useNavigate } from 'react-router-dom'

//IMPORTAÇÃO DOS ICONES
import { IoArrowBackOutline } from "react-icons/io5";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function Return() {
    
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states
    
    //FUNÇÃO RESPONSÁVEL POR VOLTAR PARA A PÁGINA ANTERIOR
    function previousPage() {
        navigate(-1)
    }

    return(
        <IoArrowBackOutline
            onClick={previousPage}
            className={`
            text-[55px] pt-4
                ${theme == 'light'
                ? 'text-my-black'
                : 'text-my-white'
                }
            `}
        />
    )
}