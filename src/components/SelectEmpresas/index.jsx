import { useEffect, useState } from "react"
import { getAllEmpresas } from "../../services/api"

export function SelectEmpresa({ setCliente, cliente }) {
    const [listaEmpresas, setListaEmpresas] = useState([]);

    useEffect(() => {
        getAllEmpresas()
            .then((response) => {
                setListaEmpresas(response.data.content);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
    }, [listaEmpresas])

    return (
        <>
            <label for="selectEmpresa" style={{fontWeight:"bold"}}>Empresa Responsável</label>
            <select id="selectEmpresa" className="form-select" aria-label="Default select example" onChange={(e) => {
                setCliente({ ...cliente, empresa: e.target.value })
            }} >
                <option selected>Selecione a empresa de faturamento...</option>
                {
                    (
                        listaEmpresas.map((empresa) => (
                            <option value={empresa.empresaId}>{empresa.empresaNomeFantasia}</option>
                        ))
                    )
                }
            </select>
        </>
    )
}