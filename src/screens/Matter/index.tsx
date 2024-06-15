//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

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

export default function Matter() {

    //USO DO HOOK useParams
    const { matter } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //VERIFICA A ROTA ATUAL
    const location = useLocation();

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS } = states

    //UTILIZAÇÃO DO HOOK useState
    const [content, setContent] = useState<any[]>([])

    //FUNÇÃO RESPONSÁVEL POR GERAR O CONTEÚDO DEPENDENDO DO PARÂMETRO PASSADO
    function getContent(matter:string) {
        switch (matter) {
            case 'fis%C3%ADca':
                //FISICA
                    setContent([
                        { title: 'eletrodinamica', background: 0 },
                        { title: 'leis de newton', background: 1 },
                        { title: 'ondulatória', background: 2 },
                        { title: 'campo magnético', background: 3 },
                        { title: 'cinemática', background: 4 },
                        { title: 'óptica', background: 5 },
                        { title: 'mecânica', background: 6 },
                        { title: 'circuitos elétricos', background: 7 }
                    ])
                    break;
                case 'hist%C3%B3ria':
                    //HISTÓRIA
                    setContent([
                        { title: 'brasil colônia', background: 0 },
                        { title: 'idade moderna', background: 1 },
                        { title: 'idade média', background: 2 },
                        { title: 'tempo presente', background: 3 },
                        { title: 'estado novo e populismo', background: 4 }
                    ])
                    break;
                case 'ingl%C3%AAs':
                    //INGLÊS
                    setContent([
                        { title: 'tempos verbais em inglês', background: 0 },
                        { title: 'voz passiva em ingles', background: 1 },
                        { title: 'pronomes pessoais', background: 2 },
                        { title: 'Linking words', background: 3 }
                    ])
                    break;
                case 'geografia':
                    //GEOGRAFIA
                    setContent([
                        { title: 'cartografia e leitura de mapas', background: 0 },
                        { title: 'climas do brasil e climas do mundo', background: 1 },
                        { title: 'acordo de paris e conferências ambientais', background: 2 },
                        { title: 'aquecimento global e efeito estufa', background: 3 },
                        { title: 'estruturas geológicas e tipos de relevo', background: 4 },
                        { title: 'biomas do brasil e biomas do mundo', background: 5 },
                        { title: 'matriz de transporte', background: 6 },
                        { title: 'bacias hidrográficas e escassez', background: 7 },
                    ])
                    break;
                case 'artes':
                    //ARTES
                    setContent([
                        { title: 'arte contemporânea', background: 0 },
                        { title: 'convenções teatrais', background: 1 },
                        { title: 'folcloreve folguedos populares', background: 2 },
                        { title: 'tradições de povos indigenas', background: 3 },
                        { title: 'arte de origem africana no brasil', background: 4 }
                    ])
                    break;
                case 'portugu%C3%AAs':
                    //PORTUGUÊS
                    setContent([
                        { title: 'variação linguistica', background: 0 },
                        { title: 'genêros textuais', background: 1 },
                        { title: 'intertextualidade', background: 2 },
                        { title: 'figuras de linguagem', background: 3 }
                    ])
                    break;
                case 'qu%C3%ADmica':
                    //QUÍMICA
                    setContent([
                        { title: 'estudo de moléculas', background: 0 },
                        { title: 'química orgânica', background: 1 },
                        { title: 'reações inorgânicas', background: 2 },
                        { title: 'soluções - concentrações', background: 3 },
                        { title: 'cálculos - estequiométricos', background: 4 },
                        { title: 'eletroquímica', background: 5 },
                        { title: 'termoquímica', background: 6 },
                        { title: 'poluição ambiental', background: 7 },
                    ])
                    break;
                case 'biologia':
                    //BIOLOGIA
                    setContent([
                        { title: 'ecologia', background: 0 },
                        { title: 'fisiologia humana', background: 1 },
                        { title: 'biotecnologia', background: 2 },
                        { title: 'biologia celular', background: 3 },
                        { title: 'botânica', background: 4 },
                    ])
                    break;
                case 'matem%C3%A1tica':
                    //MAEMÁTICA
                    setContent([
                        { title: 'analise combinatória', background: 0 },
                        { title: 'porcentagem', background: 1 },
                        { title: 'geometria plana e geometria espacial', background: 2 },
                        { title: 'razão e proporção', background: 3 },
                        { title: 'equações e funções', background: 4 },
                        { title: 'estatística e probabilidade', background: 5 }
                    ])
                break;
        
            default:
                break;
        }
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }

        //DEFINE O ARRAY COM OS CONTEUDOS
        getContent(location.pathname.split('/')[2])
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`${matter}`}
                />
                <MenuButton />
            </Navbar>

            <p className={`mt-8 mb-5 text-[18px]`}>Conteudos que mais caem no ENEM</p>

            <div className={`w-[90%] sm:w-[70%] flex items-center flex-col`}>
                {content.map((cont, i) => (
                    <ContentCard background={cont.background} title={cont.title} key={i} />
                    ))}
            </div>
            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}