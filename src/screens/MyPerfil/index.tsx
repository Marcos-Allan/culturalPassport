//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DOS COMPONENTES
import ScreenPage from "../../components/ScreenPage";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DAS IMAGENS
import avatar_1 from "../../../public/avatar-1.jpg"
import avatar_2 from "../../../public/avatar-2.jpg"
import avatar_3 from "../../../public/avatar-3.jpg"
import avatar_4 from "../../../public/avatar-4.jpg"
import avatar_5 from "../../../public/avatar-5.jpg"
import avatar_6 from "../../../public/avatar-6.jpg"

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import MenuBUtton from "../../components/MenuButton";
import Menu from "../../components/Menu";
import Button from '../../components/Button';

export default function MyPerfil() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    const [img, setImg] = useState<string>('')
    const [name, setName] = useState<string>()

    //FUNÇÃO CHAMADA QUANDO A PAGINA É CARREGADA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO NÃO ESTÁ LOGADO
        if(userS.logged == false) {
            //MANDA O USUÁRIO PARA A PÁGINA HOME
            navigate('/')
        }
    }, [])

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, userS, toggleLoading, toggleAlert } = states

    function updateUser() {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true)
        
        instance.put(`/users/update/${userS.id}`, {
            name: name,
            img: img,
        }).then((response) => {
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //MOSTRA OS DADOS DA REQUISIÇÃO
            console.log(`Requisição feita com sucesso ${response.data}`)

            //COLOCA ALERT NA TELA
            toggleAlert(`success`, `Alteração feita com sucesso`)
        }).catch((error) => {
            //ESCREVE NO CONSOLE O ERRO OCORRIDO
            console.log(`Requisição feita com falhas ${error}`)
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false)
            
            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Ocorreu um erro interno no servidor`)
        })
    }

    useEffect(() => {
        setName(userS.name)
        setImg(userS.img)
    },[])

    function toggleImg(index:number){
     
    switch (index) {
        case 1:
            setImg(avatar_1)   
        break;
        
        case 2:
            setImg(avatar_2)   
        break;
        
        case 3:
            setImg(avatar_3)   
        break;
        
        case 4:
            setImg(avatar_4)   
        break;
        
        case 5:
            setImg(avatar_5)   
        break;
        
        case 6:
            setImg(avatar_6)   
        break;
    
        default:
            break;
    } 

    }

    return(
        <>
            <ScreenPage>
                <Navbar>   
                    <Return />
                    <TitlePage text={`perfil`} />
                    <MenuBUtton />
                </Navbar>

                {userS.logged == true && (
                    //COLOCA OS DADOS DE FOTO E NOME DO USUÁRIO NA TELA
                    <div className={`flex items-center gap-[10px] m-3 mb-0`}>
                        <img
                            src={img}
                            alt=""
                            className={`rounded-[50%] mb-2 w-20 h-20 border-[1px] ${theme == 'light' ? 'border-my-terciary' : 'border-my-quartenary'} p-1`}
                        />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className={`text-[22px] font-bold capitalize bg-transparent border-2 p-1 ps-2 rounded-[15px] outline-none
                            ${theme == 'light'
                            ? 'text-my-black border-my-terciary'
                            : 'text-my-white border-my-quartenary'}
                            `}
                            value={name}
                        />
                    </div>
                )}

                <h1
                    className={`
                        ${theme == 'light' ? 'text-my-black' : 'text-my-white'} text-[30px] mb-5
                    `}
                >Avatares
                </h1>

                <div className={`px-14 mb-8 w-full flex justify-center flex-wrap gap-[20px]`}>
                    <img
                        onClick={() => toggleImg(1)}
                        className={`
                            w-[90px] rounded-[50%] border-2 p-1
                            ${img == avatar_1 ? `${theme == 'light' ? 'border-my-terciary' : 'border-my-quartenary'}` : `border-transparent`}
                        `}
                        src={avatar_1} alt=""
                    />
                    <img
                        onClick={() => toggleImg(2)}
                        className={`
                            w-[90px] rounded-[50%] border-2 p-1
                            ${img == avatar_2 ? `${theme == 'light' ? 'border-my-terciary' : 'border-my-quartenary'}` : `border-transparent`}
                        `}
                        src={avatar_2} alt=""
                    />
                    <img
                        onClick={() => toggleImg(3)}
                        className={`
                            w-[90px] rounded-[50%] border-2 p-1
                            ${img == avatar_3 ? `${theme == 'light' ? 'border-my-terciary' : 'border-my-quartenary'}` : `border-transparent`}
                        `}
                        src={avatar_3} alt=""
                    />
                    <img
                        onClick={() => toggleImg(4)}
                        className={`
                            w-[90px] rounded-[50%] border-2 p-1
                            ${img == avatar_4 ? `${theme == 'light' ? 'border-my-terciary' : 'border-my-quartenary'}` : `border-transparent`}
                        `}
                        src={avatar_4} alt=""
                    />
                    <img
                        onClick={() => toggleImg(5)}
                        className={`
                            w-[90px] rounded-[50%] border-2 p-1
                            ${img == avatar_5 ? `${theme == 'light' ? 'border-my-terciary' : 'border-my-quartenary'}` : `border-transparent`}
                        `}
                        src={avatar_5} alt=""
                    />
                    <img
                        onClick={() => toggleImg(6)}
                        className={`
                            w-[90px] rounded-[50%] border-2 p-1
                            ${img == avatar_6 ? `${theme == 'light' ? 'border-my-terciary' : 'border-my-quartenary'}` : `border-transparent`}
                        `}
                        src={avatar_6} alt=""
                    />
                </div>
                <Button event={updateUser} text='Atualizar' route='undefined' />
            </ScreenPage>
            <Menu />
        </>

    )
}