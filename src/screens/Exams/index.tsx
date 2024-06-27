//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from '../../components/Navbar';
import Return from '../../components/Return';
import TitlePage from '../../components/TitlePage';
import MenuButton from '../../components/MenuButton';
import Menu from '../../components/Menu';
import BottomNavigation from '../../components/BottomNavigation';
import ContentCard from '../../components/ContentCard';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Exams() {
    
    //USO DO HOOK useParams
    const { matter } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS } = states

    //UTILIZAÇÃO DO HOOK useState
    const [content, setContent] = useState<any[]>([])

    //FUNÇÃO PARA REDIRECIONAR PARA OUTRA PÁGINA
    function redirect(vest:string){

        //FORMATA O CAMPO PARA DEIXAR APENAS AS INICIAIS DO VESTIBULAR
        const vestibular = vest.split(' ')[0].toLowerCase()

        //NAVEGA PARA A PRÓXIMA PÁGINA
        navigate(`/materias/${matter}/${vestibular}`)
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }

        //DEFINE O ARRAY COM OS CONTEUDOS
        setContent([
            { title: 'Enem (Exame Nacional do Ensino Médio)', background: 0 },
            { title: 'Fuvest (Fundação Universitária para o vestibular)', background: 1 },
            { title: 'UFPA (Universidade Federal do Pará)', background: 2 },
            { title: 'Unesp (Universidade Estadual Paulista)', background: 3 },
            { title: 'UEPA (Universidade Estadual do Pará)', background: 4 },
            { title: 'UERJ (Universidade Estadual do Rio de Janeiro)', background: 5 },
            { title: 'Unicamp (Universidade Estadual de Campinas)', background: 6 },
            { title: 'UFPR (Universidade Federal do Paraná)', background: 7 }
        ])
    },[])

    return (
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`${matter}`}
                />
                <MenuButton />
            </Navbar>

            <p className={`mt-8 mb-5 text-[18px]`}>Escolha um vestibular de sua preferência</p>

            <div className={`w-[90%] h-auto sm:px-12 sm:w-[70%] mb-[100px] lg:mb-0 flex items-center flex-col overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
                {content.map((cont, i) => (
                    <ContentCard background={cont.background} title={cont.title} event={() => redirect(cont.title)} key={i} />
                ))}
            </div>

            <BottomNavigation />
            
            <Menu />
        </>
    )
}