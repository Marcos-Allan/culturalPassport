import { useRef, useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Login({isDark}:{isDark:boolean}){

    const inpPassword = useRef<HTMLInputElement>(null)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    function toggleType() {
        if(inpPassword.current) {
            if(inpPassword.current.type !== 'text') {
                inpPassword.current.type = 'text'
            }else {
                inpPassword.current.type = 'password'
            }
            setIsVisible(!isVisible)
        }
    }

    return(
        <div className={`w-full h-full pb-[100px]
            ${isDark == false ? 'bg-my-white' : 'bg-my-black'}`
        }>
            <form className={`z-[5] overflow-hidden`}>
                <div className=" w-full flex justify-center items-center flex-col mb-[30px]">
                    <label htmlFor="inputEmail"
                        className={`w-[90%] text-[24px] font-semibold ms-4
                        ${isDark == true ? 'text-my-white' : 'text-my-black'}
                        `}
                    >
                        Digite seu email:
                    </label>
                    <input type="text" id="inputEmail" placeholder="Email"
                        className={`w-[90%] bg-my-gray rounded-[6px] py-2 ps-2 font-semibold text-[20px] mt-4 focus:border-my-gray-black border-2 focus:outline-none text-my-black`}
                    />
                </div>
                <div className=" w-full flex justify-center items-center flex-col">
                    <label htmlFor="inputPassword"
                        className={`w-[90%] text-[24px] font-semibold ms-4
                        ${isDark == true ? 'text-my-white' : 'text-my-black'}
                        `}
                    >
                        Digite seu senha:
                    </label>
                    <div className={`w-[100%] flex justify-center items-center flex-col relative`}>
                        <input ref={inpPassword} type="password" id="inputPassword" placeholder="Senha"
                            className={`w-[90%] bg-my-gray rounded-[6px] py-2 ps-2 font-semibold text-[20px] mt-4 focus:border-my-gray-black border-2 focus:outline-none text-my-black`}
                        />
                        {isVisible == true ? (
                            <IoEyeOff
                                onClick={() => toggleType()}
                                className={`absolute right-[10%] top-[calc(50%-4px)] cursor-pointer text-[24px]`}
                            />
                        ) : (
                            <IoEye
                                onClick={() => toggleType()}
                                className={`absolute right-[10%] top-[calc(50%-4px)] cursor-pointer text-[24px]`}
                            />
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}