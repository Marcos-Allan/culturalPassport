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

//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from 'react'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

//IMPORTAÇÃO DOS ÍCONES
import { FaPause, FaPlay, FaRedo, FaTimes } from "react-icons/fa"

const PomodoroTimer = () => {
  
  //RESGATA AS VARIAVEIS GLOBAIS
  const states: any = useMyContext();

  //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
  const { theme, pomodoroState, pomodoroTime, breakTime, isPomodoroActive, isPaused, resumePomodoro, stopPomodoro, startPomodoro, finishPomodoro, viewPomodoroTimer } = states;

  //UTILIZAÇÃO DO HOOK DE useState
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  //FUNÇÃO RESPONSÁVEL POR COMEÇAR O ARRASTE
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    //PEGA AS COORDENADAS QUE O USUÁRIO COLOCA A NOTIFICAÇÃO
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    //MUDA O ESTADO DE DRAG PARA true
    setDragging(true);
    //COLOCA A NOTIFICAÇÃO NA POSIÇÃO INICIAL
    setStartPosition({ x: clientX - position.x, y: clientY - position.y });
  };

  //FUNÇÃO RESPONSÁVEL POR MOVER O COMPONENTE
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragging) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      //CALCULA A NOVA POSIÇÃO
      let newX = clientX - startPosition.x;
      let newY = clientY - startPosition.y;

      //OBTÉM AS DIMENSÕES DA TELA E DA NOTIFICAÇÃO
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      //TAMANHO E ALTURA DO COMPONENTE FIXO
      const notificationWidth = 180;
      const notificationHeight = 180;

      //IMPEDE QUE A NOTIFICAÇÃO SAIA DA TELA
      if (newX < 0) newX = 0;//LIMITA A POSIÇÃO X
      if (newY < 0) newY = 0;//LIMITA A POSIÇÃO Y
      
      //LIMITA A POSIÇÃO X
      if (newX + notificationWidth > windowWidth) newX = windowWidth - notificationWidth;
      //LIMITA A POSIÇÃO Y
      if (newY + notificationHeight > windowHeight) newY = windowHeight - notificationHeight;

      //COLOCA A NOVA POSIÇÃO DO COMPONENTE
      setPosition({ x: newX, y: newY });
    }
  };

  //FUNÇÃO RESPONSÁVEL POR PARAR O ARRASTE 
  const handleStop = () => {
    //MUDA O ESTADO DE DRAG PARA false
    setDragging(false);
  };

  return (
    <>
      {viewPomodoroTimer == true && (
        <div
          style={{
            position: 'fixed',
            top: `${position.y}px`,
            left: `${position.x}px`,
            touchAction: 'none',
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart} 
          onMouseMove={handleMove}
          onTouchMove={handleMove} 
          onMouseUp={handleStop}
          onTouchEnd={handleStop} 
          onMouseLeave={handleStop} 
          className={`
            pomodoro-container m-3 px-8 py-1 rounded-[8px] ${dragging ? 'cursor-grabbing' : 'cursor-grab'}
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
              <button 
                className={`cursor-pointer`}
                onClick={() => {
                  resumePomodoro();
                }}
              >
                <FaPlay />
              </button>
            )}
            
            {isPaused == false && (
              <button
                className={`cursor-pointer`}
                onClick={() => {
                  stopPomodoro();
                }}
              >
                <FaPause />
              </button>
            )}  

            <button
              className={`absolute top-0 right-0 cursor-pointer p-2`}
              onClick={() => {
                finishPomodoro()
              }}
            >
              <FaTimes />
            </button>
            
            {isPomodoroActive == false && (
              <button
                className={`cursor-pointer`}
                onClick={() => {
                  startPomodoro();
                }}
              >
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
