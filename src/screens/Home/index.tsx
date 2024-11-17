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
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

//IMPORTAÇÃO DOS COMPONENTES
import Navbar from "../../components/Navbar/index.tsx";
import TitlePage from "../../components/TitlePage/index.tsx"
import Button from "../../components/Button/index.tsx"
import Text from "../../components/Text/index.tsx";
import ImageComponente from '../../components/ImageComponente/index.tsx';
import BubbleAnimation from '../../components/Bubles/index.tsx';
import ToggleThemeBtn from '../../components/ToggleThemeBtn/index.tsx';

//IMPORTAÇÃO DA IMAGEM USADA NA TELA
// import Person from '../../assets/imgs/person_1.png'
import Cerebro from '../../assets/imgs/cérebro.png'

//IMPORTAÇÃO DO PROVEDOR PARA PEGAR AS VARIÁVEIS GLOBAIS
import { useMyContext } from '../../provider/geral';

export default function Home(){

    //UTILIZAÇÃO DO HOOK DE NAVEGAÇÃO 
    const navigate = useNavigate()

    //RESGATA AS VARIAVEIS GLOBAIS
    const states:any = useMyContext()

    //DESESTRUTURA AS VARIAVEIS ESPECIFICADAS
    const { userS, toggleLoading } = states

    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //VERIFICA SE O USUÁRIO ESTÁ LOGADO
        if(userS.logged == true){
            //REDIRECIONA ELE PARA A PÁGINA DE MATÉRIAS
            navigate('/materias')
        }
    },[userS.logged])
    
    //FUNÇÃO CHAMADA AO RECARREGAR A PÁGINA
    useEffect(() => {
        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(false)
    },[])

    return(
        <>
            <Navbar>
                <TitlePage text="Bem Vindo Estudante" space={true} />
                <ToggleThemeBtn />
            </Navbar>
            
            <div className={`w-full flex flex-col items-center lg:flex-row lg:justify-center lg:items-center lg:h-full lg:w-[60%]`}>
                <Text
                    text="Seja muito bem-vindo ao nosso app de estudos. Se prepare para os vestibulares com simulados e conteúdos diversos"
                />

                <div className={`w-full flex flex-col items-center lg:w-[90%]`}>
                    {/* <ImageComponente img={Person} width={['100', '60', '400', '100', '450']} /> */}
                    <ImageComponente img={Cerebro} width={['100', '60', '400', '80', '450']} />
                        
                    <Button text="iniciar" route="/sign-in" />
                </div>
            </div>
            <BubbleAnimation />
        </>
    )
}