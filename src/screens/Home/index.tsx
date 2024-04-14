import { Link } from "react-router-dom"
import { useMyContext } from "../../provider/geral.tsx"

export default function Home(){

    const states:any = useMyContext()
    const { theme, toggleTheme } = states

    return(
        <div>
            <button onClick={() => toggleTheme()}>{`${theme == 'light' ? 'light' : 'dark'}`}</button>
            <br/>
            <Link to="/login">LOGIN</Link>
        </div>
    )
}