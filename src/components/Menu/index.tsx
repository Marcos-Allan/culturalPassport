import { useMyContext } from "../../provider/geral"
import { IoCloseOutline } from "react-icons/io5";
import ToggleTheme from "../ToggleTheme";

export default function Menu() {

    const states:any = useMyContext()
    const { theme, menuOpen, toggleMenuOpen, userS } = states

    return(
        <div
            className={`
                flex items-center flex-col absolute top-0 w-[280px] h-full pt-32
                ${theme == 'light' ? 'bg-my-black text-my-white' : 'bg-my-white text-my-black'}
                ${menuOpen == true ? 'left-0' : 'left-[-280px]'}
                transition-[left] duration-[0.6s]
            `}
        >
            <IoCloseOutline
                className={`
                    absolute top-0 end-0 text-[36px] m-2
                    ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                `}
                onClick={() => toggleMenuOpen()}
            />

            {userS.logged == true && (
                <div className={`flex items-center gap-[10px] absolute top-0 left-0 m-3`}>
                    <img
                        src={userS.img}
                        alt=""
                        className={`rounded-[50%] mb-2 w-20 h-20 border-[1px] ${theme == 'light' ? 'border-my-quartenary' : 'border-my-terciary'} p-1`}
                    />
                    <p className={`text-[22px] font-bold
                        ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                    `}>{userS.name}</p>
                </div>
            )}

            <ToggleTheme />
        </div>
    )
}