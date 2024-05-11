//IMPORTA O PROVEDOR
import { MyProvider } from "./geral";

//EXPORTA COMO UM COMPONENTE PARA PODER SER USADO NA APLICAÇÃO
export const Provider = ({ children } : { children:React.ReactNode }) => {
    return (
        <>
            <MyProvider>{children}</MyProvider>
        </>
    )
}