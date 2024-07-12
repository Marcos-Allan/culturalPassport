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
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';

//IMPORTAÇÃO DAS BIBLIOTECAS DO FIREBASE
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';

//IMPORTAÇÃO DOS ICONES
import { MdImage } from "react-icons/md";

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
import AvatarImage from '../../components/AvatarImage';
import InfoStudentCard from '../../components/InfoStudentCard';

export default function MyPerfil() {
    //FAZ REFERENCIA A UM ELEMENTO
    const inputFileRef = useRef<HTMLInputElement | null>(null)


    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //UTILIZA O HOOK useState
    const [img, setImg] = useState<string>('')
    const [name, setName] = useState<string>()
    const [imgURL, setImgURL] = useState<string>('')
    const [progress, setProgress] = useState<any>(0)

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

    const handleFileIMG = () => {
        const file = inputFileRef.current?.files?.[0]

        if(file){
            const reader = new FileReader()
            reader.onloadend = () => {
                setImg(reader.result as string)
                setImgURL(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // FUNÇÃO RESPONSÁVEL POR DAR UPLOAD NA IMAGEM
    async function handleUpload() {
        //CRIA UMA PROMISSE 
        return new Promise((resolve, reject) => {
            //PEGA O ARQUIVO QUE FOI SELECIONADO
            const file = inputFileRef.current?.files?.[0];

            //VERIFICA SE NÃO TEM IMAGEM
            if (!file) {
                //RESOLVE A PROMEISSE PASSANDO A IMAGEM COMO PARÂMETRO
                resolve(img);
            } else {
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        //PEGA A PORCENTAGEM DO UPLOAD DA IMAGEM
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                        //SETA O PROGRESSO EM PORCENTAGEM
                        setProgress(progress);
                    },
                    error => {
                        //DA UM ALERTA CASO OCORRA UM ERRO
                        alert(error);
                        
                        //FINALIZA A PROMISSE ABORTANDO E PASSANDO O ERRO OCORRIDO COMO PARÂMETRO
                        reject(error);
                    },
                    () => {
                        //PEGA A URL DA IMAGEM QUE FOI SALVA NO BANCO DE DADOS
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(url => {
                                //SETA A URL DA IMAGEM
                                setImgURL(url);
                                setImg(url);

                                //RESOLVE A PROMESSA PASSANDO A IMAGEM COMO PARÂMETRO
                                resolve(url);
                            })
                            .catch(error => {
                                //DA UM ALERTA CASO OCORRA UM ERRO
                                alert(error);

                                //FINALIZA A PROMISSE ABORTANDO E PASSANDO O ERRO OCORRIDO COMO PARÂMETRO
                                reject(error);
                            });
                    }
                );
            }
        });
    }

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS DADOS DO USUÁRIO
    async function updateUser() {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true);

        try {
            //FAZ UPLOAD DA IMAGEM QUE O USUÁRIO ESCOLHEU E AGUARDA A CONCLUSÃO
            const imageURL = await handleUpload();

            //FAZ UMA REQUISIÇÃO DO TIPO put PARA ATUALIZAR OS DADOS DO USUÁRIO
            const response = await instance.put(`/users/update/${userS.id}`, {
                name: name,
                img: imageURL,
            });

            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false);

            //MOSTRA OS DADOS DA REQUISIÇÃO
            console.log(response.data);

            //REGISTRA O NOME E A FOTO E O ID DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
            toggleUser(response.data.name, response.data.img, response.data._id);

            //COLOCA ALERT NA TELA
            toggleAlert(`success`, `Alteração feita com sucesso`);

            //LIMPA O INPUT DE ARQUIVOS
            if (inputFileRef.current) {
                inputFileRef.current.value = "";
            }

            //RESETA A URL DA IMAGEM
            setImgURL('')
            
            //RESETA A PORCENTAGEM DO PROGRESSO
            setProgress(0)
        } catch (error) {
            //ESCREVE NO CONSOLE O ERRO OCORRIDO
            console.log(`Requisição feita com falhas ${error}`);

            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false);

            //COLOCA ALERT NA TELA
            toggleAlert(`error`, `Ocorreu um erro interno no servidor`);
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE RECARREGA A PÁGINA
    useEffect(() => {
        setName(userS.name)
        setImg(userS.img)
    },[])

    //FUNÇÃO RESPONSÁVEL POR TROCAR A IMAGEM DO USUÁRIO
    function toggleImg(index:number){
     
    switch (index) {
        case 1:
            setImg('https://cultural-passport.vercel.app/avatar-1.jpg')
        break;
        
        case 2:
            setImg('https://cultural-passport.vercel.app/avatar-2.jpg')
        break;
        
        case 3:
            setImg('https://cultural-passport.vercel.app/avatar-3.jpg')
        break;
        
        case 4:
            setImg('https://cultural-passport.vercel.app/avatar-4.jpg')
        break;
        
        case 5:
            setImg('https://cultural-passport.vercel.app/avatar-5.jpg')
        break;
        
        case 6:
            setImg('https://cultural-passport.vercel.app/avatar-6.jpg')
        break;
    
        default:
            break;
    } 

    }

    return(
        <>
            <Navbar>   
                <Return />
                <TitlePage text={`meu perfil`} />
                <MenuButton />
            </Navbar>
            <div className={`w-full flex flex-col items-center overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>

                {userS.logged == true && (
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

                <div className={`w-[90%] sm:w-[60%] flex flex-row items-center justify-center relative`}>
                    <label className='w-[90%]' htmlFor='fileArchive'>
                        <div className={`w-full my-[20px] flex flex-row items-center justify-between`}>
                            <MdImage
                                className={`
                                    hover:scale-[1.1]
                                    transition-all
                                    duration-[.3s]
                                    cursor-pointer
                                    text-[64px]
                                    rounded-[50%]
                                    border-[2px]
                                    p-2
                                    ${imgURL ? 'text-[#00ff00] border-[#00ff00]' : `${theme == 'light' ? 'text-my-gray border-my-gray' : 'text-my-gray-black border-my-gray-black'}`}
                                    ${theme == 'light' ? '' : ''}
                                `}
                            />
                            <p
                                className={`
                                    text-[20px]
                                    font-extralight
                                    hover:scale-[1.1]
                                    transition-all
                                    duration-[.3s]
                                    cursor-pointer
                                    ${imgURL ? 'text-[#00ff00]' : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}
                                `}  
                            >{imgURL ? 'imagem selecionada' : 'Nenhuma imagem selecionada'}</p>
                            <p
                                className={`
                                text-[22px]
                                font-semibold
                                hover:scale-[1.1]
                                transition-all
                                duration-[.3s]
                                cursor-pointer
                                    ${progress == 100 ? 'text-[#00ff00]' : `${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}
                                `}
                                >{progress}%</p>
                        </div>
                    </label>
                    <input ref={inputFileRef} className='hidden' type="file" name="fileArchive" id="fileArchive" onChange={handleFileIMG} />
                    {/* {imgURL && <img src={imgURL} alt='imagem que fez upload' width={'200px'} height={'200px'} />} */}
                </div>

                <h1
                    className={`text-[30px] mb-5 font-bold
                        ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                    `}
                >Avatares
                </h1>

                <div className={`px-14 mb-8 w-full sm:w-[60%] flex justify-center flex-wrap gap-[20px]`}>
                    
                    <AvatarImage active={img == avatar_1 ? true : false} img={avatar_1} event={() => toggleImg(1)} />
                    <AvatarImage active={img == avatar_2 ? true : false} img={avatar_2} event={() => toggleImg(2)} />
                    <AvatarImage active={img == avatar_3 ? true : false} img={avatar_3} event={() => toggleImg(3)} />
                    <AvatarImage active={img == avatar_4 ? true : false} img={avatar_4} event={() => toggleImg(4)} />
                    <AvatarImage active={img == avatar_5 ? true : false} img={avatar_5} event={() => toggleImg(5)} />
                    <AvatarImage active={img == avatar_6 ? true : false} img={avatar_6} event={() => toggleImg(6)} />

                </div>

                <Button event={updateUser} text='Atualizar' route='undefined' />
                
                <div className='w-[90%] sm:w-[60%] mb-[90px] sm:mb-[30px] lg:mb-0'>
                    <h2
                        className={`
                            w-full text-center
                            text-[26px] my-6 rounded-[32px]
                            ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                        `}>Informações Pessoais</h2>

                    <InfoStudentCard prop='Escola' value='ETEC paulistano' />
                    <InfoStudentCard prop='RM' value='22043' />
                    <InfoStudentCard prop='Data de Nascimento' value='11/06/2006' />
                    <InfoStudentCard prop='CPF' value='393.223.189-43' />
                </div>
            </div>

            <BottomNavigation />
            <Menu />
        </>

    )
}