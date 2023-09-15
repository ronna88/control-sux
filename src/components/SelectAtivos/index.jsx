import { useEffect, useState } from "react"
import { getAllAtivos } from "../../services/api"

export function SelectAtivos({ setEstado, estado }) {
    const [listaAtivos, setListaAtivos] = useState([]);

    useEffect(() => {
        getAllAtivos()
            .then((response) => {
                setListaAtivos(response.data.content);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
    }, [listaAtivos])

    return (
        <>
            <label for="selectAtivos" style={{fontWeight:"bold"}}>Ativos</label>
            <select id="selectAtivos" className="form-select" aria-label="Default select example" onChange={(e) => {
                setEstado({ ...estado, listaAtivos: e.target.value })
            }} >
                <option selected>Selecione o ativo...</option>
                { listaAtivos ?
                    (
                        listaAtivos.map((ativo) => (
                            <option value={ativo.ativoId}>{ativo.ativoDescricao}</option>
                        ))
                    ) : ""
                }
            </select>
        </>
    )
}