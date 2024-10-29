/**
 * MIT License with Additional Restrictions
 * 
 * Copyright (c) 2024 Marcos Allan Santos Menezes
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * 2. The Software may not be used, modified, or distributed without the prior
 * written permission of the copyright holder.
 * 
 * 3. The Software is provided "as is", without warranty of any kind, express or
 * implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose and noninfringement. In no event shall the
 * authors or copyright holders be liable for any claim, damages or other
 * liability, whether in an action of contract, tort or otherwise, arising from,
 * out of or in connection with the Software or the use or other dealings in the
 * Software.
 * 
 * By using the Software, you agree to these terms and conditions.
 */

//IMPORTA OS HOOKS DO REACT PARA CRIAR UM GERENCIAMENTO DE ESTADOS GLOBAIS
import { useState, createContext, useContext } from 'react'

//CRIA E EXPORTA O CONTEUDO DOS ESTADOS
export const MyContext = createContext({})

//TIPAGEM DO USUÁRIO
interface User {
    logged: boolean,
    name: string,
    img: string,
    id: String,
    simulations: any,
    simulationsConcludeds: number,
    cronogram: any,
    soundAlert: string,
    timeCronograma: any,
}

//TIPAGEM DO ALERT
interface Alert {
    type: string,
    text: string,
}

//CRIA E EXPORTA O PROVEDOR DOS ESTADOS
export const MyProvider = ({ children } : { children: React.ReactNode }) => {
    
    //CRIA ESTADO GLOBAL DE CADA VARIAVEL
    const sucessColor = '#18ac42'
    const errorColor = '#ff3434'
    const [theme, setTheme] = useState<string | null>(localStorage.getItem('themePC'))
    const [timeCronogram, setTimeCronogram] = useState<number[]>([14, 3])
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [userS, setUserS] = useState<User | null>(localStorage.getItem('userPC') !== null ?
        {
            logged: JSON.parse(localStorage.getItem('userPC') as any).logged,
            name: JSON.parse(localStorage.getItem('userPC') as any).name,
            img: JSON.parse(localStorage.getItem('userPC') as any).img,
            id: JSON.parse(localStorage.getItem('userPC') as any).id,
            soundAlert: JSON.parse(localStorage.getItem('userPC') as any).soundAlert,
            simulations: JSON.parse(localStorage.getItem('userPC') as any).simulations,
            simulationsConcludeds: JSON.parse(localStorage.getItem('userPC') as any).simulationsConcludeds,
            cronogram: JSON.parse(localStorage.getItem('userPC') as any).cronogram,
            timeCronograma: JSON.parse(localStorage.getItem('userPC') as any).timeCronograma,
        } : { logged: false, name: '', img: '', id: '', simulations: [], simulationsConcludeds: 0, cronogram: [], soundAlert: 'https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fsounds%2F14.mp3?alt=media&token=05af905e-a0c0-4552-b428-bfa036e28a13', timeCronograma: [10, 0]}
    )
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<Alert>({ type: 'undefined', text: 'Alerta simples' })
    const [isLogout, setIsLogout] = useState<boolean>(false)
    const [isDelAccount, setIsDelAccount] = useState<boolean>(false)
    const [soundNotification, setSundNotification] = useState<string>('https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fsounds%2F14.mp3?alt=media&token=05af905e-a0c0-4552-b428-bfa036e28a13')

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
    const toggleUser = (name:string, img:string, id:string, simulations:any, simulationsConcludeds:number = 0, cronogram:any, soundAlert:string, timeCronograma:any, logged:boolean = true) => {
        localStorage.setItem('userPC', JSON.stringify({ logged: logged, name: name, img: img, id: id, simulations: simulations, simulationsConcludeds: simulationsConcludeds, cronogram: cronogram }))
        setUserS({ logged: logged, name: name, img: img, id: id, simulations: simulations, simulationsConcludeds: simulationsConcludeds, cronogram: cronogram, soundAlert: soundAlert, timeCronograma: timeCronograma })
    }
    
    //FUNÇÃO RESPONSAVEL POR TROCAR O ESTADO DE LOADING DA APLICAÇÃO
    const toggleLoading = (state:boolean) => {
        setLoading(state)
    }
    
    //FUNÇÃO RESPONSÁVEL POR DETERMINAR O TIPO E O TEXTO DO ALERTA
    const toggleAlert = (type: string, text: string ) => {
        setMessage({ type: type, text: text })
    }

    //FUNÇÃO RESPONSÁVEL POR DAR LOGOUT NA CONTA DO USUÁRIO
    const toggleLogout  = (state:boolean) => {
        setIsLogout(state)
    }
    
    //FUNÇÃO RESPONSÁVEL POR DELETAR NA CONTA DO USUÁRIO
    const toggleDeleteAccount  = (state:boolean) => {
        setIsDelAccount(state)
    }

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR O CRONOGRAMA
    const toggleCronogram = (hour:number, minute:number) => {
        setTimeCronogram([hour, minute])
    }
    
    //FUNÇÃO RESPONSÁVEL POR MUDAR O SOM DA NOTIFICAÇÃO
    const toggleSoundNotification = (soundURL:string) => {
        setSundNotification(soundURL)
    }
    //RETORNA TUDO PARA SER USADO EM TODO O SITE
    return (
        <MyContext.Provider value={{ sucessColor, errorColor, theme, toggleTheme, menuOpen, toggleMenuOpen, userS, toggleUser, loading, toggleLoading, message, toggleAlert, isLogout, toggleLogout, isDelAccount, toggleDeleteAccount, timeCronogram, toggleCronogram, soundNotification, toggleSoundNotification }}>
            {children}
        </MyContext.Provider>
    )
}

//EXPORTA A VARIAVEL PARA PODER PEGAR O CONTEUDO EM OUTRAS PARTE DA APLICAÇÃO
export const useMyContext = () => useContext(MyContext)