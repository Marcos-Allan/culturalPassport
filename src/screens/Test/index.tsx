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
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import TitlePage from '../../components/TitlePage';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Text from '../../components/Text';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS ICONES
import { IoIosArrowForward } from 'react-icons/io';
import { RiEmotionSadFill } from 'react-icons/ri';

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../../utils/axios';
import SimulationQuestion from '../../components/SimulationQuestion';
import SimulationResponses from '../../components/SimulationResponses';
import ResultTestTable from '../../components/ResultTestTable';

export default function Test() {

    //USO DO HOOK useParams
    const { matter } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, userS, toggleLoading, toggleAlert, toggleUser } = states

    //UTILIZAÇÃO DO HOOK useState
    const [questIndex, setQuestIndex] = useState<number>(0)
    const [questFinalized, setQuestFinalized] = useState<boolean>(false)
    const [percentageFinalized, setPercentageFinalized] = useState<number>(0)
    const [yourPercent, setYourPercent] = useState<number>(0)
    const [questions, setQuestions] = useState<any[]>([])
    const [yourResponse, setYourResponse] = useState<any[]>(['', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    const [correctResponse, setCorrectResponse] = useState<any[]>([])
    const [myCorrectResponse, setMyCorrectResponse] = useState<number>(0)
    const [getResultQuestion, setGetResultQuestion] = useState<boolean>(false)


    //FUNÇÃO RESPONSÁVEL POR VER SE A CONQUISTA FOI CONCLUIDA OU NÃO
    const checkAchievement = (param:string) => {
        return userS.simulations.some((item:any) => item.name === param)
    };
    
    //FUNÇÃO RESPONSÁVEL POR DEIXAR O TEXTO EM CAPITALIZE
    function capitalizeText(text:string) {
        if (text.length === 0) return text; // Retorna a string original se estiver vazia
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    //FUNÇÃO RESPONSÁVEL POR VER QUANTAS QUESTÕES O USUÁRIO ACERTOU
    function getResult(){
        let data = 0

        yourResponse.map((myResp:any, i:number) => {
            if(myResp == correctResponse[i]){
                data++
            }
        })

        //CHECA AS RESPOSTAS ACERTADAS PELO USUÁRIO
        setMyCorrectResponse(data)

        //CHECA PARA VER QUANTOS SIMULADOS O USUÁRIO TERMINOU
        if(userS.simulationsConcludeds === 0){
            //CHAMA A FUNÇÃO DE ADQUIRIR CONQUISTA
            grantAchievement('No caminho certo');
        }

        return data
    }
    
    //FUNÇÃO RESPONSÁVEL POR IR PARA A PÁGINA POSTERIOR
    function nextQuestion(i:number) {
        //VERIFICA SE O USUÁRIO JA ENVIOU A RESPOSTA OU NÃO
        if(yourResponse[i] == ''){
            toggleAlert('error', 'Escolha uma das alternativas')
            return
        }else{
            //SETA A VARIÁVEL DE ER RESULTADO PARA false
            setGetResultQuestion(false)

            //VERIFICA A QUANTIDADE DE PORCENTAGEM QUE CADA QUESTÃO VALE
            setPercentageFinalized(Number(100 / Number(questions.length)))

            //AUMENTA A PORCENTAGEM QUE O USUÁRIO FEZ DA PROVA
            setYourPercent(percentageFinalized * (questIndex + 1))

            if(Number(questIndex + 1) >= Number(questions.length)){
                //VÊ QUANTAS QUSTÕES O USUÁRIO ACERTOU
                getResult()

                //FUNÇÃO CHAMADA DEPOIS DE 0.750 SEGUNDOS
                setTimeout(() => {
                    setQuestFinalized(true)
                    console.log('acertamos: '+myCorrectResponse)
                }, 750);
            }else{
                //VAI PARA A PRÓXIMA QUESTÃO
                setQuestIndex(questIndex + 1)
                
            }
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR PEGAR AS QUESTÕES E AS OPÇÕES DE RESPOSTAS
    function getExam(){
        
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true);
        
        //SETA A PORCENTAGEM FEITA DA PROVA
        setYourPercent(0)

        instance.get(`/simulation/${matter}`)
        .then(function (response) {
            
            // LIMPA O ARRAY DOS SIMULADOS
            setQuestions([])

            //VERIFICA SE O SIMULADO EXISTE N BANCO DE DADOS
            if(response.data == ""){
                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false);
                return
            }

            //PEGA O RESULTADO DAS QUESTO~ES
            response.data.quests.map((quest:any) => {

                //COLOCA ITEM POR ITEM NO ARRAY DO SIMULADO
                setQuestions((quests) => [...quests, {
                    content: capitalizeText(matter || 'matéria'),
                    answer: quest.question,
                    questions: [
                        // `${quest.options[0].option})${quest.options[0].text}`,
                        quest.options[0],
                        quest.options[1],
                        quest.options[2],
                        quest.options[3],
                    ]
                }])

                //VERIFICA SE O ITEM É A RESPOSTA CERTA
                if(quest.options[0].correct == true){
                    //PEGA AS RESPOSTAS CERTAS DO SIMULADO
                    setCorrectResponse((responses) => [...responses, quest.options[0].option])
                }

                //VERIFICA SE O ITEM É A RESPOSTA CERTA
                if(quest.options[1].correct == true){
                    //PEGA AS RESPOSTAS CERTAS DO SIMULADO
                    setCorrectResponse((responses) => [...responses, quest.options[1].option])
                }

                //VERIFICA SE O ITEM É A RESPOSTA CERTA
                if(quest.options[2].correct == true){
                    //PEGA AS RESPOSTAS CERTAS DO SIMULADO
                    setCorrectResponse((responses) => [...responses, quest.options[2].option])
                }

                //VERIFICA SE O ITEM É A RESPOSTA CERTA
                if(quest.options[3].correct == true){
                    //PEGA AS RESPOSTAS CERTAS DO SIMULADO
                    setCorrectResponse((responses) => [...responses, quest.options[3].option])
                }
            })
            
            //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
            toggleLoading(false);

        })  
        .catch(function (error) {
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS DADOS DO USUÁRIO
    async function updateUser(conquest:any, conquestName:string) {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true);

            //FAZ UMA REQUISIÇÃO DO TIPO put PARA ATUALIZAR OS DADOS DO USUÁRIO
             instance.put(`/users/update/${userS.id}`, {
                // cronogram: JSON.stringify(cronogramS)
                simulation: conquest
            })
            .then(function(response) {

                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false);
    
                //MOSTRA OS DADOS DA REQUISIÇÃO
                console.log('servidor: '+response.data);

                //FORMATA E SEPARA A STRING PARA VER MATÉRIA POR MATÉRIA DO CRONOGRAMA
                const cronogram = response.data.cronogram.split('[')[1].split(']')[0].split(',')

                //ESCREVE NO CONSOLE
                console.log(cronogram)
    
                //REGISTRA O NOME E A FOTO E O ID DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
                toggleUser(response.data.name, response.data.img, response.data._id, response.data.simulations, response.data.simulationsConcludeds, cronogram, response.data.soundAlert, response.data.timeCronograma)
    
                //COLOCA ALERT NA TELA
                toggleAlert(`conquest`, `Conquista desbloqueada "${conquestName}"`);
            })
            .catch(function(error) {

                //ESCREVE NO CONSOLE O ERRO OCORRIDO
                console.log(`Requisição feita com falhas ${error}`);
    
                //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA false
                toggleLoading(false);
    
                //COLOCA ALERT NA TELA
                toggleAlert(`error`, `Ocorreu um erro interno no servidor`);
            })
    }

    //FUNÇÃO RESPONÁVEL POR COLOCAR AS RESPOSTAS DO USUÁRIO NO ARRAY
    const alterResponse = (value:string, ind:number) => {
        const responsesUser = yourResponse.map((response, index) => 
            index === ind ? value : response
        );
        //SETA AS RESPOSTAS NO ARRAY DE RESPOSTAS
        setYourResponse(responsesUser);
    };

    //FUNÇÃO RESPONSÁVEL POR CONCEDER A CONQUISTA AO USUÁRIO
    const grantAchievement = (name: string) => {
        //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA true
        toggleLoading(true);
        
        //VERIFICA SE O USUÁRIO JÁ TEM A CONQUISTA
        if (checkAchievement(name) !== true) {
            //FAZ A REQUISIÇÃO QUE COLOCA A CONQUISTA DESBLOQUEADA NA CONTA DO USUÁRIO
            updateUser({ name, concluded: true }, name)
        }
    };

    //FUNÇÃO RESPONSÁVEL POR PEGAR AS CONQUISTAS
    function getAchievement() {

        //MAPEIA AS CONQUISTAS COM BASE NA MATÉRIA
        const achievementsToCheck: Record<string, string> = {
            'química': 'Geovana',
            'matemática': 'Alexsandro',
            'geografia': 'Jorgina',
            'artes': 'Angreei',
            'fisíca': 'Xandão',
            'biologia': 'Renan',
            'português': 'Cida',
            'história': 'Tozi',
            'inglês': 'Leandro',
            'sociologia': 'Carol S',
            'filosofia': 'Carol F',
            'espanhol': 'Shakira Traida'
        };

        //CONCEDE A CONQUISTA ESPECIFICA DA MATÉRIA SE O USUÁRIO AINDA NÃO A TEM
        const currentAchievement = achievementsToCheck[matter as string];
        //VERIFICA SE O USUÁRIO JÁ TEM A CONQUISTA DA MATÉRIA
        if (currentAchievement) {
            grantAchievement(currentAchievement);
        }

        //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
        toggleLoading(false);

        //NAVEGA PARA A PÁGINA DE MATÉRIAS
        navigate('/materias');
    };

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
        //CHAMA A FUNÇÃO RESPONSÁVEL POR PEGAR A PROVA
        getExam()
    },[])

    return(
        <>
            {matter == 'fisíca' || matter == 'história' || matter == 'inglês' || matter == 'geografia' || matter == 'português' || matter == 'química' || matter == 'biologia' || matter == 'matemática' || matter == 'artes' || matter == 'filosofia' || matter == 'sociologia' || matter == 'espanhol' ? (
                <>
                    <Navbar>
                        <h1 className={`text-[32px] mb-[10px] w-full text-center font-bold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{capitalizeText(matter || 'matéria')} </h1>
                    </Navbar>
                    
                    {questions.length > 0 ? (
                        <div className={`w-[90%] sm:w-[60%] min-h-screen flex items-center justify-start flex-col overflow-y-scroll scrollbar-none`}>
                            
                            {questFinalized == false && (
                                <div className={`w-full border-2 ${theme == 'light' ? 'border-my-black' : 'border-my-white'} min-h-[40px] rounded-[30px] relative overflow-hidden`}>
                                    <div style={{ width: `${yourPercent}%` }} className={`transition-all duration-[.4s] min-h-[40px] bg-my-secondary w-[20%] rounded-tr-[20px] rounded-br-[20px]`}></div>
                                </div>
                            )}

                            {questFinalized == false ? (
                                <>
                                    <SimulationQuestion questIndex={questIndex} questions={questions} />

                                    <ol className='mt-3 w-full flex flex-col' type='a'>
                                        {questions[questIndex].questions.map((quest:any, i:number) => (
                                            <>
                                            <SimulationResponses alterResponse={alterResponse} getResultQuestion={getResultQuestion} i={i} quest={quest} questIndex={questIndex} setGetResultQuestion={setGetResultQuestion} yourResponse={yourResponse} />
                                            </>
                                        ))}
                                    </ol>

                                    <div className={`w-full flex mt-4 mb-[30px] ${questIndex >= 1 ? 'justify-between' : 'justify-end'}`}>

                                        <div className={`flex ml-auto self-end bg-my-secondary items-center justify-between gap-[10px] px-3 py-2 rounded-[30px] text-my-white border-[1px] border-my-secondary cursor-pointer
                                        hover:bg-transparent hover:text-my-secondary hover:border-my-secondary transition-all duration-[.3s]`} onClick={() => nextQuestion(questIndex)}>
                                            <p className={`capitalize font-medium text-[16px] flex-grow-[1]`}>{questIndex + 1 == questions.length ?'finalizar' : 'próxima questão'}</p>
                                            <IoIosArrowForward className={`text-[18px]`} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <ResultTestTable correctResponse={correctResponse} getAchievement={() => getAchievement()} myCorrectResponse={myCorrectResponse} questions={questions} yourResponse={yourResponse} />
                            )}
                        </div>
                    ):(
                        <p className={`text-[22px] text-center w-[80%] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}>
                            estamos carregando o simulado por favor aguarde
                        </p>
                    )}
                </>
            ) : (
                <div className={`w-[90%] mt-5 flex flex-col items-center`}>
                    <TitlePage text='Sentimos muito'/>
                    <Text text={`Desculpe Infelizmente não temos provas desta matéria ${capitalizeText(matter || 'matéria')} não é a nossa praia`} />
                    <RiEmotionSadFill className={`text-[140px] mt-3 mb-4 ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                    <Button route='/materias' text='Retornar' />
                </div>
            )}
        </>
    )
}