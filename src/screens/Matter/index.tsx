//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import MenuButton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import BottomNavigation from "../../components/BottomNavigation";
import ContentCard from '../../components/ContentCard';
import Menu from '../../components/Menu';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";
import Text from '../../components/Text';

export default function Matter() {

    //USO DO HOOK useParams
    const { matter } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [content, setContent] = useState<any[]>([])
    const [loadingContent, setLoadingContent] = useState<boolean>(false)

    //FUNÇÃO RESPONSÁVEL POR DEIXAR O TEXTO EM CAPITALIZE
    function capitalizeText(text:string) {
        if (text.length === 0) return text; // Retorna a string original se estiver vazia
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    
    //FUNÇÃO RESPONSÁVEL POR LISTAR OS CONTEUDOS DISPONIVEIS
    function getContent(){
        //MUDA O ESTADO DE CARREGAMENTO DOS CONTEUDOS PARA true
        setLoadingContent(true)

        instance.get(`/matter/${matter}`)
        .then(function (response) {
            console.log(response.data)

            //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA false
            setLoadingContent(false)
            
            //LIMPA O ARRAY DE CONTEUDO DAS MATÉRIAS
            setContent([])

            //COLOCA AS MATÉRIAS CADASTRADAS NO BD NO ARRAY DE MATÉRIAS
            response.data.contents.map((content:any, i:number) => {
                setContent((cont:any) => [...cont, {
                    title: content.text,
                    background: i
                }])
            })
        })
        .catch(function (error) {
            console.log(error)
            //MUDA O ESTADO DE CARREGAMENTO DAS MATÉRIAS PARA false
            setLoadingContent(false)
        })
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[userS.logged])
    
    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //DEFINE O ARRAY COM OS CONTEUDOS
        getContent()
    },[])

    //FUNÇÃO PARA REDIRECIONAR PARA OUTRA PÁGINA
    function redirect(cont:string){

        //NAVEGA PARA A PRÓXIMA PÁGINA
        navigate(`/materias/${matter}/content/${cont}`)
    }

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`${capitalizeText(matter || 'matéria')}`}
                />
                <MenuButton />
            </Navbar>

            <p className={`w-[90%] mt-8 mb-5 text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Conteudos de {capitalizeText(matter || 'matéria')} que mais caem nos vestibulares</p>

            <div className={`w-[90%] sm:px-12 sm:w-[70%] mb-[100px] sm:mb-[40px] lg:mb-0 flex items-center flex-col overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
                {loadingContent == false && content.length > 0 && content.map((cont, i) => (
                    <ContentCard background={cont.background} title={cont.title} event={() => redirect(cont.title)} key={i} />
                ))}

                {loadingContent == false && content.length == 0 &&(
                    <div className={`flex flex-col items-center justify-start`}>
                        <Text text='Nenhuma matéria encontrada'/>
                        <IoMdSad
                            className={`text-[120px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                    </div>
                )}
                
                {loadingContent == true && (
                    <p className={`w-full text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>estamos carregando as matérias seja paciente</p>
                )}

                <Link to={`/materias/${matter}/test`}
                className={`ms-auto w-auto border-[1px] p-3 rounded-[20px] transition-all duration-[.3s] bg-transparent hover:text-my-secondary hover:border-my-secondary ${theme == 'light' ? 'text-my-black border-my-black' : 'text-my-white border-my-white'}
                `}>Fazer prova</Link>
            </div>

            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}