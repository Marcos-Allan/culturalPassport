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
import instance from '../../utils/axios';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import axios from 'axios';

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
    const [contentText, setContentText] = useState<string>()
    const [contentMatter, setContentMatter] = useState<string>()
    const [contentFB, setContentFB] = useState<string>()

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == true){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }

        console.log(contentText)

        setContentFB('https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Favatar-3.jpg?alt=media&token=b4a7632e-4803-4129-937b-4517744e23c1')

    },[])

    function getContent(){
        instance.get(`/content/${content}`)
        .then(function (response) {
            console.log(response.data)
            
            if(response.data == "Conteudo não encontrado"){
                setContentText('false')
                alert('conteudo não encontrado')
            }else{
                console.log('value:' + response.data.archive.replace(/\\/g, '/'))

                const urlFuncional = 'https://raw.githubusercontent.com/github/linguist/master/README.md'
                
                // setContentMatter(`https://backendculturalpassport-1.onrender.com/${response.data.archive.replace(/\\/g, '/')}`)
                setContentText(urlFuncional)

                // axios.get(`https://backendculturalpassport-1.onrender.com/${response.data.archive.replace(/\\/g, '/')}`)
                axios.get(urlFuncional)
                .then(function (response) {
                    console.log(response.data)
                    setContentMatter(response.data)
                })
                .catch(function (error) {
                    console.log('msgErro: ', error)
                })
            }
        })
        .catch( function (error) {
            console.log(error)
        })
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
                
                {contentMatter && (
                    <>
                        {/* <p>URL atualizada: <br />https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/content%2FPorcentagem.md?alt=media&token=b4a7632e-4803-4129-937b-4517744e23c1</p> */}
                        <MarkdownRenderer url={"https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/content%2FPorcentagem.md?alt=media&token=b4a7632e-4803-4129-937b-4517744e23c1"} />
                        <img src={contentFB} alt="" className='w-[100px] h-[100px]' />
                    </>
                )}
                {/* <iframe style={{ color: '#ff0000', backgroundColor: '#00000055' }} id='meuIframe' src={`https://backendculturalpassport-1.onrender.com/uploads/1720653724923.md`}></iframe> */}
            </div>

            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}