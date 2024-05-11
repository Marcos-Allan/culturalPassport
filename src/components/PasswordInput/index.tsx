//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useRef } from "react";

//IMPORTAÇÃO DOS ICONES
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//TIPAGEM DAS PROPS DO COMPONENTE
interface Props {
    text: string,
    placeholder: string,
    hidden: boolean,
}

export default function PasswordInput(props: Props) {

    //PEGA A REFERENCIA DE UM INPUT 
    const passwordInputVisible = useRef<HTMLInputElement>(null)
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //UTILIZA O HOOK useState
    const [isVisible, setIsVisible] = useState<boolean>(false)

    //FUNÇÃO RESPONSÁVEL POR TROCAR O TIPO DO INPUT
    function toggleIsVisiblePassword() {
        //VERIFICA O ESTADO REFERENCIADO 
        if(passwordInputVisible.current) {

            //VÊ SE O ESTADO isVisible É IGUAL false E TROCA O TIPO DO INPUT PARA text
            if(isVisible == false){
                passwordInputVisible.current.type = 'text'
            }else{
                //VÊ SE O ESTADO isVisible É IGUAL true E TROCA O TIPO DO INPUT PARA password
                passwordInputVisible.current.type = 'password'
            }

            //TROCA O ESTADO isVisible PARA true SE ELE FOR IGUAL A false OU PARA false SE ELE FOR IGUAL A true
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
                {props.text}
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
                {props.hidden == true && isVisible == true && (
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
                {props.hidden == true && isVisible == false && (
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
                    placeholder={props.placeholder}
                    id="passwordInput"
                    type={`${props.hidden == true ? 'password' : 'text'}`}
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