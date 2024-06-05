//IMPORTAÇÃO DAS BIBLIOTECAS    
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS ICONES
import { IoMdSend, IoIosAdd } from 'react-icons/io'

//IMPORTAÇÃO DOS COMPONENTES
import BottomNavigation from "../../components/BottomNavigation";
import Menu from "../../components/Menu";
import MenuBUtton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Chat() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[])

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Chat`}
                />
                <MenuBUtton />
            </Navbar>

            <div className={`${theme == 'light' ? 'bg-my-white' : 'bg-my-black'} w-[90%] pt-[30px] h-[calc(100%-190px)] flex flex-col gap-[20px]`}>
                
                {/* MENSAGEM CASO A MENSAGEM FOR DE OUTRO USUÁRIO */}
                <div className={`self-start border-2 ${theme == 'light' ? 'border-my-gray' : 'border-my-gray-black' } p-1 max-w-[200px] rounded-[10px] rounded-es-[0px]`}>
                    <span className={`text-[#3d4efe] font-black text-[14px]`}>Marcos A</span>
                    <p className={`text-[16px] font-light ${theme == 'light' ? 'text-my-black' : 'text-my-white'} pt-1`}>Mano fizemo um sistema de chat sozinho sem ajuda</p>
                </div>
                
                {/* MENSAGEM CASO A MENSAGEM FOR SUA */}
                <div className={`self-end border-2 border-my-gray p-1 max-w-[200px] rounded-[10px] rounded-ee-[0px]`}>
                    <p className={`text-[16px] font-light ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>poisé mano SOZINHO como sempre</p>
                </div>
            </div>

            <form className={`fixed bottom-[95px] border-2 border-my-secondary rounded-[20px] w-[95%] mt-1 flex flex-row items-center gap-1`} onSubmit={(e) => e.preventDefault()}>
                
                <div className={`rounded-[50%] flex items-center justify-center p-1 bg-my-secondary ms-1`}>
                    <IoIosAdd className={`text-[24px] text-my-white`} />
                </div>

                <input className={`${theme == 'light' ? 'placeholder:text-my-gray text-my-black' : 'placeholder:text-my-gray-black text-my-white'} bg-transparent rounded-[18px] flex-grow-[1] py-[6px] focus:outline-none focus:border-my-secondary focus:text-my-black`} type="text" name="text" id="text" placeholder='Digite algo' />


                <div className={`rounded-[50%] flex items-center justify-center p-1 bg-my-secondary me-1`}>
                    <IoMdSend className={`ps-[2px] text-[24px] text-my-white`} />
                </div> 

            </form>

            <BottomNavigation />
            
            <Menu />
        </>
    )
}