import { useState, createContext, useContext } from 'react'

export const MyContext = createContext({})

export const MyProvider = ({ children } : { children: React.ReactNode }) => {
    const themeAplicked = 'light'
    
    const [theme, setTheme] = useState<string | null>(themeAplicked)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }

    const toggleTheme = () => {
        setTheme(theme == 'light' ? 'dark' : 'light')
    }
    
    return (
        <MyContext.Provider value={{ theme, toggleTheme, menuOpen, toggleMenuOpen }}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext)