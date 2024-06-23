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

export default function Test() {

    //USO DO HOOK useParams
    const { matter } = useParams()

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme, userS } = states

    //UTILIZAÇÃO DO HOOK useState
    const [questIndex, setQuestIndex] = useState<number>(0)
    const [questFinalized, setQuestFinalized] = useState<boolean>(false)
    const [questions, setQuestions] = useState<any[]>([
        { content: 'Mecânica', answer: 'Um carro viaja com velocidade constante de 72 km/h em uma rodovia. Qual é a distância percorrida pelo carro em 2 horas',
            questions: [
                '36 km',
                '72 km',
                '144 km',
                '144 m',
            ]
        },
        { content: 'Mecânica', answer: 'Uma pessoa empurra uma caixa com uma força constante de 20 N por uma distância de 5 metros. Qual é o trabalho realizado pela pessoa?',
            questions: [
                '10 J',
                '100 J',
                '5 J',
                '25 J',
            ]
        },
        { content: 'Mecânica', answer: 'Um objeto é lançado verticalmente para cima a partir do solo. Qual é a velocidade do objeto quando ele atinge a metade da altura máxima?',
            questions: [
                'Igual á velocidade inicial',
                'Maior que a velocidade inicial',
                'Menor que a velocidade inicial',
                'Zero',
            ]
        },
        { content: 'Óptica', answer: 'Ao iluminar uma região escura com uma lanterna, uma pessoa projeta a sombra de uma mão contra uma parede. Observando a formação da sombra, a pessoa conclui corretamente que:',
            questions: [
                'A sombra é formada pela falta de matéria na região iluminada.',
                'Quanto maior a distância entre a fonte luminosa e a mão, maior é a sombra projetada.',
                'A sombra apresenta a mesma cor da luz incidente.',
                'A sombra da mão é formada na região onde não incide luz.',
            ]
        },
        { content: 'Óptica', answer: 'Para otimizar a iluminação em residências, é recomendável que as paredes sejam pintadas com cores claras e o teto com cores brancas. Isso ocorre porque as cores claras:',
            questions: [
                'Absorvem mais luz, distribuindo-a uniformemente pelo ambiente.',
                'Refletem mais luz, distribuindo-a uniformemente pelo ambiente.',
                'Emitem mais luz, distribuindo-a uniformemente pelo ambiente.',
                'Refratam mais luz, distribuindo-a uniformemente pelo ambiente.',
            ]
        },
        { content: 'Óptica', answer: 'Em um laboratório, foi realizado uma experiência com luzes coloridas. Um grupo de alunos observou que, ao incidir luz vermelha em um filtro azul, a intensidade da luz transmitida foi muito pequena. Ao substituir o filtro azul por um filtro vermelho, a intensidade da luz transmitida aumentou significativamente. Essa experiência ilustra um fenômeno óptico conhecido como: ',
            questions: [
                'Polarização.',
                'Reflexão.',
                'Difração.',
                'Absorção.',
            ]
        }
    ])

    useEffect(() => {
        setQuestions((quest) => [...quest, {
            content: 'Mecânica',
            answer: 'O som é uma onda mecânica que se propaga através de um meio material. A velocidade do som depende das propriedades do meio em que ele se propaga. Considere que a velocidade do som no ar é de aproximadamente 340 m/s e a, na água, é de aproximadamente 1.500 m/s. Se um som é emitido simultaneamente em ambos os meios, qual das afirmações é correta?',
                questions: [
                    'O som se propaga mais rápido no ar porque é um meio menos denso.',
                    'O som se propaga mais rápido na água porque é um meio mais denso.',
                    'O som se propaga com a mesma velocidade em ambos os meios.',
                    'A velocidade do som não depende do meio, mas da frequência da onda.',
                ]
            }
        ])
    },[])

    function nextQuestion() {
        if(Number(questIndex + 2) >= Number(questions.length)){
            setQuestFinalized(true)
        }else{
            setQuestIndex(questIndex + 1)
        }
    }
    
    function prevQuestion() {
        if(Number(questIndex) == 0){
            setQuestFinalized(true)
        }else{
            setQuestIndex(questIndex - 1)
        }
    }

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == false){

            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/')
        }
    },[])

    return(
        <>
            {matter == 'fisíca' ? (
                <>
                    <Navbar>
                        <TitlePage text={`${matter}`} />
                    </Navbar>
                    
                    {questFinalized == false && (
                        <div className={`w-[90%] border-2 ${theme == 'light' ? 'border-my-black' : 'border-my-white'} h-[40px] rounded-[30px] relative overflow-hidden`}>
                            <div className={`h-full bg-my-secondary w-[90%] rounded-tr-[20px] rounded-br-[20px]`}></div>
                        </div>
                    )}

                    <div className={`w-[90%] flex items-center flex-col`}>
                        {questFinalized == false ? (
                            <>
                                <div className={`flex flex-col items-center border-[1px] ${theme == 'light' ? 'border-my-black' : 'border-my-white'} my-2 mt-5 p-3 pt-1 rounded-[20px]`}>
                                    <h1 className={`text-[24px] font-medium ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{questIndex + 1} - {questions[questIndex].content}</h1>
                                    <div className={`w-full h-[1px] ${theme == 'light' ? 'bg-my-gray' : 'bg-my-gray-black'} my-2 lg:hidden`}/>
                                    <p className={`text-[22px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{questions[questIndex].answer}</p>
                                </div>

                                <ol
                                    className='mt-3 w-full flex flex-col'
                                    type='a'
                                >
                                    {questions[questIndex].questions.map((quest:string, i:number) => (
                                        <li
                                            key={i}
                                            className={`
                                                text-[20px] border-[1px] py-2 my-1 px-3 rounded-[40px]
                                                ${theme == 'light' ? 'border-my-black' : 'border-my-white'}
                                                ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                                            `}
                                        >){quest}</li>
                                    ))}
                                </ol>

                                <div className={`w-full flex mt-4 ${questIndex >= 1 ? 'justify-between' : 'justify-end'}`}>
                                    {questIndex >= 1 && (
                                        <div className={`flex bg-my-secondary items-center justify-between gap-[10px] px-3 py-2 rounded-[30px] text-my-white`} onClick={prevQuestion}>
                                            <IoIosArrowBack className={`text-[18px]`} />
                                            <p className={`capitalize font-medium text-[16px] flex-grow-[1]`}>questão anterior</p>
                                        </div>
                                    )}

                                    <div className={`flex self-end bg-my-secondary items-center justify-between gap-[10px] px-3 py-2 rounded-[30px] text-my-white`} onClick={nextQuestion}>
                                        <p className={`capitalize font-medium text-[16px] flex-grow-[1]`}>{questIndex + 2 == questions.length ?'finalizar' : 'próxima questão'}</p>
                                        <IoIosArrowForward className={`text-[18px]`} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <TitlePage text='Parabéns'/>
                                <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Parabens Prova finalizada</p>
                                <RiEmotionHappyFill className={`text-[140px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                                <Button route='/materias' text='Voltar' />
                            </>
                        )}

                    </div>
                </>
            ) : (
                <div className={`mt-5 flex flex-col items-center`}>
                    <TitlePage text='Desculpe'/>
                    <Text text='Sentimos muito Infelizmente não temos provas desta matéria' />
                    <RiEmotionSadFill className={`text-[140px] ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`} />
                    <Button route='/materias' text='Voltar' />
                </div>
            )}
        </>
    )
}