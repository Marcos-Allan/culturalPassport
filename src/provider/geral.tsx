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
import { useState, createContext, useContext, useEffect } from 'react'

//CONFIGURAÇÃO DA BASE URL DO AXIOS
import instance from '../utils/axios';

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
    const [timeCronogram, setTimeCronogram] = useState<number[]>([userS ? userS.timeCronograma[0] : 10, userS ? userS.timeCronograma[1] : 0])
    const [soundNotification, setSundNotification] = useState<string>(userS ? userS.soundAlert : 'https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fsounds%2F14.mp3?alt=media&token=05af905e-a0c0-4552-b428-bfa036e28a13')

    //ESTADO DO TIMER DE POMODORO
    const [pomodoroState, setPomodoroState] = useState<'work' | 'break'>('work'); //ESTADOS DO POMODORO
    const [pomodoroTime, setPomodoroTime] = useState<number>(25 * 60); //25 MINUTOS EM SEGUNDS
    const [breakTime, setBreakTime] = useState<number>(5 * 60); //5 MINUTOS EM SEGUNDOS
    const [isPomodoroActive, setIsPomodoroActive] = useState<boolean>(false); //ESTADO DO POMODORO SE ESTÁ ATIVO OU NÃO
    const [isPaused, setIsPaused] = useState<boolean>(false); //ESTADO DO POMODORO SE ESTÁ ATIVO OU NÃO
    const [viewPomodoroTimer, setViewPomodoroTimer] = useState<boolean>(false); //VERIFICA SE O TIMER ESTÁ PAUSADO OU NÃO

    //FUNÇÃO RESPONSÁVEL POR INICIAR O POMODORO
    const startPomodoro = () => {
        //MUDA O ESTADO DO POMODORO PARA ESTUDANDO
        setPomodoroState('work');
        //MUDA O ESTADO PARA O USUÁRIO PODER VER O TIMER DO POMODORO
        setViewPomodoroTimer(true)
        //INICIA O TEMPORIZADOR DE 25 MINUTOS
        setPomodoroTime(25 * 60);
        //DEIXA O POMODORO ATIVO
        setIsPomodoroActive(true);
        //GARANTE QUE O TIMER NÃO ESTÁ PAUSADO
        setIsPaused(false);
    };

    //FUNÇÃO RESPONSÁVEL POR INICIAR O DESCANSO
    const startBreak = () => {
        //MUDA O ESTADO DO POMODORO PARA DESCANSO
        setPomodoroState('break');
        //INICIA O TEMPORIZADOR DE 5 MINUTOS
        setBreakTime(5 * 60);
        //DEIXA O POMODORO ATIVO
        setIsPomodoroActive(true);
        //GARANTE QUE O TIMER NÃO ESTÁ PAUSADO
        setIsPaused(false);
    };

    //FUNÇÃO RESPONSÁVEL POR PARAR O POMODORO
    const stopPomodoro = () => {
        //PARA O TIMER
        setIsPomodoroActive(false);

        //MARCA O TIMER COMO PAUSADO
        setIsPaused(true);
    };

    //FUNÇÃO RESPONSÁVEL POR DESPAUSAR O POMODORO
    const resumePomodoro = () => {
        //RETOMA O TIMER
        setIsPomodoroActive(true);

        //DESPAUSA O TIMER
        setIsPaused(false);
    };

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR O ESTADO DE 'TRABALHANDO' PARA 'DESCANSANDO' E VICE-VERSA
    const updateCronogram = () => {
        if (pomodoroState === 'work') {
            toggleCronogram(Math.floor(pomodoroTime / 60), pomodoroTime % 60);
        } else {
            toggleCronogram(Math.floor(breakTime / 60), breakTime % 60);
        }
    };

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR A CONTAGEM DO TEMPO
    const tickTimer = () => {
        //VERIFICA SE O POMODORO ESTA ATIVO E SE ELE NÃO ESTÁ PAUSADO
        if (isPomodoroActive && !isPaused) {
            if (pomodoroState === 'work' && pomodoroTime > 0) {
                //DECREMENTA O TEMPO DE ESTUDAR
                setPomodoroTime((prev) => prev - 1);
            } else if (pomodoroState === 'break' && breakTime > 0) {
                //DECREMENTA O TEMPO DE DESCANSO
                setBreakTime((prev) => prev - 1);
            } else {
                //ALTERNA ENTRE O CICLO DE TRABALHO E DESCANSO
                if (pomodoroState === 'work') {
                    //TERMINA O CICLO DE TRABALHO E INICIA UM NOVO CICLO DE DESCANSO 
                    startBreak();
                    
                    //CHAMA O ALERT FALANDO PARA O USUÁRIO IR DESCANSAR
                    toggleAlert('success', 'Pomodoro terminado, hora do descanso!');
                } else {
                    //TERMINA O CICLO DE DESCANSO E INICIA UM NOVO CILCO DE TRABALHO
                    startPomodoro();

                    //CHAMA O ALERT FALANDO PARA O USUÁRIO VOLTAR A ESTUDAR
                    toggleAlert('success', 'Descanso terminado, volta ao trabalho!');
                }
            }
        }
    };

    //FUNÇÃO QUE ATUALIZA O TIMER DO POMODORO
    useEffect(() => {
        const interval = setInterval(() => {
            tickTimer();
            updateCronogram();
        }, 1000);

        //LIMPA O INTERVALO AO DESMONTAR O COMPONENTE
        return () => clearInterval(interval);
    }, [isPomodoroActive, pomodoroState, pomodoroTime, breakTime, isPaused]);

    //ERIFICA SE O USUÁRIO ESTÁ LOGADO OU NÃO
    if(userS){

        //FUNÇÃO RESPONSÁVEL POR INICIAR O ALERTA SONORO DA NOTIFICAÇÃO
        const playNotificationSound = () => {
            //SALVA O SOM DA NOTFICAÇÃO
            const alarm = new Audio(userS.soundAlert)

            //REPRODUZ O SOM
            alarm.play()
        };

        //FUNÇÃO RESPONSÁVEL POR VERIFICAR E DISPARAR A NOTIFICAÇÃO NO HORÁRIO ESPECIFICADO
        const verificarHorario = () => {
            //PEGA O TEMPO ATUAL
            const agora = new Date()

            //PEGA A HORA ATUAL
            const horas = agora.getHours()

            //PEGA OS MINUTOS ATUAIS
            const minutos = agora.getMinutes()

            //VERIFICA SE O TEMPO ATUAL É IGUAL AO TEMPO AGENDADO
            if (horas === Number(userS.timeCronograma[0]) && minutos === Number(userS.timeCronograma[1])) {

                //COLOCA ALERT NA TELA
                toggleAlert("warning", `São ${horas < 10 ? `0${horas}` : horas}:${minutos < 10 ? `0${minutos}` : minutos} - Hora da notificação!`)
                
                //CHAMA A FUNÇÃO QUE REPRODUZ O SOM
                playNotificationSound()
            }
        };

        //FUNÇÃO RESPONSÁVEL POR INICIAR A VERIFICAÇÃO DE HORÁRIO EM INTERVALOS DE UM MINUTO
        const iniciarVerificacaoHorario = () => {
            //INICIA A FUNÇÃO DE VERIFICAR HORÁRIO EM INTERVALOS DE UM MINUTO
            const intervalo = setInterval(verificarHorario, 60000)

            //DESMONTA O COMPONENTE
            return () => clearInterval(intervalo)
        };

        //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
        useEffect(() => {
            //VERIFICA SE O USUÁRIO TEM ESTÁ LOGADO OU NÃO
            if (userS.id !== '') {
                //FAZ UMA REQUISIÇÃO PARA VER SE O USUÁRIO ESTÁ NO BD
                instance.get(`/user/${userS.id}`)
                .then(response => {
                    //VERIFICA A RESPOSTA DA REQUISIÇÃO, SE O USUÁRIO ESTÁ CADASTRADO NO BD
                    if (response.data === "Usuário não encontrado") {
                        //REMOVE OS DADOS DO USUÁRIO DO localStorage DO FRONTEND
                        localStorage.removeItem('userPC')

                        //COLOCA ALERT NA TELA
                        toggleAlert('success', 'Faça o login novamente por favor')

                        //TIRA OS DADOS DO USUÁRIO DA APLICAÇÃO E REDIRECIONA ELE PARA TELA DE LOGIN
                        toggleUser('', '', '', [], 0, '', '', [0, 0], false)
                    }
                })
                .catch(error => console.log(error))
            }

            //REINICIA O A VERIFICAÇÃO DE HORÁRIO EM INTERVALOS DE 1 MINUTO
            const limparIntervalo = iniciarVerificacaoHorario()

            //RETORNA A FUNÇÃO DE VERIFICAR O HORÁRIO
            return limparIntervalo

        }, [userS.timeCronograma])
    }

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
        localStorage.setItem('userPC', JSON.stringify({
            logged: logged, 
            name: name,
            img: img,
            id: id,
            simulations: simulations,
            simulationsConcludeds: simulationsConcludeds,
            cronogram: cronogram,
            soundAlert: soundAlert,
            timeCronograma: timeCronograma
        }))
        
        setUserS({
            logged: logged,
            name: name,
            img: img,
            id: id,
            simulations: simulations,
            simulationsConcludeds: simulationsConcludeds,
            cronogram: cronogram,
            soundAlert: soundAlert,
            timeCronograma: timeCronograma
        })
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
        <MyContext.Provider value={{ sucessColor, errorColor, theme, toggleTheme, menuOpen, toggleMenuOpen, userS, toggleUser, loading, toggleLoading, message, toggleAlert, isLogout, toggleLogout, isDelAccount, toggleDeleteAccount, timeCronogram, toggleCronogram, soundNotification, toggleSoundNotification, pomodoroState, pomodoroTime, breakTime, isPomodoroActive, isPaused, resumePomodoro, stopPomodoro, startPomodoro, viewPomodoroTimer }}>
            {children}
        </MyContext.Provider>
    )
}

//EXPORTA A VARIAVEL PARA PODER PEGAR O CONTEUDO EM OUTRAS PARTE DA APLICAÇÃO
export const useMyContext = () => useContext(MyContext)