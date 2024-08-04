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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    img: string,
    width: string[]
}

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function ImageComponente(props: Props){

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [wid, setWid] = useState(0)
    const [hei, setHei] = useState(0)

    //FUNÇÃO RESPONSÁVEL POR TROCAR TEXTO DO PLACEHOLDER DEPENDENDO DO TAMANHO DA JANELA
    const updatePlaceholder = () => {
        //VERIFICA SE O TAMANHO DA JANELA ATUAL É MENOR QUE 1024
        if(window.innerWidth <= 640){
            //TROCA O TAMANHO DA IMAGEM
            setWid(230)
            setHei(230)
        }else if(window.innerWidth <= 1280){
            //TROCA O TAMANHO DA IMAGEM
            setWid(300)
            setHei(300)
        }else{
            //TROCA O TAMANHO DA IMAGEM
            setWid(400)
            setHei(400)
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É CARREGADA
    useEffect(() => {
        //CHAMA A FUNÇÃO QUE TROCA O TEXTO
        updatePlaceholder()

        //ADICIONA UM EVENTO DE REDIMENSIONAMENTO DE TELA NA JANELA
        window.addEventListener('resize', updatePlaceholder)

        //REMOVE O EVENTO DE REDIMENSIONAR A TELA DA JANELA AO FECHAR O COMPONENTE
        return () => window.removeEventListener('resize', updatePlaceholder)
    },[])

    return(
        <SkeletonTheme baseColor={`${theme == 'light' ? '#818181bb' : '#c0c0c0bb'}`} highlightColor={`#ffffffbb`}>
            {<img
                src={props.img}
                // className={`w-full sm:w-[60%] sm:max-w-[400px] lg:w-[100%] lg:max-w-[450px]`}
                className={`w-[${props.width[0]}%] sm:w-[${props.width[1]}%] sm:max-w-[${props.width[2]}px] lg:w-[${props.width[3]}%] lg:max-w-[${props.width[4]}px]`}
                alt=""
            /> || <Skeleton count={1} width={wid} height={hei} />}
        </SkeletonTheme>
    )
}