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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

//IMPORTAÇÃO DOS ICONES
import { IoMenu, IoCloseOutline } from "react-icons/io5";

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from "../../provider/geral"

export default function MenuButton() {

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const states:any = useMyContext()

    //RESGATA AS VARIAVEIS GLOBAIS
    const { theme, menuOpen, toggleMenuOpen } = states

    return(
        <>
            {/* VERIFICA SE O MENU ESTÁ ABERTO */}
            {menuOpen == true ? (
                //MUDA O ICONE DO MENU SE O MENU ESTIVER ABERTO
                <>
                    <IoCloseOutline 
                        className={`mt-4 text-[40px] sm:text-[34px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} z-[2] hover:scale-[1.2] transition-all duration-[.2s] cursor-pointer`}
                        onClick={() => toggleMenuOpen()}
                    />
                </>
            ):(
                //MUDA O ICONE DO MENU SE O MENU ESTIVER FECHADO
                <div className={`relative`}>
                    <SkeletonTheme baseColor={`${theme == 'light' ? '#818181bb' : '#c0c0c0bb'}`} highlightColor={`#ffffffbb`}>
                        {<IoMenu
                            className={`mt-4 text-[40px] sm:text-[34px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} z-[2] hover:scale-[1.2] transition-all duration-[.2s] cursor-pointer`}
                            onClick={() => toggleMenuOpen()}
                        /> || <Skeleton count={1} width={50} height={40} />}
                    </SkeletonTheme>
                </div> 
            )}
        </>
    )
}