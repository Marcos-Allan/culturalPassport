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
import { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function Alert() {
    //REFERENCIA A CAIXA DO ALERTA
    const msg = useRef<HTMLDivElement>(null)
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()
    
    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, message } = states

    //REGISTRA ESTADOS NA APLICAÇÃO
    const [opacity, setOpacity] = useState<number>(1)
    const [background, setBackground] = useState<string>('#cdcdcd')
    
    //CONFIGURA A ANIMAÇÃO INICIAL 
    const [springs, api] = useSpring(() => ({
        from: { 
            width: '100%'
        },
        config:{
            duration: 5500,
        }
    }))
    
    //FUNÇÃO RESPONSÁVEL POR MUDAR A VISIBILIDADE DO MODAL
    function hideAlert() {

        //VERIFICA SE O TIPO DO MODAL FOI DEFINIDO
        if(message.type == 'undefined'){
            if(msg.current){
                //MUDA O ESTADO DE VISIBILIDADE DELE
                msg.current.style.display = 'none'
            }
            return 
        }else{
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
                    
                    default:
                    //MUDA A COR DA BARRA DE BACKGROUND
                    setBackground('#64a7f3')
                    break;
            }
            //RESETA A BARRA PARA POSIÇÃO INICIAL E DA INICIO A ANIMAÇÃO
            api.start({
                from: { 
                    width: `100%`,
                },
                to: {
                    width: `0%`,
                },
            })

            //PEGA A CAIXA DO ALERT NO ESTADO ATUAL
            if(msg.current){
                //MUDA O ESTADO DE VISIBILIDADE DELE E A INTANGIBILIDADE
                msg.current.style.display = 'block'
            }

            //DEIXA A CAIXA DE ALERTA VISIVEL
            setOpacity(1)
            
            //FUNÇÃO EXECUTADA DEPOIS DE 5.5 SEGUNDOS
            setTimeout(() => {
                //DEIXA A CAIXA DE ALERTA INVISIVEL
                setOpacity(0)
                
                //FUNÇÃO EXECUTADA DEPOIS DE 0.4 SEGUNDOS
                setTimeout(() => {
                    //PEGA A CAIXA DO ALERT NO ESTADO ATUAL
                    if(msg.current){
                        //MUDA O ESTADO DE VISIBILIDADE DELE E A INTANGIBILIDADE
                        msg.current.style.display = 'none'
                    }
                }, 400);

            }, 5500);
        }
    }
    
    //FUNÇÃO CHAMADA QUANDO A PÁGINA É RECARREGADA, E QUANDO TEM ALTERAÇÃO NO ESTADO DA MENSAGEM DO ALERT
    useEffect(() => {
        //MUDA A VISIBILIDADE DO MODAL
        hideAlert()
    }, [message])

    return(
        <div className={`w-full sm:w-[60%] flex flex-col items-center p-2 pt-4 absolute top-0`}>
            <div
                ref={msg}
                className={`
                ${theme == 'light' ? 'bg-my-white border-my-terciary' : 'bg-my-black border-my-quartenary'}
                w-[95%] border-2 rounded-[8px] px-3 py-2 pb-3 relative overflow-hidden ${opacity == 0 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-[400ms]
            `}>
                <p className={`text-center capitalize ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{message.text}</p>

                {/* CRIA UMA DIV COM ANIMAÇÃO */}
                <animated.div
                    ref={msg}
                    style={{
                        height: '6px',
                        backgroundColor: background,
                        position: 'absolute',
                        bottom: '0px',
                        left: '0px',
                        transition: 'left',
                        transitionDuration: '2500ms',
                        ...springs,
                    }}
                />

            </div>
        </div>
    )
}   