//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function ScheduledTime() {
    
    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, userS } = states
    
    return(
        <p
            className={`mt-4 text-[30px] ${theme == 'light' ? 'text-my-terciary' : 'text-my-quintenary'}`}
        >
            Horário programado: {userS.timeCronograma[0] >= 0 && userS.timeCronograma[0] <= 9 ? `0${userS.timeCronograma[0]}` : `${userS.timeCronograma[0]}`}:{userS.timeCronograma[1] >= 0 && userS.timeCronograma[1] <= 9 ? `0${userS.timeCronograma[1]}` : `${userS.timeCronograma[1]}`}
        </p>
    )
}