import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { getAllContratos } from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";

export function ListaContratos() {
    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllContratos()
            .then((response) => {
                setContratos(response.data.content);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        console.log(contratos);
    }, [contratos])

    function handleButtonClick() {
        navigate(`/contrato/novo`);
    }


    return (
        <div className={style.container}>
            <div className={style.containerCard}>
                <div className={style.cardTitle}>
                    <div>
                        <h3>Contratos</h3>
                    </div>
                    <div>
                        <button className={style.btnEditar} onClick={handleButtonClick}>Adicionar</button>
                    </div>
                </div>
                <div>

                </div>
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th><th>Descrição</th><th>Valor Visita</th><th>Valor Remoto</th><th>Horas Inclusas</th><th>Cliente</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                loading ? (
                                    <tr>
                                        <td colSpan={4}><h3>Carregando Contratos...</h3></td>
                                    </tr>
                                ) :
                                    (
                                        contratos.map((contrato) => (
                                            <tr key={contrato.contratoId}>
                                                <td><Link to={`/contrato/${contrato.contratoId}`} className={style.tableLink}>{contrato.contratoId}</Link></td>
                                                <td>{contrato.contratoDescricao}</td>
                                                <td>{contrato.contratoValorVisita}</td>
                                                <td>{contrato.contratoValorRemoto}</td>
                                                <td>{contrato.contratoHorasContempladas}</td>
                                                <td>{contrato.cliente.clienteNome}</td>
                                            </tr>
                                        ))
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}