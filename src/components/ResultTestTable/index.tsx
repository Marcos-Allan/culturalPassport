//IMPORTAÇÃO DAS BIBLIOTECAS
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//IMPORTAÇÃO DOS COMPONENTES
import TitlePage from "../TitlePage";
import Button from '../Button';

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    questions: any,
    myCorrectResponse: any,
    yourResponse: any,
    correctResponse: any,
    getAchievement: () => any
}

//CONFIGURAÇÃO DA BIBLIOTECA DE GRÁFICOS
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

export default function ResultTestTable(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    return(
        <div className='w-full flex flex-col items-center justify-start mb-[30px]'>
            <TitlePage text='Resultado'/>
            
            <div className={`flex capitalize justify-between text-[20px] mt-3 px-2 py-3 rounded-[8px] w-full border-[1px] ${theme == 'light' ? 'border-my-black text-black' : 'border-my-white text-white'}`}>
                <p>nota final:</p>
                <p>{Number((10 / props.questions.length) *  props.myCorrectResponse).toFixed(2)}</p>
            </div>
            
            <div className={`flex justify-between text-[20px] mt-3 px-2 py-3 rounded-[8px] w-full border-[1px] ${theme == 'light' ? 'border-my-black text-black' : 'border-my-white text-white'}`}>
                <p>acertos:</p>
                <p>{props.myCorrectResponse}</p>
            </div>
            
            <div className={`flex justify-between text-[20px] mt-3 px-2 py-3 rounded-[8px] w-full border-[1px] ${theme == 'light' ? 'border-my-black text-black' : 'border-my-white text-white'}`}>
                <p>erros:</p>
                <p>{props.questions.length - props.myCorrectResponse}</p>
            </div>
            
            <div className={`flex justify-between text-[20px] mt-3 px-2 py-3 rounded-[8px] w-full border-[1px] ${theme == 'light' ? 'border-my-black text-black' : 'border-my-white text-white'}`}>
                <p>total de questões:</p>
                <p>{props.questions.length}</p>
            </div>

            <div className={`w-[50%] flex items-center justify-center my-4`}>
                <Doughnut
                    data = {{
                        labels: ['Acertos', 'Erros'],
                        datasets: [
                            {
                                data: [props.myCorrectResponse, (props.questions.length - props.myCorrectResponse)],
                                borderColor: 'black',
                                backgroundColor: [`${theme == 'light' ? '#20db48' : '#20db48'}`, `${theme == 'light' ? '#75028E' : '#8D46DC'}`]
                            }
                        ]
                    }}
                    options = {{}}
                ></Doughnut>
            </div>
            <h1 className={`mt-2 mb-4 text-[20px] font-bold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Gabarito da prova</h1>
            <div className={`flex flex-row justify-between items-center w-[45%] gap-[3px] mb-5`}>
                <div className={`flex flex-col items-center justify-center flex-grow-[1] gap-[3px]`}>
                    <p className={`border-[1px] w-full font-bold text-center text-[12px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Gabarito</p>
                    {props.questions.map((response:string, i:number) => (
                        <p key={response} className={`border-[1px] w-full text-center ${props.yourResponse[i] == props.correctResponse[i] ? 'text-[#20db48] border-[#20db48]' : 'text-[#75028E] border-[#75028E]'}`}>
                            {props.yourResponse[i]}
                        </p>
                    ))}
                </div>
                
                <div className={`flex flex-col items-center justify-center flex-grow-[1] gap-[3px]`}>
                    <p className={`border-[1px] w-full font-bold text-center text-[12px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Resposta</p>
                    {props.questions.map((response:string, i:number) => (
                        <p key={response} className={`border-[1px] w-full text-center ${props.yourResponse[i] == props.correctResponse[i] ? 'text-[#20db48] border-[#20db48]' : 'text-[#75028E] border-[#75028E]'}
                        `}>
                            {props.correctResponse[i]}
                        </p>
                    ))}
                </div>
            </div>

            <Button route='undefined' text='Voltar' event={props.getAchievement} />
        </div>
    )
}