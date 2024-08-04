//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import MenuButton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import BottomNavigation from "../../components/BottomNavigation";
import Menu from '../../components/Menu';
import MarkdownRenderer from '../../components/MarkdownRenderer';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';


export default function Content() {

    //USO DO HOOK useParams
    const { content } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, userS, toggleLoading } = states

    //UTILIZAÇÃO DO HOOK useState
    const [contentMatter, setContentMatter] = useState<string>()

    //FUNÇÃO RESPONSÁVEL POR DEIXAR O TEXTO EM CAPITALIZE
    function capitalizeText(text:string) {
        return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
      }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }

    },[])

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //SETA A URL DO CONTEUDO A SER PEGO
        setContentMatter(`https://backendculturalpassport-1.onrender.com/content/${content?.toLowerCase()}.md`)
    },[contentMatter])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`conteudo`}
                />
                <MenuButton />
            </Navbar>

            <p className={`mt-8 mb-5 text-[18px] ${theme == 'light' ? 'tetx-my-black' : 'text-my-white'}`}>Conteudos de {capitalizeText(content || 'matéria')}</p>

            <div className={`w-[90%] sm:px-12 sm:w-[70%] mb-[100px] sm:mb-[40px] lg:mb-0 flex items-center flex-col overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
                <MarkdownRenderer url={contentMatter} />
            </div>
            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}