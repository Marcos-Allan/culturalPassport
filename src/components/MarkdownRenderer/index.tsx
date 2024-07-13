//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import axios from 'axios'


//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS COMPONENETES
import Text from '../Text';

const MarkdownRenderer = ({ url }: { url:any}) => {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, toggleLoading } = states

    //UTILIZAÇÃO DO HOOK useState
    const [markdown, setMarkdown] = useState<string>('')

    //FUNÇÃO RESPONSÁVEL POR FAZER UM LOOP ATÉ PEGAR O CONTEUDO 
    async function fetchWithRetry(url:string, retries = 40, delay = 2000) {
        for (let i = 0; i < retries; i++) {
            try {
                // PEGA A RESPOSTA DA REQUISIÇÃO
                const response = await axios.get(url);
                
                // MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false);
                
                // SETA O VALOR DO CONTEÚDO DA REQUISIÇÃO
                setMarkdown(response.data.content);
                
                // ENCERRA O LOOP RETORNANDO A RESPOSTA DA REQUISIÇÃO
                return response.data.content;
            } catch (error:any) {
                // RETORNA O ERRO ESPECÍFICO OCORRIDO
                if (error.response) {
                    console.error(`Erro ${error.response.status}: ${error.response.statusText}`);
                } else {
                    console.error('Erro:', error.message);
                }
            }
            // FAZ UMA NOVA PROMESSA PARA REPETIR A FUNÇÃO
            await new Promise(res => setTimeout(res, delay));
        }
    
        // RETORNA ERRO DEPOIS DE MUITAS TENTATIVAS EXCEDIDAS
        throw new Error('Falha após várias tentativas');
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        fetchWithRetry(url)
    }, [url])

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            {markdown == "" && <Text text='Estamos caregando o conteudo, por favor seja paciente' />}
            <div className={`w-full flex flex-col items-start justify-start ${theme == 'light' ? 'tetx-my-black' : 'text-my-white'}`}>
                <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
            </div>
        </div>
    )
}

export default MarkdownRenderer