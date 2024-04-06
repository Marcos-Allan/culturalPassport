import { Link } from 'react-router-dom'

export default function Home({isDark}:{isDark:boolean}) {
    return(
        <div className={`w-full h-full pb-[100px] flex justify-center flex-col items-center
            ${isDark == false ? 'bg-my-white' : 'bg-my-black'}
        `}>
            <h1 className={`${isDark == false ? 'text-my-black' : 'text-my-white'} text-[28px]`}>
                Olá, Seja Bem Vindo
            </h1>
            <Link to={'/login'} className={`
                text-center
                border-2 font-bold text-[18px] w-[60%] outline-none py-3 mt-3 rounded-[8px] uppercase cursor-pointer border-my-terciary bg-my-terciary text-my-white focus:bg-my-white focus:text-my-terciary hover:bg-my-white hover:text-my-terciary
            `}>
                entrar
            </Link>
        </div>
    )
}