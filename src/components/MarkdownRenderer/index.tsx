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
import axios from 'axios'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS COMPONENETES
import Text from '../Text';
import Button from '../Button';
import TitlePage from '../TitlePage';

//IMPORTAÇÃO DOS ICONES
import { RiEmotionSadFill } from 'react-icons/ri';

const MarkdownRenderer = ({ url }: { url:any}) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleLoading, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [markdown, setMarkdown] = useState<string>('')
    const [loadingContent, setLoadingContent] = useState<boolean>(false)

    //FUNÇÃO RESPONSÁVEL POR PEGAR O CONTEUDO
    async function getContent(url:string){
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true);
        
        //MUDA O ESTADO DE CARREGAMENTO DOS CONTEUDOS PARA true
        setLoadingContent(true)

        //INTERCEPTOR PARA LOGAR REQUISIÇÕES
        axios.interceptors.request.use(request => {
            return request;
        }, error => {
            return Promise.reject(error);
        });

        //INTERCEPTOR PARA LOGAR RESPOSTAS
        axios.interceptors.response.use(response => {
            console.log('Resposta:', response);
            return response;
        }, error => {
            if (error.response && error.response.status === 404) {
                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false);

                //MUDA O ESTADO DE CARREGAMENTO DOS CONTEUDOS PARA false
                setLoadingContent(false)
                
                //COLOCA UM ALERT NA TELA
                toggleAlert(`error`, `Conteúdo não encontrado`)
            
            }else if (error.response && error.response.status === 503) {
                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false);

                //MUDA O ESTADO DE CARREGAMENTO DOS CONTEUDOS PARA false
                setLoadingContent(false)
                
                //COLOCA UM ALERT NA TELA
                toggleAlert(`error`, `Conteúdo muito pesado`)
            } else {
                console.log('Erro na resposta:', error);
            }
            return Promise.reject(error);
        });

        axios.get(url, {
            //DETERMINA O TEMPO MÁXIMO DA REQUISIÇÃO
            timeout: 30000,
        })
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false);

            //MUDA O ESTADO DE CARREGAMENTO DOS CONTEUDOS PARA false
            setLoadingContent(false)
                
            //SETA O VALOR DO CONTEÚDO DA REQUISIÇÃO
            setMarkdown(response.data.content);
        })
        .catch(function (error) {
             // RETORNA O ERRO ESPECÍFICO OCORRIDO
             if (error) {
                console.error(`Erro: ${error}`);
            } else {
                console.error('Erro 2:', error);
            }
        })
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        // fetchWithRetry(url)
        getContent(url)
    }, [url])

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            {markdown == "" && loadingContent == true && <Text text='Estamos caregando o conteudo, por favor seja paciente' />}
            <div className={`w-full flex flex-col items-start justify-start ${theme == 'light' ? 'tetx-my-black' : 'text-my-white'}`}>
                <ReactMarkdown
                    children={markdown}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeKatex]}
                />
                {loadingContent == false && markdown == "" && (
                    <div className={`flex flex-col items-center`}>
                        <TitlePage text='Sentimos muito'/>
                        <Text text={`Desculpe Infelizmente não encontramos este conteúdo em nosso banco de dados`} />
                        <RiEmotionSadFill className={`text-[140px] mt-3 mb-4 ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                        <Button route='/materias' text='Retornar' />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MarkdownRenderer