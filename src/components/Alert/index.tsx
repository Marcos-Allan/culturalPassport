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
                //MUDA O ESTADO E DISPLAY DELA PARA NENHUM(DEIXA INVISIVEL E INTANGÍVEL)
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
            //RESETA A BARRA PARA POSIÇÃO INICIAL E DA PLAY NA ANIMAÇÃO
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
                //MUDA O ESTADO E DISPLAY DELA PARA BLOCK
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
                        //MUDA O ESTADO E DISPLAY DELA PARA NENHUM(DEIXA INVISIVEL E INTANGÍVEL)
                        msg.current.style.display = 'none'
                    }
                }, 400);

            }, 5500);
        }
    }
    
    //FUNÇÃO CHAMADA QUANDO A PÁGINA É RECARREGADA, E QUANDO TEM ALTERAÇÃO NO ESTADO DE message
    useEffect(() => {
        //MUDA A VISIBILIDADE DO MODAL
        hideAlert()
    }, [message])

    return(
        <div className={`w-full flex flex-col items-center p-2 pt-4 absolute top-0 left-0`}>
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