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
    value?: string,
    event?: (e:React.ChangeEvent<HTMLInputElement>) => void,
}

export default function PasswordInput(props: Props) {

    //PEGA A REFERÊNCIA A ELEMENTOS 
    const passwordInputVisible = useRef<HTMLInputElement>(null)
    const label = useRef<HTMLLabelElement>(null) 
    const message = useRef<HTMLParagraphElement>(null) 
    const span = useRef<HTMLSpanElement>(null) 
    const spanOne = useRef<HTMLSpanElement>(null)
    
    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { theme } = states

    //UTILIZA O HOOK useState
    const [isVisible, setIsVisible] = useState<boolean>(false)

    //FUNÇÃO QUE VERIFICA SE O CAMPO ESTÁ DENTRO DO PADRÃO
    function handleValidatePassword() {

        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPassword = /^[\w._-]{6,10}$/i

        //VÊ SE O VALOR DO INPUT EXISTE
        if(props.value){
            //VERIFICA SE O VALOR DO INPUT ESTÁ NO PADRÃO DA REGEX padraoEmail
            if(padraoPassword.test(props.value) == true){
                //PEGA AS REFERÊNCIAS ATUAIS DOS ELEMENTOS
                if(passwordInputVisible.current && label.current && message.current && span.current && spanOne.current){
                    //MUDA O ESTILO COMO CORES DE LETRAS, ICONES E BORDAS DOS RESPECTIVOS ELEMENTOS 
                    passwordInputVisible.current.style.border = `1px solid #00ff00`
                    label.current.style.color = `#00ff00`
                    passwordInputVisible.current.style.color = `#00ff00`
                    message.current.style.color = `#00ff00`
                    span.current.style.color = `#00ff00`
                    spanOne.current.style.color = `#00ff00`
                    
                    //MUDA A OPACIDADE DA MENSAGEM PARA
                    message.current.style.opacity = `100%`

                    //ALTERA O TEXTO DA MENSAGEM
                    message.current.innerText = `Senha dentro do padrão`
                }
                //VERIFICA SE O VALOR DO INPUT NÃO ESTÁ NO PADRÃO DA REGEX padraoEmail
            }else{
                //PEGA AS REFERÊNCIAS ATUAIS DOS ELEMENTOS
                if(passwordInputVisible.current && label.current && message.current && span.current && spanOne.current){
                    //MUDA O ESTILO COMO CORES DE LETRAS, ICONES E BORDAS DOS RESPECTIVOS ELEMENTOS 
                    passwordInputVisible.current.style.border = `1px solid #ff0000`
                    label.current.style.color = `#ff0000`
                    passwordInputVisible.current.style.color = `#ff0000`
                    message.current.style.color = `#ff0000`
                    span.current.style.color = `#ff0000`
                    spanOne.current.style.color = `#ff0000`
                    
                    //MUDA A OPACIDADE DA MENSAGEM PARA
                    message.current.style.opacity = `100%`

                    //ALTERA O TEXTO DA MENSAGEM
                    message.current.innerText = `A senha deve ter entre 6 e 10 caracteres`
                }
            }
        }
    }

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
        <div className="w-[90%] relative">
            {/* INPUT DE PASSWORD */}
            <label
                ref={label}
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
                <span
                    ref={span}
                    className={`
                    absolute
                    ms-2
                    left-0
                    text-[24px]
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}`}
                >
                    <MdOutlineLock />
                </span>

                <span
                    ref={spanOne}
                    className={`
                    absolute
                    me-2
                    right-0
                    text-[24px]
                    ${theme == 'light' ? 'text-my-gray' : 'text-my-gray-black'}
                    `}
                    onClick={() => toggleIsVisiblePassword()}
                >
                    {props.hidden == true && (
                        <>
                            {isVisible == true ? (
                                <IoEyeOutline />
                            ):(
                                <IoEyeOffOutline />
                            )}
                        </>
                    )}
                </span>

                <input
                    onBlur={handleValidatePassword}
                    ref={passwordInputVisible}
                    onChange={props.event && props.event}
                    placeholder={props.placeholder}
                    value={props.value && props.value}
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
            <p ref={message} className={`w-full ps-2 opacity-0 absolute bottom-[-3%]`}>oioioi</p>
        </div>
    )
}