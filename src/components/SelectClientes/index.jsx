import { useEffect, useState } from "react"
import { getAllClientes } from "../../services/api"

export function SelectClientes({ setEstado, estado }) {
    const [listaClientes, setListaClientes] = useState([]);

    useEffect(() => {
        getAllClientes()
            .then((response) => {
                console.log(response)
                setListaClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
    }, [listaClientes])

    return (
        <>
            <label for="selectClientes" style={{fontWeight:"bold"}}>Cliente</label>
            <select id="selectClientes" className="form-select" aria-label="Default select example" onChange={(e) => {
                setEstado({ ...estado, cliente: e.target.value })
            }} >
                <option selected>Selecione o cliente...</option>
                { listaClientes ?
                    (
                        listaClientes.map((cliente) => (
                            <option value={cliente.clienteId}>{cliente.clienteNome}</option>
                        ))
                    ) : ""
                }
            </select>
        </>
    )
}