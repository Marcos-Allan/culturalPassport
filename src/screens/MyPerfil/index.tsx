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
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../utils/firebase';

//IMPORTAÇÃO DOS ICONES
import { MdImage, MdOutlineEdit } from "react-icons/md"

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DAS IMAGENS
import avatar_1 from "../../../public/avatar-1.jpg"
import avatar_2 from "../../../public/avatar-2.jpg"
import avatar_3 from "../../../public/avatar-3.jpg"
import avatar_4 from "../../../public/avatar-4.jpg"
import avatar_5 from "../../../public/avatar-5.jpg"
import avatar_6 from "../../../public/avatar-6.jpg"
import avatar_7 from "../../../public/avatar-7.jpg"
import avatar_8 from "../../../public/avatar-8.jpg"

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar";
import Return from "../../components/Return";
import TitlePage from "../../components/TitlePage";
import Button from '../../components/Button';
import BottomNavigation from '../../components/BottomNavigation';
import AvatarImage from '../../components/AvatarImage';
import AudioPlayer from '../../components/AudioPlayer';
import ScheduledTime from '../../components/ScheduledTime';
import CronogramTable from '../../components/CronogramTable';

export default function MyPerfil() {
    //FAZ REFERENCIA A UM ELEMENTO
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //UTILIZA O HOOK useState
    const [img, setImg] = useState<string>('')
    const [imgs, setImgs] = useState<string[]>([])
    const [sounds, setSounds] = useState<string[]>([])
    const [name, setName] = useState<string>()
    const [progress, setProgress] = useState<any>(0)
    const [days, setDays] = useState<string[]>(['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'])
    
    //DEFINE O ARRAY COM OS NOMES DOS SONS
    const soundsName = ['pop', 'suave', 'suavation', 'antigo', 'simple', 'descoberta', 'simple2', 'noturno', 'assobio', 'tilt']

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, userS, toggleLoading, toggleAlert, toggleUser, timeCronogram, toggleSoundNotification, soundNotification } = states

    //FUNÇÃO RESPONSÁVEL POR LISTAR OS AVATARES
    const fetchImages = async () => {
        //FAZ UMA REFERÊNCIA AO LOCAL DE AVATARES SALVOS NA NUVEM
        const storageRef = ref(storage, '/images/avatars');

        try {
            //PEGA AS IMAGENS DENTRO DA PASTA ESPECIFICADA
            const result = await listAll(storageRef);

            //PEGA A URL DOS AVATARES
            const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
            
            //ESPERA TODOS OS AVATARES SEREM 
            const urls = await Promise.all(urlPromises);
            
            console.log(urls)
            
            //SETA AS URLS DAS IMAGENS
            setImgs(urls);
        } catch (error) {
            console.error('Erro ao listar imagens:', error);
        }
    };

    //FUNÇÃO RESPONSÁVEL POR LISTAR OS AVATARES
    const fetchSounds = async () => {
        //FAZ UMA REFERÊNCIA AO LOCAL DE AVATARES SALVOS NA NUVEM
        const storageRef = ref(storage, '/images/sounds');
        // const storageRef = ref(storage, '/images/icons-achievements');

        try {
            //PEGA AS IMAGENS DENTRO DA PASTA ESPECIFICADA
            const result = await listAll(storageRef);

            //PEGA A URL DOS AVATARES
            const urlPromises = result.items.map((sounds) => getDownloadURL(sounds));
            
            //ESPERA TODOS OS AVATARES SEREM 
            const urls = await Promise.all(urlPromises);
            
            console.log(urls)
            console.log(progress)
            
            //SETA AS URLS DOS SONS
            setSounds(urls);
        } catch (error) {
            console.error('Erro ao listar os sons:', error);
        }
    };

    //FUNÇÃO CHAMADA TODA VEZ QUE RECARREGA A PÁGINA
    useEffect(() => {
        //LISTA OS AVATARES DO SISTEMA
        fetchImages();
        
        //LISTA OS SONS DO BANCO DE DADOS
        fetchSounds()

        //COLOCA O NOME DO USUÁRIO DA CONTA
        setName(userS.name)
        
        //COLOCA A FOTO DE PERFIL DO USUÁRIO
        setImg(userS.img)

        console.log(userS.cronogram)

        //COLOCA OS DIAS DA SEMANA NO ARRAY
        setDays(['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'])
    }, []);

    //FUNÇÃO RESPONSÁVEL POR PEGAR A IMAGEM DOS ARQUIVOS DO USUÁRIO
    const handleFileIMG = () => {

        //PEGA O ARQUIVO ESCOLHIDO
        const file = inputFileRef.current?.files?.[0]

        //VERIFICA SE TEM ARQUIVO
        if(file){
            //LÊ O ARQUIVO ESCOLHIDO
            const reader = new FileReader()

            //EXECUTA A FUNÇÃO ASSIM QUE O ARQUIVO É CARREGADO
            reader.onloadend = () => {
                //SETA AS IMAGENS COMO URL
                setImg(reader.result as string)
            }
            //LÊ A URL DO ARQUIVO
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

            //FORMATA E SEPARA A STRING PARA VER MATÉRIA POR MATÉRIA DO CRONOGRAMA
            const cronogram = response.data.cronogram.split('[')[1].split(']')[0].split(',')

            //ESCREVE NO CONSOLE
            console.log(cronogram)

            //REGISTRA O NOME E A FOTO E O ID DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
            toggleUser(response.data.name, response.data.img, response.data._id, response.data.simulations, response.data.simulationsConcludeds, cronogram, soundNotification, timeCronogram)

            //COLOCA ALERT NA TELA
            toggleAlert(`success`, `Alteração feita com sucesso`);

            //LIMPA O INPUT DE ARQUIVOS
            if (inputFileRef.current) {
                inputFileRef.current.value = "";
            }
            
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

    //FUNÇÃO RESPONSÁVEL POR TROCAR A IMAGEM DO USUÁRIO
    function toggleImg(index:number){

    //CHAMA A FUNÇÃO PARA LISTAR TODOS OS AVATARES DO SISTEMA
    fetchImages();
     
    switch (index) {
        case 1:
            setImg(imgs[0])
        break;
        
        case 2:
            setImg(imgs[1])
        break;
        
        case 3:
            setImg(imgs[2])
        break;
        
        case 4:
            setImg(imgs[3])
        break;
        
        case 5:
            setImg(imgs[4])
        break;
        
        case 6:
            setImg(imgs[5])
        break;
        
        case 7:
            setImg(imgs[6])
        break;
    
        case 8:
            setImg(imgs[7])
        break;
    
        default:
            break;
    } 

    }

    //FUNÇÃO CHAMADA QUANDO A PAGINA É CARREGADA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO NÃO ESTÁ LOGADO
        if(userS.logged == false) {
            //MANDA O USUÁRIO PARA A PÁGINA HOME
            navigate('/')
        }
    }, [userS.logged])

    //FUNÇÃO RESPONSÁVEL POR PEGAR E REPRODUZIR O AUDIO
    function playAudio(sing:string) {
        //CRIA UMA NOVA INSTÂNCIA DE ÁUDIO
        const audio = new Audio(sing)

        //MUDA A VARIÁVEL PARA O NOME DO ÁUDIO PARA DEIXA-LÁ DESTACADA
        toggleSoundNotification(sing)

        //REPRODUZ O ÁUDIO
        audio.play()
    }
    
    return(
        <>
            <Navbar>   
                <Return />
                <TitlePage text={`meu perfil`} />
            </Navbar>
            <div className={`w-full flex flex-col items-center overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
                
                {userS.logged == true && (
                    <div className={`w-[90%] sm:w-[60%] flex items-center gap-[10px] mb-0 mt-4 relative`}>
                        <div className={`relative w-[80px] h-[80px]`}>
                            <img
                                src={img}
                                alt=""
                                className={`rounded-[50%] min-w-[80px] min-h-[80px] border-[1px] p-1 ${theme == 'light' ? 'border-my-terciary' : 'border-my-quintenary'}`}
                            />
                            <label className='absolute top-[-6px] right-[-6px]' htmlFor='fileArchive'>
                                <div className={`w-full flex flex-row items-center justify-between`}>
                                    <MdImage
                                        className={`
                                            hover:scale-[1.1]
                                            transition-all
                                            duration-[.3s]
                                            cursor-pointer
                                            text-[32px]
                                            rounded-[50%]
                                            p-2
                                            ${theme == 'light' ? 'text-my-white bg-my-secondary' : 'text-my-black bg-my-quintenary'}
                                        `}
                                    />
                                </div>
                            </label>
                        </div>
                        
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className={`text-[22px] w-full font-bold capitalize bg-transparent border-2 p-1 ps-2 rounded-[15px] outline-none cursor-text
                            ${theme == 'light'
                            ? 'text-my-black border-my-terciary'
                            : 'text-my-white border-my-quintenary'}
                            `}
                            value={name}
                        />
                    </div>
                )}

                <div className={`w-[90%] sm:w-[60%] flex flex-row items-center justify-center relative`}>
                    <input ref={inputFileRef} className='hidden' type="file" name="fileArchive" id="fileArchive" onChange={handleFileIMG} />
                </div>

                <h1
                    className={`text-[30px] mb-5 font-bold
                        ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                    `}
                >Avatares
                </h1>

                <div className={`px-6 mb-8 w-full sm:w-[60%] h-[160px]`}>
                    <div className="whitespace-nowrap p-4 flex items-center gap-2 overflow-scroll scrollbar-none">
                        <AvatarImage active={img == avatar_1 ? true : false} img={imgs[0]} event={() => toggleImg(1)} />
                        <AvatarImage active={img == avatar_2 ? true : false} img={imgs[1]} event={() => toggleImg(2)} />
                        <AvatarImage active={img == avatar_3 ? true : false} img={imgs[2]} event={() => toggleImg(3)} />
                        <AvatarImage active={img == avatar_4 ? true : false} img={imgs[3]} event={() => toggleImg(4)} />
                        <AvatarImage active={img == avatar_5 ? true : false} img={imgs[4]} event={() => toggleImg(5)} />
                        <AvatarImage active={img == avatar_6 ? true : false} img={imgs[5]} event={() => toggleImg(6)} />
                        <AvatarImage active={img == avatar_7 ? true : false} img={imgs[6]} event={() => toggleImg(7)} />
                        <AvatarImage active={img == avatar_8 ? true : false} img={imgs[7]} event={() => toggleImg(8)} />
                    </div>
                </div>

                <Button event={updateUser} text='Atualizar' route='undefined' />
                
                <h1 className={`text-center font-bold text-[24px] mt-4 mb-8 ${theme == 'light' ? 'text-my-secondary' : 'text-my-quintenary'}`}>Sons</h1>

                <div className={`w-[90%] sm:w-[60%] flex flex-row flex-wrap justify-center items-center`}>
                    {sounds && sounds.map((sing:string, i) => (
                        <AudioPlayer active={soundNotification == sing ? true : false} name={soundsName[i]} onClick={() => playAudio(sing)} />
                    ))}
                </div>
                
                <ScheduledTime />

                <div className='w-[90%] sm:w-[60%] mb-[100px] sm:mb-[30px] lg:mb-0'>
                    <h2
                        className={`
                            w-full text-center
                            text-[26px] my-6 rounded-[32px]
                            ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                        `}
                    >Seu Cronograma</h2>

                    <div
                        className={`
                            w-full flex flex-col items-center justify-center border-[1px] rounded-[8px] relative
                            ${theme == 'light' ? 'text-my-gray border-my-secondary' : 'text-my-gray-black border-my-quintenary'}
                        `}
                    >
                        <div
                            className={`absolute top-[-10px] right-[-10px] w-[25px] h-[25px] rounded-[50%] flex items-center justify-center cursor-pointer hover:scale-[1.2] transition-all duration-[.2s] ${theme == 'light' ? 'bg-my-terciary' : 'bg-my-quintenary'}`}
                            onClick={() => {
                                toggleUser(userS.name, userS.img, userS.id, userS.simulations, userS.simulationsConcludeds, [], userS.soundAlert, userS.timeCronograma ? [userS.timeCronograma[0], userS.timeCronograma[1]] : [7, 7])
                                navigate('/materias')
                            }}
                        >
                            <MdOutlineEdit className={`pb-[3px] text-[20px] text-my-white`}/>
                        </div>

                        {days.map((mat:any, i:number) => (
                            <CronogramTable i={i} mat={mat}  />
                        ))}
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </>
    )
}