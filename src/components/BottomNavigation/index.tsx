//IMPORTAÇÃO DOS ICONES
import { GoHome } from "react-icons/go";
import { GrTrophy } from "react-icons/gr";
import { FaRegAddressBook } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

export default function BottomNavigation() {

    return(
        <div className={`fixed bottom-0 w-full h-[80px] px-3 bg-my-secondary flex justify-around items-center`}>
            
            <div className={`flex flex-col items-center justify-center gap-[5px]`}>
                <GoHome className={`text-[24px] text-my-white`} />
                <p className={`text-[14px] text-my-white`}>Inicio</p>
            </div>

            <div className={`flex flex-col items-center justify-center gap-[5px]`}>
                <GrTrophy className={`text-[24px] text-my-white`} />
                <p className={`text-[14px] text-my-white`}>Conquistas</p>
            </div>
            
            <div className={`flex flex-col items-center justify-center gap-[5px]`}>
                <FaRegAddressBook className={`text-[24px] text-my-white`} />
                <p className={`text-[14px] text-my-white`}>Exercicios</p>
            </div>

            <div className={`flex flex-col items-center justify-center gap-[5px]`}>
                <IoChatbubbleOutline className={`text-[24px] text-my-white`} />
                <p className={`text-[14px] text-my-white`}>Chat</p>
            </div>
            
            <div className={`flex flex-col items-center justify-center gap-[5px]`}>
                <IoNotificationsOutline className={`text-[24px] text-my-white`} />
                <p className={`text-[14px] text-my-white`}>Notificação</p>
            </div>

            <div className={`flex flex-col items-center justify-center gap-[5px]`}>
                <IoPersonOutline className={`text-[24px] text-my-white`} />
                <p className={`text-[14px] text-my-white`}>Perfil</p>
            </div>
        </div>
    )
}