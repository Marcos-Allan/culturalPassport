
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { useMyContext } from "../../provider/geral"

export default function ToggleTheme() {

    const states:any = useMyContext()
    const { theme, toggleTheme } = states

    return(
        <div
            className={`w-[80%] flex`}
            onClick={() => toggleTheme()}
        >
            {theme == 'light' ? (
                <>
                    <IoSunny
                        className={`text-my-white text-[30px]`}
                    />
                    <p className="text-my-white text-[18px] font-semibold capitalize flex-grow-[1] text-right">light mode</p>
                </>
            ):(
                <>
                    <IoMoon
                        className={`text-my-black text-[30px]`}
                    />
                    <p className="text-my-black text-[18px] font-semibold capitalize flex-grow-[1] text-right">dark mode</p>
                </>
            )}
        </div>
    )
}