import { MyProvider } from "./geral";

export const Provider = ({ children } : { children:React.ReactNode }) => {
    return (
        <>
            <MyProvider>{children}</MyProvider>
        </>
    )
}