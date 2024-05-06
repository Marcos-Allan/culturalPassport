import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function Navbar(props: Props) {

    return(
        <div className={`w-[90%] gap-3 flex justify-start items-center flex-row`}>
            {props.children}
        </div>
    )
}