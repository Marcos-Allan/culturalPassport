//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

//TIPAGENS DAS PROPS DO COMPONENTE
interface Props {
    msg: any,
}

//IMPORTAÇÃO DOS ICONES
import { FaStar } from "react-icons/fa";

export default function FeedbackCard(props: Props) {

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, theme } = states

    //ARRAY DE CORES ESCOLHIDAS
    const colors = ['#8D46DC', '#75028E', '#20db48', '#4882fe']

    const RenderStars = (count: number) => {
        return (
            <div className={`flex flex-row gap-1 mr-2`}>
                {Array(count).fill(<FaStar className='text-[#4882fe] text-[14px]' />)}
            </div>
        );
    };

    //FUNÇÃO RESPONSÁVEL POR 
    function selectRandomColor(cores:[]) {
        //GERA UM NÚMERO ALEATÓRIO ENTRE O NÚMERO MÁXIMO DE ITEMS DO ARRAY E O MÍNIMO
        const indiceAleatorio = Math.floor(Math.random() * cores.length)

        //RETORNA A COR ESCOLIDA PELO  ÍNDICE
        return cores[indiceAleatorio]
    }

    return(
        <>
            {props.msg.userID != userS.id ? (
                <div
                    key={Math.random() * 999999999999}   
                    className={`p-1 w-full rounded-[10px]`}
                >
                    <div className={`flex flex-col justify-between items-start gap-2 p-1`}>
                        <div className={`flex flex-row items-center gap-2`}>
                            <img src={props.msg.userImg} className='w-6 h-6 rounded-[50%]' />
                            <p
                                style={{ color: selectRandomColor(colors as any) }}
                                className={`font-black text-[16px] my-2`}
                            >
                                {props.msg.name}
                            </p>
                        </div>
                        <p className={`flex ps-1 flex-row items-center gap-1  text-[16px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>
                            {RenderStars(props.msg.raiting)}

                            {props.msg.data}
                        </p>
                    </div>
                    
                    <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'} my-1 mx-3`}>{props.msg.message}</p>
                </div> 
            ):(
                <div className={`p-1 w-full rounded-[10px]`}>
                    <div className={`flex flex-col justify-between items-start gap-2 p-1`}>
                        <div className={`flex flex-row items-center gap-2`}>
                            <img src={userS.img} className='w-6 h-6 rounded-[50%]' />
                            <p
                                className={`text-[#ff346e] font-black text-[16px] my-2`}
                            >
                                {userS.name}
                            </p>
                        </div>

                        <p className={`flex ps-1 flex-row items-center gap-1  text-[16px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>
                            {RenderStars(props.msg.raiting)}

                            {props.msg.data}
                        </p>
                    </div>
                    
                    <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'} my-1 mx-3`}>{props.msg.message}</p>
                </div>
            )}
        </>
    )
}