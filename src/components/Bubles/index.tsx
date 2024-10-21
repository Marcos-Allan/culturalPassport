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
import { motion, Variants } from 'framer-motion';

const Bubble = () => {
    //ARRAY DE CORES
    const colors = ["#5A94F285", "#BF00FF85", "#4882FE85, #20DB4885", "#4B155685", "#7A44A085"];
  
    //ESCOLHE UMA COR ALEATÓRIA
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    //VARIÁVEIS DE POSIÇÃO E ANIMAÇÃO GERADAS ALEATORIAMENTE
    const randomX = Math.random() * 100;
    const randomYStart = 100 + Math.random() * 50;
    const randomYEnd = -10 - Math.random() * 30;
    const randomDelay = Math.random() * 5;
    const randomDuration = 4 + Math.random() * 4;
    const randomSize = 20 + Math.random() * 40;

    const bubbleVariants:Variants = {
        start: {
            y: `${randomYStart}vh`,
            opacity: 0,
            scale: 0.5,
        },
        end: {
            y: `${randomYEnd}vh`,
            opacity: 1,
            scale: 1.2,
            transition: {
                duration: randomDuration,
                delay: randomDelay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
            },
        },
    };

  return (
    <motion.div
      className="bubble"
      variants={bubbleVariants}
      initial="start"
      animate="end"
      style={{
        position: "absolute",
        left: `${randomX}%`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        backgroundColor: randomColor,
        borderRadius: "50%",
      }}
    />
  );
};

const BubbleAnimation = () => {
    const bubbles = Array.from({ length: 50 }, (_, i) => <Bubble key={i} />);

    return (
        <div style={{ 
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%", 
            height: "100vh", 
            overflow: "hidden",
            zIndex: 1,
            pointerEvents: "none",
            background: "transparent",
        }}>
            {bubbles}
        </div>
    );
};

export default BubbleAnimation;
