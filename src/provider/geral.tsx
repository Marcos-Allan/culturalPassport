//IMPORTA OS HOOKS DO REACT PARA CRIAR UM GERENCIAMENTO DE ESTADOS GLOBAIS
import { useState, createContext, useContext } from 'react'

//CRIA E EXPORTA O CONTEUDO DOS ESTADOS
export const MyContext = createContext({})

//TIPAGEM DO USUÁRIO
interface User {
    logged: boolean,
    name: string,
    img: string,
}

//TIPAGEM DO ALERT
interface Alert {
    type: string,
    text: string,
}

//CRIA E EXPORTA O PROVEDOR DOS ESTADOS
export const MyProvider = ({ children } : { children: React.ReactNode }) => {
    
    //CRIA ESTADO GLOBAL DE CADA VARIAVEL
    const [theme, setTheme] = useState<string | null>(localStorage.getItem('themePC'))
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [userS, setUserS] = useState<User>({ logged: false, name: '', img: '' })
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<Alert>({ type: 'undefined', text: 'Alerta simples' })

    //FUNÇÃO RESPONSAVEL POR TROCAR E SALVAR NO localStorage O TEMA ESCOLHIDO PELO USUÁRIO
    const toggleTheme = () => {
        let themeAplicked = localStorage.getItem('themePC')
        localStorage.setItem('themePC', themeAplicked == 'light' ? 'dark' : 'light')
        setTheme(themeAplicked == 'light' ? 'dark' : 'light')
    }

    //FUNÇÃO RESPONSAVEL POR ABRIR E FECHAR O MENU
    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }
    
    //FUNÇÃO RESPONSAVEL POR ABRIR E FECHAR O MENU
    const toggleUser = (name:string, img:string) => {
        setUserS({ logged: true, name: name, img: img })
    }
    
    //FUNÇÃO RESPONSAVEL POR TROCAR O ESTADO DE LOADING DA APLICAÇÃO
    const toggleLoading = (state:boolean) => {
        setLoading(state)
    }

    //FUNÇÃO RESPONSÁVEL POR DETERMINAR O TIPO E O TEXTO DO ALERTA
    const toggleAlert = (type: string, text: string ) => {
        setMessage({ type: type, text: text })
    }

    //RETORNA TUDO PARA SER USADO EM TODO O SITE
    return (
        <MyContext.Provider value={{ theme, toggleTheme, menuOpen, toggleMenuOpen, userS, toggleUser, loading, toggleLoading, message, toggleAlert }}>
            {children}
        </MyContext.Provider>
    )
}

//EXPORTA A VARIAVEL PARA PODER PEGAR O CONTEUDO EM OUTRAS PARTE DA APLICAÇÃO
export const useMyContext = () => useContext(MyContext)