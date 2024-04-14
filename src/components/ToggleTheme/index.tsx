
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { useMyContext } from "../../provider/geral"

export default function ToggleTheme() {

    const states:any = useMyContext()
    const { theme, toggleTheme } = states

    return(
        <div
            className={`absolute right-0 m-5`}
            onClick={() => toggleTheme()}
        >
            {theme == 'light' ? (
                <IoSunny
                    className={`text-my-black text-[30px]`}
                    />
                ):(
                <IoMoon
                    className={`text-my-white text-[30px]`}
                />
            )}
        </div>
    )
}