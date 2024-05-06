import { useState, useRef } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import { useMyContext } from "../../provider/geral"

export default function PasswordInput({text, placeholder, hidden}:{text:string, placeholder:string, hidden:boolean}) {
    const passwordInputVisible = useRef<HTMLInputElement>(null)
    
    const states:any = useMyContext()
    const { theme } = states

    const [isVisible, setIsVisible] = useState<boolean>(false)

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

    return(
        <div className="w-[90%]">
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
                {text}
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
                {hidden == true && isVisible == true && (
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
                )}
                {hidden == true && isVisible == false && (
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
                    placeholder={placeholder}
                    id="passwordInput"
                    type={`${hidden == true ? 'password' : 'text'}`}
                    className={`
                        w-full
                        text-[20px]
                        rounded-[16px]
                        ps-[40px]
                        py-3
                        border
                        ${theme == 'light'
                        ? 'text-my-gray placeholder-my-gray border-my-gray bg-my-white'
                        : 'text-my-gray-black placeholder-my-gray-black border-my-gray-black bg-my-black'
                        }
                        focus:outline-none
                    `}
                />
            </div>
        </div>
    )
}