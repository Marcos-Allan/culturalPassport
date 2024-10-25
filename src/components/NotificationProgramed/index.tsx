/**
 * MIT License with Additional Restrictions
 * 
 * Copyright (c) 2024 Marcos Allan Santos Menezes
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * 2. The Software may not be used, modified, or distributed without the prior
 * written permission of the copyright holder.
 * 
 * 3. The Software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the Software or the use or other dealings in the
 * Software.
 * 
 * By using the Software, you agree to these terms and conditions.
 */

//IMPORAÇÃO DAS BIBLIOTECAS
import { useEffect } from 'react'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function NotificationProgramed() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { toggleAlert, timeCronogram } = states

    useEffect(() => {
        const verificarHorario = () => {
            //PEGA O TEMPO ATUAL
            const agora = new Date();
            
            //PEGA A HORA ATUAL
            const horas = agora.getHours();
            
            //PEGA OS MINUTOS ATUAIS
            const minutos = agora.getMinutes();
    
            //VERIFICA SE O TEMPO ATUAL É IGUAL AO TEMPO AGENDADO
            if (horas === Number(timeCronogram[0]) && minutos === Number(timeCronogram[1])) {
                //COLOCA ALERT NA TELA
                toggleAlert("warning", `São ${timeCronogram[0]}:${timeCronogram[1]}Hora da notificação!`);
            }
        };
    
        //CONFIGURA O INTERVALO DE TEMPO QUE CHAMA A FUNÇÃO DE 30 EM 30 SEGUNDOS
        const intervalo = setInterval(verificarHorario, 30000);
    
        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalo);
      }, []);

    return(
        <>
        </>
    )
}