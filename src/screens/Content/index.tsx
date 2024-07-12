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

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';
import MarkdownRenderer from '../../components/MarkdownRenderer';

export default function Content() {

    //USO DO HOOK useParams
    const { matter, content } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //VERIFICA A ROTA ATUAL
    // const location = useLocation();

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS } = states

    //UTILIZAÇÃO DO HOOK useState
    const [contentMatter, setContentMatter] = useState<string>()

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == true){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }

        // 'https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Favatar-3.jpg?alt=media&token=b4a7632e-4803-4129-937b-4517744e23c1'

    },[])

    function getContent(){
        setContentMatter(`https://backendculturalpassport-1.onrender.com/content/${content?.toLowerCase()}.md`)
    }

    useEffect(() => {
        getContent()
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`${matter} content`}
                />
                <MenuButton />
            </Navbar>

            <p className={`mt-8 mb-5 text-[18px]`}>Conteudos de {content?.toUpperCase()}</p>

            <div className={`w-[90%] sm:px-12 sm:w-[70%] mb-[100px] sm:mb-[40px] lg:mb-0 flex items-center flex-col overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
                <MarkdownRenderer url={`${contentMatter}`} />
            </div>

            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}