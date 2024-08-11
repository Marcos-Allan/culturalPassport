//IMPORTAÇÃO DAS BIBLIOTECAS
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

//IMPORTAÇÃO DOS COMPONENTES
import MenuButton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import BottomNavigation from "../../components/BottomNavigation";
import Menu from '../../components/Menu';
import Text from '../../components/Text'; 
import MapComponent from '../../components/MapComponente';

//IMPORTAÇÃO DOS ESTILOS PARA GERAR O MAPA
import 'leaflet/dist/leaflet.css';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS ICONES
import { IoMdSad } from "react-icons/io";
import DividersButton from '../../components/DividersButton';
import Button from '../../components/Button';

export default function Travel() {

    //USO DO HOOK useParams
    const { travel } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //UTILIZAÇÃO DO HOOK useState
    const [location, setLocation] = useState<any[]>([])
    const [loadingTravel, setLoadingTravel] = useState<boolean>(false)

    //FUNÇÃO RESPONSÁVEL POR DEIXAR O TEXTO EM CAPITALIZE
    function capitalizeText(text:string) {
        if (text.length === 0) return text; // Retorna a string original se estiver vazia
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    
    //FUNÇÃO RESPONSÁVEL POR LISTAR OS CONTEUDOS DISPONIVEIS
    function getTravel(){
        //MUDA O ESTADO DE CARREGAMENTO DAS VIAGENS PARA true
        setLoadingTravel(true)

        axios.get(`https://nominatim.openstreetmap.org/search?q=${travel}&format=json&limit=1`)
        .then(function (response) {
            console.log(response.data[0].lat)
            console.log(response.data[0].lon)

            //MUDA O ESTADO DE CARREGAMENTO DAS VIAGENS PARA false
            setLoadingTravel(false)
            
            //LIMPA O ARRAY DE CONTEUDO DAS VIAGENS
            setLocation([])

            //SETA A LATITUDE E LONGITUDE DO LOCAL
            setLocation([response.data[0].lat, response.data[0].lon])
        })
        .catch(function (error) {
            console.log(error)
            //MUDA O ESTADO DE CARREGAMENTO DAS VIAGENS PARA false
            setLoadingTravel(false)
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
        //DEFINE O LOCAL DA VIAGEM
        getTravel()
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`${capitalizeText(travel || 'viagem')}`}
                />
                <MenuButton />
            </Navbar>

            <div className={`w-full flex flex-col justify-start items-center mb-[100px] sm:mb-[40px] lg:mb-0 overflow-y-scroll overflow-visible scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>


                {loadingTravel == false && location.length >= 2 && (
                    <>
                        <TitlePage text='Localização do passeio' />
                        <MapComponent position={[location[0], location[1]]} />
                    </>
                )}

                {loadingTravel == false && location.length <=1 && (
                    <>
                        <Text text='Nenhum passeio disponivel no momento'/>
                        <IoMdSad className={`text-[150px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                    </>
                )}

                {loadingTravel == true && (
                        <p className={`w-full text-center text-[18px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>estamos carregando as matérias seja paciente</p>
                )}
            </div>
            
            <BottomNavigation />
            
            <Menu />
        </>
    )
}