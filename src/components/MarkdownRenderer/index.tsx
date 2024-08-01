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

const MarkdownRenderer = ({ url }: { url:any}) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleLoading, toggleAlert } = states

    //UTILIZAÇÃO DO HOOK useState
    const [markdown, setMarkdown] = useState<string>('')

    //FUNÇÃO RESPONSÁVEL POR PEGAR O CONTEUDO
    async function getContent(url:string){
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true);

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
                
                //COLOCA UM ALERT NA TELA
                toggleAlert(`error`, `Conteúdo não encontrado`)
            } else {
                console.log('Erro na resposta:', error);
            }
            return Promise.reject(error);
        });

        axios.get(url, {
            //DETERMINA O TEMPO MÁXIMO DA REQUISIÇÃO
            timeout: 15000,
        })
        .then(function (response) {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false);
                
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
            {markdown == "" && <Text text='Estamos caregando o conteudo, por favor seja paciente' />}
            <div className={`w-full flex flex-col items-start justify-start ${theme == 'light' ? 'tetx-my-black' : 'text-my-white'}`}>
                <ReactMarkdown
                    children={markdown}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeKatex]}
                />
            </div>
        </div>
    )
}

export default MarkdownRenderer