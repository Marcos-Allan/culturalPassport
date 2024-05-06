import { useMyContext } from "../../provider/geral"

import { MdOutlineEmail } from "react-icons/md";

export default function EmailInput() {

    const states:any = useMyContext()
    const { theme } = states

    return(
        <div className="w-[90%]">
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