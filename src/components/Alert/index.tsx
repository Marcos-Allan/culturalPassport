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

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DO ESTILO DA BIBLIOTECA react-toastify
import 'react-toastify/dist/ReactToastify.css';

export default function Alert() {
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()
    
    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, message } = states

    //REGISTRA ESTADOS NA APLICAÇÃO
    const [background, setBackground] = useState<string>('')
    
    //FUNÇÃO RESPONSÁVEL POR MUDAR A VISIBILIDADE DO MODAL
    function hideAlert() {
        //SWITCH CASE DOS TIPOS DA BARRA
        switch (message.type) {
            case 'error':
                //MUDA A COR DA BARRA DE BACKGROUND
                setBackground('#e64f4f')
            break;
                
            case 'success':
                //MUDA A COR DA BARRA DE BACKGROUND
                setBackground('#84cd8e')
            break;
            
            case 'conquest':
                //MUDA A COR DA BARRA DE BACKGROUND
                setBackground('#a049ec')
            break;
        
            case 'warning':
                //MUDA A COR DA BARRA DE BACKGROUND
                setBackground('#dffa10')
            break;
            
            default:
                //MUDA A COR DA BARRA DE BACKGROUND
                setBackground('#64a7f3')
            break;
        }
    }
    
    //FUNÇÃO CHAMADA QUANDO A PÁGINA É RECARREGADA, E QUANDO TEM ALTERAÇÃO NO ESTADO DA MENSAGEM DO ALERT
    useEffect(() => {
        //CHAMA A FUNÇÃO QUE DEFINE A COR DO MODAL
        hideAlert()
    }, [message])
        
    useEffect(() => {
        //CHAMA O MODAL
        if(message.text == 'Alert simples'){
            return
        }else{
            notify(message.text)
        }
    }, [message])

    const notify = (text:string) => toast(text, {
        theme: theme,
    })

    return(
        <>
            {message.type !== 'conquest' ? (
                <ToastContainer
                    limit={1}
                    autoClose={5000}
                    progressStyle={{ backgroundColor: background }}
                />
            ):(
                <ToastContainer
                    limit={1}
                    autoClose={5000} // Define o tempo de fechamento automático do toast (5 segundos)
                    progressStyle={{
                        background: 'linear-gradient(90deg, #FF5733, #FFC300, #DAF7A6, #33FF57)',
                        backgroundSize: '100% 100%', // Tamanho do gradiente para preencher a barra
                    }}
                />
            )}
        </>
    )
}   