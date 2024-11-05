import { useSpring, animated } from '@react-spring/web';

// Tipagem das props do componente
interface Props {
    ind: number;
    user: any;
}

export default function RankingCard(props: Props) {

    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA
    const propsStyle:any = useSpring({
        opacity: 1,
        transform: 'translateX(0px)',
        from: { transform: `${props.ind % 2 == 0 ? 'translateX(-100vw)' :  'translateX(100vw)'}`},
        config: { tension: 0, friction: 0 },
        delay: Number(Number(props.ind) + 1)* 250
    });

    return (
        <animated.div
            className={`
                w-[95%] flex justify-between items-center mb-2 text-my-white
                ${props.ind === 0 && 'bg-my-quartenary'}
                ${props.ind === 1 && 'bg-my-quintenary'}
                ${props.ind === 2 && 'bg-my-secondary'}
                ${props.ind >= 3 && 'bg-my-gray'}
                px-4 rounded-[6px] py-2 transition-all
            `}
            style={propsStyle} 
        >
            <div className="flex items-center justify-start gap-1">
                <p className="mr-3">{props.ind + 1}°</p>
                <img
                    src={props.user.img}
                    className={`w-[80px] h-[80px] rounded-[50%] border-[6px] ${props.ind === 0 ? 'border-transparent' : 'border-transparent'}`}
                />
                <p>{props.user.name}</p>
            </div>
            <p>{props.user.simulationsConcludeds}</p>
        </animated.div>
    );
}
