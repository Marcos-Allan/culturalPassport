import { useMyContext } from "../../provider/geral"

import { MdOutlinePerson } from "react-icons/md";

export default function NameInput() {

    const states:any = useMyContext()
    const { theme } = states

    return(
        <>
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
            Nome
        </label>

        <div
            className={`
                w-full relative flex justify-center items-start flex-col mb-5
            `}
        >
            <MdOutlinePerson
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
                placeholder="Digite seu nome ou nickname"
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
    </>
    )
}