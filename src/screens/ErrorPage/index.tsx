//IMPORTAÇÃO DOS COMPONENTES
import ScreenPage from "../../components/ScreenPage";
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import MenuBUtton from "../../components/MenuButton";
import Text from "../../components/Text";
import Button from "../../components/Button";

//IMPORTAÇÃO DOS ICONES
import { IoSadOutline } from "react-icons/io5";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral";

export default function ErrorPage() {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <ScreenPage>
            <Navbar>
                <Return />
                <TitlePage text="Erro" />
                <MenuBUtton />
            </Navbar>

            
            <Text text="Sentimos muito não encontramos esta página por favor volte para a página principal" />

            <IoSadOutline
                className={`
                    text-[120px]
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                `}
            />
            
            <Button route="/" text="Voltar" />
            
        </ScreenPage>
    )
}