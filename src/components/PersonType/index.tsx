import { useState } from "react";
import { useMyContext } from "../../provider/geral";

import { IoChevronDownOutline } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";

export default function PersonType() {

    const states:any = useMyContext()
    const { theme } = states

    const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false)
    const [personType, setPersonType] = useState<string>('')

    function toggleIsTypeOpen() {
        setIsTypeOpen(!isTypeOpen)
    }

    function capitalizeText(text:string) {
        return text.replace(/\b\w/g, function(letter) {
            return letter.toUpperCase();
        })
    }

    return(
        <div className="my-5 w-full flex flex-col items-center">
            <div 
                className={`
                    relative
                    flex
                    items-center
                    w-[70%]
                    border
                    p-3
                    ps-4
                    rounded-[16px]
                    ${theme == 'light'
                    ? 'border-my-gray'
                    : 'border-my-gray-black'}
                `}
                onClick={() => toggleIsTypeOpen()}
            >
                {personType == '' ?(
                    <>
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
                    </>
                ):(
                    <>
                        <p
                            className={`
                                text-[20px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                            `}
                        >{capitalizeText(personType)}</p>
                        {personType == 'aluno' && (
                            <PiStudent
                                className={`
                                absolute right-0 me-3
                                text-[38px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                                `}
                            />
                        )}

                        {personType == 'professor' && (
                            <GiTeacher
                                className={`
                                absolute right-0 me-3
                                text-[38px]
                                ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                                `}
                            />
                        )}
                    </>
                )}
                
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
                        onClick={() => {
                            setIsTypeOpen(false)
                            setPersonType('professor')
                        }}
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
                        mb-6
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
                        onClick={() => {
                            setIsTypeOpen(false)
                            setPersonType('aluno')
                        }}
                    >
                        Aluno
                        <PiStudent
                            className={`absolute left-0 text-[38px] ms-3`}
                        />
                    </div>
                </>
            )}
        </div>
    )   
}