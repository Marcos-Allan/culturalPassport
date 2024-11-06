import { useSpring, animated } from '@react-spring/web';

// Tipagem das props do componente
interface Props {
    ind: number;
    user: any;
}

export default function LeaderBoard(props: Props) {

    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA DO 1° LUGAR
    const propsStyleFirst = useSpring({
        transform: 'translateY(0)',
        from: { transform: 'translateY(-100vh)' },
        config: { tension: 170, friction: 26 },
        delay: 100
    });
    
    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA DO 2° LUGAR
    const propsStyleSecond = useSpring({
        transform: 'translateY(0)',
        from: { transform: 'translateY(-100vh)' },
        config: { tension: 170, friction: 26 },
        delay: 300
    });
    
    //APLICA ESTILO ANIMADO DA ANIMAÇÃO DE ENTRADA DO 3° LUGAR
    const propsStyleThird = useSpring({
        transform: 'translateY(0)',
        from: { transform: 'translateY(-100vh)' },
        config: { tension: 170, friction: 26 },
        delay: 500
    });

    return (
        <>
            {props.ind == 0 && (
                <animated.div
                    className='flex-grow-[1] h-[200px] bg-my-quartenary relative flex items-center justify-center order-1 rounded-t-[8px] transition-all'
                    style={propsStyleFirst}
                >
                    <div className={`mt-2 absolute top-0`}>
                        <img src={props.user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transparent mb-1 `} />
                        <p className={`text-center font-bold text-my-white`}>1°</p>
                    </div>
                </animated.div>
            )}
            {props.ind == 1 && (
                <animated.div
                    className='flex-grow-[1] h-[150px] bg-my-quintenary relative flex items-center justify-center order-2 rounded-tr-[8px] transition-all'
                    style={propsStyleSecond}
                >
                    <div className={`mt-2 absolute top-0`}>
                        <img src={props.user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transparent mb-1`} />
                        <p className={`text-center font-bold text-my-white`}>2°</p>
                    </div>
                </animated.div>
            )}
            {props.ind == 2 && (
                <animated.div
                    className='flex-grow-[1] h-[120px] bg-my-secondary relative flex items-center justify-center order-0 rounded-tl-[8px] transition-all'
                    style={propsStyleThird}
                >
                    <div className={`mt-2 absolute top-0`}>
                        <img src={props.user.img} className={`w-[40px] rounded-[50%] border-[2px] border-transparent mb-1`} />
                        <p className={`text-center font-bold text-my-white`}>3°</p>
                    </div>
                </animated.div>
            )}
        </>
    );
}
