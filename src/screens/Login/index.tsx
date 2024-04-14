import { useState, useRef } from "react";
import { Link } from "react-router-dom"
import { useMyContext } from "../../provider/geral.tsx"

//IMPORTAÇÃO DOS ICONES
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

import { FcGoogle } from "react-icons/fc";

import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";

import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";


export default function Login(){

    const passwordInputVisible = useRef<HTMLInputElement>(null)

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false)

    const states:any = useMyContext()
    const { theme, toggleTheme } = states

    function toggleIsVisiblePassword() {
        if(passwordInputVisible.current) {
            if(isVisible == false){
                passwordInputVisible.current.type = 'text'
            }else{
                passwordInputVisible.current.type = 'password'
            }
            setIsVisible(!isVisible)
        }
    }

    function toggleIsTypeOpen() {
        setIsTypeOpen(!isTypeOpen)
    }

    function msgImple() {
        alert("Função a ser implementada")
    }

    return(
        <div
            className={`
                w-screen h-screen flex justify-start items-center flex-col overflow-hidden
                ${theme == 'light'
                ? 'bg-my-white'
                : 'bg-my-black'
                }
            `}
        >
            <h1
                className={`
                    text-left w-[90%] pt-4 text-[26px] font-bold capitalize
                    ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                `}
            >
                    login
                </h1>

                <form
                    className={`
                        mt-8
                        items-center
                        flex flex-col w-[90%]   
                        ${theme == 'light' ? '' : ''}
                    `}
                >
                    {/* INPUT DE EMAIL */}
                    <label
                        className={`
                            w-full
                            text-[20px]
                            ms-2
                            mb-2
                            ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                        `}
                        htmlFor="emailInput"
                    >
                        Email
                    </label>

                    <div
                        className={`
                            w-full relative flex justify-center items-start flex-col mb-5
                        `}
                    >
                        <MdOutlineEmail
                            className={`
                            absolute
                            ms-2
                            left-0
                            text-[24px]
                            ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                            />
                        <input
                            id="emailInput"
                            type="text"
                            placeholder="Digite seu endereço de email"
                            className={`
                                w-full
                                text-[20px]
                                rounded-[16px]
                                ps-[40px]
                                py-3
                                border
                                ${theme == 'light'
                                ? 'text-my-gray border-my-gray bg-my-white'
                                : 'text-my-gray-black border-my-gray-black bg-my-black'
                                }
                                focus:outline-none
                            `}
                        />
                    </div>
                    
                    {/* INPUT DE PASSWORD */}
                    <label
                        className={`
                            w-full
                            text-[20px]
                            ms-2
                            mb-2
                            ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                        `}
                        htmlFor="passwordInput"
                    >
                        Password
                    </label>

                    <div
                        className={`
                            w-full relative flex justify-center items-start flex-col mb-5
                        `}
                    >
                        <MdOutlineLock
                            className={`
                            absolute
                            ms-2
                            left-0
                            text-[24px]
                            ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                        
                        {isVisible == true ? (
                            <IoEyeOutline 
                                className={`
                                    absolute
                                    me-2
                                    right-0
                                    text-[24px]
                                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                                `}
                                onClick={() => toggleIsVisiblePassword()}
                                />
                        ):(
                            <IoEyeOffOutline
                                className={`
                                    absolute
                                    me-2
                                    right-0
                                    text-[24px]
                                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                                    `}
                                    onClick={() => toggleIsVisiblePassword()}
                                />

                        )}

                        <input
                            ref={passwordInputVisible}
                            placeholder="Digite uma senha"
                            id="passwordInput"
                            type="password"
                            className={`
                                w-full
                                text-[20px]
                                rounded-[16px]
                                ps-[40px]
                                py-3
                                border
                                ${theme == 'light'
                                ? 'text-my-gray border-my-gray bg-my-white'
                                : 'text-my-gray-black border-my-gray-black bg-my-black'
                                }
                                focus:outline-none
                            `}
                        />
                    </div>

                    <div 
                        className={`
                            mt-5
                            relative
                            flex
                            items-center
                            w-[70%]
                            border
                            p-3
                            rounded-[16px]
                            ${theme == 'light'
                            ? 'border-my-gray'
                            : 'border-my-gray-black'}
                        `}
                        onClick={() => toggleIsTypeOpen()}
                    >
                        <p
                            className={`
                                text-[20px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        >Entrar como</p>

                        <IoChevronDownOutline
                            className={`
                                transition-all
                                duration-[350ms]
                                ${isTypeOpen == false ? 'rotate-[0deg]' : 'rotate-[180deg]'}
                                absolute right-0 me-2
                                text-[24px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        />
                    </div>

                    {isTypeOpen !== false && (
                        <>
                            <div
                                className={`
                                    relative
                                    w-[70%]
                                    flex
                                    items-center
                                    justify-start
                                    border
                                    text-[20px]
                                    p-3
                                    ps-[60px]
                                    mt-3
                                    rounded-[16px]
                                    ${theme == 'light'
                                    ? 'border-my-gray text-my-gray'
                                    : 'border-my-gray-black text-my-gray-black'}
                                `}
                                onClick={() => msgImple()}
                            >
                                Professor
                                <GiTeacher
                                    className={`absolute left-0 text-[38px] ms-3`}
                                />
                            </div>
                            
                            <div
                                className={`
                                relative
                                w-[70%]
                                flex
                                items-center
                                justify-start
                                border
                                text-[20px]
                                p-3
                                ps-[60px]
                                mt-3
                                rounded-[16px]
                                ${theme == 'light'
                                ? 'border-my-gray text-my-gray'
                                : 'border-my-gray-black text-my-gray-black'}
                                    `}
                                onClick={() => msgImple()}
                            >
                                Aluno
                                <PiStudent
                                    className={`absolute left-0 text-[38px] ms-3`}
                                />
                            </div>
                        </>
                    )}

                    <Link
                        to={'/login'}
                        className={`
                            mt-5
                            font-medium
                            text-[20px]
                            ${theme == 'light' ? 'text-my-primary' : 'text-my-secondary'}
                        `}
                        onClick={() => msgImple()}
                    >
                        Esqueceu sua senha
                    </Link>
                    <div
                        className={`
                            w-[90%]
                            my-3
                            rounded-[20px]
                            ${theme == 'light' ? 'bg-my-primary' : 'bg-my-secondary'}
                        `}
                    >
                        <p
                            className={`
                                text-center
                                p-[10px]
                                text-[24px]
                                font-medium
                                capitalize
                                ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                            `}
                            onClick={() => msgImple()}
                        >entrar</p>
                    </div>

                    <Link
                        to={'/login'}
                        className={`
                            font-medium
                            text-[20px]
                            ${theme == 'light' ? 'text-my-primary' : 'text-my-secondary'}
                        `}
                        onClick={() => msgImple()}
                    >
                        Crie sua conta
                    </Link>

                    <div
                        className={`
                            my-8
                            w-full
                            flex justify-center items-center
                        `}
                    >
                        <div 
                            className={`
                            flex-grow-[1]
                            h-[2px]
                            ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'}
                            `}
                        />
                        <p
                            className={`
                                text-[24px]
                                font-semibold
                                pb-3
                                ${theme == 'light' ? 'text-my-black' : 'text-my-white'} px-3
                            `}
                        >
                            ou
                        </p>
                        <div 
                            className={`
                            flex-grow-[1]
                            h-[2px]
                            ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'}
                            `}
                        />

                    </div>

                    <FcGoogle
                        className={`
                            text-[70px]
                            border border-my-primary
                            rounded-[50%]
                            p-3
                            ${theme == 'light' ? '' : ''}
                        `}
                        onClick={() => msgImple()}
                    />

                </form>
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
        </div>
    )
}