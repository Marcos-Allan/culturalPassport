import { useMyContext } from "../../provider/geral"
import { IoMenu, IoCloseOutline } from "react-icons/io5";

export default function MenuBUtton() {

    const states:any = useMyContext()
    const { theme, menuOpen, toggleMenuOpen, userS } = states

    return(
        <>
            {menuOpen == true ? (
                <>
                    <IoCloseOutline 
                        className={`mt-4 text-[40px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} z-[40]`}
                        onClick={() => toggleMenuOpen()}
                    />
                </>
            ):(
                <div className={`relative`}>
                    <IoMenu
                        className={`mt-4 text-[40px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} z-[40]`}
                        onClick={() => toggleMenuOpen()}
                    />
                    {userS.logged == true && (
                        <div className={`w-[14px] h-[14px] rounded-[50%] absolute top-[18%] right-[-10%] animate-bounce
                        ${theme == 'light' ? 'bg-my-terciary' : 'bg-my-quartenary'}`}></div>
                    )}
                </div>
            )}
        </>
    )
}