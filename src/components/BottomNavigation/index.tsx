//IMPORTAÇÃO DAS BIBLIOTECAS
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

//IMPORTAÇÃO DOS ICONES
import { GoHome } from "react-icons/go";
import { GrTrophy } from "react-icons/gr";
import { FaRegAddressBook } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

export default function BottomNavigation() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //VERIFICA A ROTA ATUAL
    const location = useLocation();

    return(
        <div className={`fixed bottom-0 w-full sm:px-[20%] h-[80px] px-3 bg-my-secondary flex justify-around items-center`}>
            
            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/materias')}
            >
                <div className={`flex items-center justify-center rounded-[50%] ${location.pathname == '/materias' && 'bg-my-terciary'}`}>
                    <GoHome className={`text-[36px] text-my-white p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Inicio</p>
            </div>

            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/achievements')}
            >
                <div className={`flex items-center justify-center rounded-[50%] ${location.pathname == '/achievements' && 'bg-my-terciary'}`}>
                    <GrTrophy className={`text-[36px] text-my-white p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Conquistas</p>
            </div>
            
            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/exercises')}
            >
                <div className={`flex items-center justify-center rounded-[50%] ${location.pathname == '/exercises' && 'bg-my-terciary'}`}>
                    <FaRegAddressBook className={`text-[36px] text-my-white p-[6px] `} />
                </div>
                <p className={`text-[10px] text-my-white`}>Exercicios</p>
            </div>

            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/chat')}
            >
                <div className={`flex items-center justify-center rounded-[50%] ${location.pathname == '/chat' && 'bg-my-terciary'}`}>
                    <IoChatbubbleOutline className={`text-[36px] text-my-white p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Chat</p>
            </div>
            
            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/notifications')}
            >
                <div className={`flex items-center justify-center rounded-[50%] ${location.pathname == '/notifications' && 'bg-my-terciary'}`}>
                    <IoNotificationsOutline className={`text-[36px] text-my-white p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Notificação</p>
            </div>

            <div
                className={`flex flex-col items-center justify-center gap-[5px]`}
                onClick={() => navigate('/my-perfil')}
            >
                <div className={`flex items-center justify-center rounded-[50%] ${location.pathname == '/profile' && 'bg-my-terciary'}`}>
                    <IoPersonOutline className={`text-[36px] text-my-white p-[6px]`} />
                </div>
                <p className={`text-[10px] text-my-white`}>Perfil</p>
            </div>
        </div>
    )
}