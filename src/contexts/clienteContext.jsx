import { createContext, useState } from "react";

const ClienteContext = createContext({});

const ClienteProvider = ({children}) => {
    const [selCliente, setSelCliente] = useState();

    const selectedCliente = (cliente) => {
        setSelCliente(cliente);
    }

    const clearCliente = () => {
        setSelCliente();
        console.log(selCliente);
    }

    const clienteContextData = {
        selCliente,
        setSelCliente,
        selectedCliente,
        clearCliente
    }

    return (
        <ClienteContext.Provider value={clienteContextData}>
            {children}
        </ClienteContext.Provider>
    )
}

export { ClienteContext, ClienteProvider }