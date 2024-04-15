import { IoSadOutline } from "react-icons/io5";

import Button from "../../components/Button";
import ScreenPage from "../../components/ScreenPage";
import Text from "../../components/Text";
import TitlePage from "../../components/TitlePage";
import ToggleTheme from "../../components/ToggleTheme";
import { useMyContext } from "../../provider/geral";

export default function ErrorPage() {

    const states:any = useMyContext()
    const { theme } = states

    return(
        <ScreenPage>
            <TitlePage text="Erro" />
            
            <Text text="Sentimos muito não encontramos esta página por favor volte para a página principal" />

            <IoSadOutline
                className={`
                    text-[120px]
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                `}
            />
            
            <Button route="/" text="Voltar" />
            
            <ToggleTheme />
        </ScreenPage>
    )
}