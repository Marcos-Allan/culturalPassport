import { useState, createContext, useContext } from 'react'

export const MyContext = createContext({})

export const MyProvider = ({ children } : { children: React.ReactNode }) => {
    
    const [theme, setTheme] = useState<string | null>(localStorage.getItem('themePC'))
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }
    
    const toggleTheme = () => {
        let themeAplicked = localStorage.getItem('themePC')
        localStorage.setItem('themePC', themeAplicked == 'light' ? 'dark' : 'light')
        setTheme(themeAplicked == 'light' ? 'dark' : 'light')
    }
    
    return (
        <MyContext.Provider value={{ theme, toggleTheme, menuOpen, toggleMenuOpen }}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext)