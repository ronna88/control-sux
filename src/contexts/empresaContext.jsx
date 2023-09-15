import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const EmpresaContext = createContext({});

const EmpresaProvider = ({children}) => {
    const [selEmpresa, setSelEmpresa] = useState();

    const selectedEmpresa = (empresa) => {
        setSelEmpresa(empresa);
    }

    const clearEmpresa = () => {
        setSelEmpresa();
        console.log("clear");
        console.log(selEmpresa);
    }

    const empresaContextData = {
        selEmpresa,
        setSelEmpresa,
        selectedEmpresa,
        clearEmpresa
    }

    return (
        <EmpresaContext.Provider value={empresaContextData}>
            {children}
        </EmpresaContext.Provider>
    )
}

export { EmpresaContext, EmpresaProvider }