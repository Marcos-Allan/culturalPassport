//IMPORTAÇÃO DAS BIBLIOTECAS    
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from '../../components/TitlePage'
import MenuBUtton from '../../components/MenuButton'
import Text from '../../components/Text'
import EmailInput from '../../components/EmailInput'
import Button from '../../components/Button'
import Menu from '../../components/Menu';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function ForgoutPassword() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS } = states

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == true){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/materias')
        }
    })

    return(
        <>
            <Navbar>
                <Return />
                <TitlePage
                    text={`esqueceu a senha`}
                />
                <MenuBUtton />
            </Navbar>

            <Text text={`Digite o endereço de email no campo abaixo`} />

            <form className={`mt-8 items-center flex flex-col w-[90%]`}>
                
                <EmailInput />
                <Text text={`enviaremos um código para o endereço de email digitado`} />
                    
                <Button route='/confirm-code' text={`Enviar`} />
            </form>
            <Menu />
        </>
    )
}