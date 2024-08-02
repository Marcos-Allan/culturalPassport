//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import TitlePage from '../../components/TitlePage';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS ICONES
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiEmotionHappyFill, RiEmotionSadFill } from 'react-icons/ri';
import Text from '../../components/Text';
import instance from '../../utils/axios';

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
    const [yourResponse, setYourResponse] = useState<any[]>(['', '', '', '', ''])
    const [correctResponse, setCorrectResponse] = useState<any[]>([])
    
    //FUNÇÃO RESPONSÁVEL POR IR PARA A PÁGINA POSTERIOR
    function nextQuestion() {
        //VERIFICA A QUANTIDADE DE PORCENTAGEM QUE CADA QUESTÃO VALE
        setPercentageFinalized(Number(100 / Number(questions.length)))

        //AUMENTA A PORCENTAGEM QUE O USUÁRIO FEZ DA PROVA
        setYourPercent(percentageFinalized * (questIndex + 1))

        if(Number(questIndex + 1) >= Number(questions.length)){
            //FUNÇÃO CHAMADA DEPOIS DE 0.750 SEGUNDOS
            setTimeout(() => {
                setQuestFinalized(true)
            }, 750);
        }else{
            //VAI PARA A PRÓXIMA QUESTÃO
            setQuestIndex(questIndex + 1)
            
        }
    }

    //FUNÇÃO RESPONSÁVEL POR VOLTAR PARA A PÁGINA ANTERIOR
    function prevQuestion() {
        //VERIFICA A QUANTIDADE DE PORCENTAGEM QUE CADA QUESTÃO VALE
        setPercentageFinalized(Number(100 / Number(questions.length)))

        //DIMINUI A PORCENTAGEM QUE O USUÁRIO FEZ DA PROVA
        setYourPercent(percentageFinalized * (questIndex - 1))

        if(Number(questIndex) == 0){
            setQuestFinalized(true)
        }else{
            //VOLTA PARA A QUESTÃO ANTERIOR
            setQuestIndex(questIndex - 1)
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

            //PEGA O RESULTADO DAS QUESTO~ES
            response.data.quests.map((quest:any, ind:number) => {

                //COLOCA ITEM POR ITEM NO ARRAY DO SIMULADO
                setQuestions((quests) => [...quests, {
                    content: matter,
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
    async function updateUser(conquest:any) {
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
                console.log(response.data);

                //FORMATA E SEPARA A STRING PARA VER MATÉRIA POR MATÉRIA DO CRONOGRAMA
                const cronogram = response.data.cronogram.split('[')[1].split(']')[0].split(',')

                //ESCREVE NO CONSOLE
                console.log(cronogram)
    
                //REGISTRA O NOME E A FOTO E O ID DO USUARIO LOGADO PARA MOSTRAR NO FRONT-END
                toggleUser(response.data.name, response.data.img, response.data._id, response.data.simulations, response.data.simulationsConcludeds, cronogram)
    
                //COLOCA ALERT NA TELA
                toggleAlert(`success`, `Alteração feita com sucesso`);
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
        const novasFrutas = yourResponse.map((response, index) => 
            index === ind ? value : response
        );
        setYourResponse(novasFrutas);
    };



    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }

        //CHAMA A FUNÇÃO RESPONSÁVEL POR PEGAR A PROVA
        getExam()
    },[])

    return(
        <>
            {matter == 'fisíca' || matter == 'matemática' ? (
                <>
                    <Navbar>
                        <TitlePage text={`${matter}`} />
                    </Navbar>
                    
                    {questions.length > 0 ? (
                        <div className={`w-[90%] sm:w-[60%] pe-6 h-[2800px] flex items-center justify-start flex-col overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
                            
                            {questFinalized == false && (
                                <div className={`w-full border-2 ${theme == 'light' ? 'border-my-black' : 'border-my-white'} min-h-[40px] rounded-[30px] relative overflow-hidden`}>
                                    <div style={{ width: `${yourPercent}%` }} className={`transition-all duration-[.4s] min-h-[40px] bg-my-secondary w-[20%] rounded-tr-[20px] rounded-br-[20px]`}></div>
                                </div>
                            )}

                            {questFinalized == false ? (
                                <>
                                    <div className={`flex flex-col items-center border-[1px] ${theme == 'light' ? 'border-my-black' : 'border-my-white'} my-2 mt-5 p-3 pt-1 rounded-[20px] min-h-[100px] overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-my-secondary`}>
                                        <h1 className={`text-[24px] font-medium ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{questIndex + 1} - {questions[questIndex].content}</h1>
                                        <div className={`w-full h-[1px] ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'} my-2 lg:hidden`}/>
                                        <p className={`text-[22px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} `}>{questions[questIndex].answer}</p>
                                    </div>

                                    <ol
                                        className='mt-3 w-full flex flex-col'
                                        type='a'
                                    >
                                        {questions[questIndex].questions.map((quest:any, i:number) => (
                                            <li
                                                key={i}
                                                onClick={() => {
                                                    //COLOCA AS RESPOSTAS DO USUÁRIO DENTRO DO ARRAY
                                                    alterResponse(quest.option, questIndex)

                                                    //ESCREVE NO CONSOLE  AS RESPOSTAS ESCOLIDAS PELO USUÁRIO
                                                    // console.log(yourResponse)
                                                    
                                                    //ESCREVE NO CONSOLE AS RESPOSTAS CORRETAS
                                                    console.log(correctResponse)
                                                }}
                                                className={`
                                                    text-[20px] border-[1px] py-2 my-1 px-3 rounded-[40px]
                                                    ${quest.option == yourResponse[questIndex] ?
                                                        `${theme == 'light' ?'text-my-secondary border-my-secondary' : 'text-my-quartenary border-my-quartenary'}` :
                                                        `${theme == 'light' ?'text-my-black border-my-black' : 'text-my-white border-my-white'}`
                                                    }
                                                `}
                                            >55{quest.option}){quest.text}</li>
                                        ))}
                                    </ol>

                                    <div className={`w-full flex mt-4 ${questIndex >= 1 ? 'justify-between' : 'justify-end'}`}>
                                        {questIndex >= 1 && (
                                            <div className={`flex bg-my-secondary items-center justify-between gap-[10px] px-3 py-2 rounded-[30px] text-my-white  border-[1px] border-my-secondary cursor-pointer
                                            hover:bg-transparent hover:text-my-secondary hover:border-my-secondary transition-all duration-[.3s]`} onClick={prevQuestion}>
                                                <IoIosArrowBack className={`text-[18px]`} />
                                                <p className={`capitalize font-medium text-[16px] flex-grow-[1]`}>questão anterior</p>
                                            </div>
                                        )}

                                        <div className={`flex self-end bg-my-secondary items-center justify-between gap-[10px] px-3 py-2 rounded-[30px] text-my-white border-[1px] border-my-secondary cursor-pointer
                                        hover:bg-transparent hover:text-my-secondary hover:border-my-secondary transition-all duration-[.3s]`} onClick={nextQuestion}>
                                            <p className={`capitalize font-medium text-[16px] flex-grow-[1]`}>{questIndex + 1 == questions.length ?'finalizar' : 'próxima questão'}</p>
                                            <IoIosArrowForward className={`text-[18px]`} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className='w-full flex flex-col items-center justify-start'>
                                    <TitlePage text='Parabéns'/>
                                    <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Parabens Prova finalizada</p>
                                    <h1>Seu Gabarito</h1>
                                    <ul>
                                        {yourResponse.map((response:string, i:number) => (
                                            <li className={`${response == correctResponse[i] ? 'text-[#00ff00]' : 'text-[#ff0000]'}`}>
                                                {response} - {correctResponse[i]}
                                            </li>
                                        ))}
                                    </ul>
                                    <RiEmotionHappyFill className={`text-[140px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                                    <Button route='undefined' text='Voltar' event={() => {
                                        //DA UM ALERT NA TELA 
                                        if(userS){
                                            console.log(userS)
                                        }

                                        updateUser({ name: "Isack Mentiu", concluded: true })

                                        if(userS.simulationsConcludeds >= 1){
                                            updateUser({ name: "No caminho certo", concluded: true })
                                        }

                                        //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
                                        navigate('/materias')
                                    }} />
                                </div>
                            )}

                        </div>
                    ):(
                        <p className={`text-[22px] text-center w-[80%] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}>
                            estamos carregando o simulado por favor aguarde
                        </p>
                    )}
                </>
            ) : (
                <div className={`mt-5 flex flex-col items-start`}>
                    <TitlePage text='Desculpe'/>
                    <Text text='Sentimos muito Infelizmente não temos provas desta matéria' />
                    <RiEmotionSadFill className={`text-[140px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                    <Button route='/materias' text='Retornar' />
                </div>
            )}
        </>
    )
}