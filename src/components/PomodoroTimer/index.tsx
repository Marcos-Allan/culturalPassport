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

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DOS ÍCONES
import { FaPause, FaPlay, FaRedo } from "react-icons/fa";

const PomodoroTimer = () => {
  
  //RESGATA AS VARIAVEIS GLOBAIS
  const states: any = useMyContext();

  //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
  const { theme, pomodoroState, pomodoroTime, breakTime, isPomodoroActive, isPaused, resumePomodoro, stopPomodoro, startPomodoro, viewPomodoroTimer } = states;

  return (
    <>
      {viewPomodoroTimer == true && (
        <div
          className={`
            pomodoro-container absolute top-0 right-0 m-3 px-3 py-1 rounded-[8px]
            ${theme == 'light' ? 'bg-my-black text-my-white' : 'bg-my-white text-my-black'}
          `}
        >
          
          <h2 className="text-center">{pomodoroState === 'work' ? 'Trabalhando' : 'Descansando'}</h2>
          
          <div className="timer text-center">
            <span>
              {Math.floor(pomodoroState === 'work' ? pomodoroTime / 60 : breakTime / 60)}:
              {(pomodoroState === 'work' ? pomodoroTime % 60 : breakTime % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <div className={`w-full flex items-center justify-between`}>
            {isPaused == true && (
              <button onClick={() => {
                resumePomodoro(); // Despausar o Pomodoro se estiver pausado
              }}>
                <FaPlay />
              </button>
            )}
            
            {isPaused == false && (
              <button onClick={() => {
                stopPomodoro(); // Despausar o Pomodoro se estiver pausado
              }}>
                <FaPause />
              </button>
            )}
            
            {isPomodoroActive == false && (
              <button onClick={() => {
                startPomodoro(); // Caso contrário, inicia o Pomodoro(); // Despausar o Pomodoro se estiver pausado
              }}>
                <FaRedo />
              </button>
            )}
          </div>

        </div>
      )}
    </>
  );
};

export default PomodoroTimer;
