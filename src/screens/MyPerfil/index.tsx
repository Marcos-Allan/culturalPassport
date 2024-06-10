/**
 * MIT License with Additional Restrictions
 * 
 * Copyright (c) 2024 Marcos Allan Santos Menezes
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * 2. The Software may not be used, modified, or distributed without the prior
 * written permission of the copyright holder.
 * 
 * 3. The Software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the Software or the use or other dealings in the
 * Software.
 * 
 * By using the Software, you agree to these terms and conditions.
 */

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

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
import MenuButton from "../../components/MenuButton";
import Menu from "../../components/Menu";
import Button from '../../components/Button';
import BottomNavigation from '../../components/BottomNavigation';

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
    const { theme, userS, toggleLoading, toggleAlert, toggleUser } = states

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
            console.log(response.data)

            //REGISTRA O NOME E A FOTO E O ID DO DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
            toggleUser(response.data.name, response.data.img, response.data._id)

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

    //FUNÇÃO CHAMADA TODA VEZ QUE RECARREGA A PÁGINA
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
            <Navbar>   
                <Return />
                <TitlePage text={`perfil`} />
                <MenuButton />
            </Navbar>

            {userS.logged == true && (
                //COLOCA OS DADOS DE FOTO E NOME DO USUÁRIO NA TELA
                <div className={`w-[90%] sm:w-[60%] flex items-center gap-[10px] mb-0 mt-4`}>
                    <img
                        src={img}
                        alt=""
                        className={`rounded-[50%] mb-2 w-[80px] h-[80px] border-[1px] p-1 ${theme == 'light' ? 'border-my-terciary' : 'border-my-quartenary'}`}
                    />

                    <input
                        onChange={(e) => setName(e.target.value)}
                        className={`text-[22px] w-full font-bold capitalize bg-transparent border-2 p-1 ps-2 rounded-[15px] outline-none
                        ${theme == 'light'
                        ? 'text-my-black border-my-terciary'
                        : 'text-my-white border-my-quartenary'}
                        `}
                        value={name}
                    />
                </div>
            )}

            <h1
                className={`text-[30px] mb-5 font-bold
                    ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                `}
            >Avatares
            </h1>

            <div className={`px-14 mb-8 w-full sm:w-[60%] flex justify-center flex-wrap gap-[20px]`}>
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

            <BottomNavigation />
            <Menu />
        </>

    )
}