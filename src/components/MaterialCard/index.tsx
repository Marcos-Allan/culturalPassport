//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from 'react'

//TIPAGEM DAS PROPRIEDADES DO COMPONENTE
interface Props {
    background: Number,
    TitleMateria: String,
    ContentMateria: String,
}


export default function MaterialCard(props: Props) {
    //USO DO HOOK useState
    const [colors, setColors] = useState<String[]>([
        '#527fef',
        '#38da56',
        '#52bd9b',
        '#987dd0',
        '#c47e3d',
    ])

    useEffect(() => {
        setColors((colors) => [...colors, '#c6619e'])
    },[])
    
    return(
        <div
            className={`relative mt-[30px] w-[90%] sm:w-3/12 h-[100px] rounded-[8px] p-3`}
            style={{ backgroundColor: `${colors[Number(props.background)]}` }}
        >

            <p className={`text-[22px] text-my-white font-semibold`}>{props.TitleMateria}</p>

            <p className={`text-[10px] text-my-white font-semibold`}>{props.ContentMateria}</p>

            <div
                className={`rounded-[50%] w-[50px] h-[50px] absolute bottom-[-12%] right-[5%] border-[3px] bg-my-white
                `}
                style={{ borderColor: `${colors[Number(props.background)]}` }}
            >

            </div>
            
        </div>
    )
}