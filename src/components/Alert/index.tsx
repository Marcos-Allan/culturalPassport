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
    const [values, setValues] = useState<number[]>([0, 101])
    
    //CONFIGURA A ANIMAÇÃO INICIAL 
    const [springs, api] = useSpring(() => ({
        from: { 
            x: `${values[0]}%` 
        },
        config:{
            duration: 5500,
        }
    }))
    
    //FUNÇÃO RESPONSÁVEL POR MUDAR A VISIBILIDADE DO MODAL
    function hideAlert() {

        //MUDA OS VALORES DA BARRA DE TEMPO
        setValues([0, 101])

        //RESETA A BARRA PARA POSIÇÃO INICIAL E DA PLAY NA ANIMAÇÃO
        api.start({
            from: { 
                x: `${values[0]}%`,
            },
            to: {
                x: `${values[1]}%`,
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
                w-[95%] border-2 rounded-[8px] px-3 py-2 pb-3 relative overflow-hidden opacity-[${opacity}] transition-opacity duration-[400ms]
            `}>
                <p className={`text-center ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{message.text}</p>

                {/* CRIA UMA DIV COM ANIMAÇÃO */}
                <animated.div
                    ref={msg}
                    style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#65e569',
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