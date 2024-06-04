//IMPORTAÇÃO DAS BIBLIOTECAS
import { useLocation } from 'react-router-dom';

//IMPORTAÇÃO DOS ICONES
import { GoHome } from "react-icons/go";
import { GrTrophy } from "react-icons/gr";
import { FaRegAddressBook } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

export default function BottomNavigation() {

    //VERIFICA A ROTA ATUAL
    const location = useLocation();

    return(
        <div className={`fixed bottom-0 w-full sm:px-[20%] h-[80px] px-3 bg-my-secondary flex justify-around items-center`}>
            
            <div className={`flex flex-col items-center justify-center gap-[5px] p-1 rounded-[50%] w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] ${location.pathname == '/materias' && 'bg-my-terciary'}`}>
                <GoHome className={`text-[24px] text-my-white`} />
                <p className={`text-[10px] text-my-white`}>Inicio</p>
            </div>

            <div className={`flex flex-col items-center justify-center gap-[5px] p-1 rounded-[50%] w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] ${location.pathname == '/achievements' && 'bg-my-terciary'}`}>
                <GrTrophy className={`text-[24px] text-my-white`} />
                <p className={`text-[10px] text-my-white`}>Conquistas</p>
            </div>
            
            <div className={`flex flex-col items-center justify-center gap-[5px] p-1 rounded-[50%] w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] ${location.pathname == '/exercises' && 'bg-my-terciary'}`}>
                <FaRegAddressBook className={`text-[24px] text-my-white`} />
                <p className={`text-[10px] text-my-white`}>Exercicios</p>
            </div>

            <div className={`flex flex-col items-center justify-center gap-[5px] p-1 rounded-[50%] w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] ${location.pathname == '/chat' && 'bg-my-terciary'}`}>
                <IoChatbubbleOutline className={`text-[24px] text-my-white`} />
                <p className={`text-[10px] text-my-white`}>Chat</p>
            </div>
            
            <div className={`flex flex-col items-center justify-center gap-[5px] p-1 rounded-[50%] w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] ${location.pathname == '/notifications' && 'bg-my-terciary'}`}>
                <IoNotificationsOutline className={`text-[24px] text-my-white`} />
                <p className={`text-[10px] text-my-white`}>Notificação</p>
            </div>

            <div className={`flex flex-col items-center justify-center gap-[5px] p-1 rounded-[50%] w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] ${location.pathname == '/profile' && 'bg-my-terciary'}`}>
                <IoPersonOutline className={`text-[24px] text-my-white`} />
                <p className={`text-[10px] text-my-white`}>Perfil</p>
            </div>
        </div>
    )
}