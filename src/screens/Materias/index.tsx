//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

import Menu from "../../components/Menu";
import MenuBUtton from "../../components/MenuButton";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";

export default function Materias() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`Materias`}
                />
                <MenuBUtton />
            </Navbar>

            <div className={`relative mt-[30px] w-[90%] h-[100px] bg-[#527fef] rounded-[8px] p-3`}>
                <p className={`text-[22px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} font-semibold`}>Matemática</p>
                <p className={`text-[10px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} font-semibold`}>Geometria plana</p>

                <div className={`rounded-[50%] w-[50px] h-[50px] ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} absolute bottom-[-12%] right-[5%] border-[3px] border-[#527fef]`}></div>
                
            </div>
            
            <div className={`relative mt-[30px] w-[90%] h-[100px] bg-[#39964a] rounded-[8px] p-3`}>
                <p className={`text-[22px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} font-semibold`}>Biologia</p>
                <p className={`text-[10px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} font-semibold`}>Reprodução Sexuada</p>

                <div className={`rounded-[50%] w-[50px] h-[50px] ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} absolute bottom-[-12%] right-[5%] border-[3px] border-[#39964a]`}></div>
                
            </div>
            
            <div className={`relative mt-[30px] w-[90%] h-[100px] bg-[#d06338] rounded-[8px] p-3`}>
                <p className={`text-[22px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} font-semibold`}>Português</p>
                <p className={`text-[10px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} font-semibold`}>Ambiguidade</p>

                <div className={`rounded-[50%] w-[50px] h-[50px] ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} absolute bottom-[-12%] right-[5%] border-[3px] border-[#d06338]`}></div>
                
            </div>
            <Menu />
        </>
    )
}