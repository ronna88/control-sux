import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { getAllAtivos } from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";

export function ListaAtivos() {
    const [ativos, setAtivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAtivos()
            .then((response) => {
                setAtivos(response.data.content);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        console.log(ativos);
    }, [ativos])

    function handleButtonClick() {
        navigate(`/ativo/novo`);
    }


    return (
        <div className={style.container}>
            <div className={style.containerCard}>
                <div className={style.cardTitle}>
                    <div>
                        <h3>Ativos</h3>
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
                                <th>ID</th><th>Descrição</th><th>Valor Compra</th><th>Valor Locação</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                loading ? (
                                    <tr>
                                        <td colSpan={4}><h3>Carregando Ativos...</h3></td>
                                    </tr>
                                ) :
                                    (
                                        ativos.map((ativo) => (
                                            <tr key={ativo.ativoId}>
                                                <td><Link to={`/ativo/${ativo.ativoId}`} className={style.tableLink}>{ativo.ativoId}</Link></td>
                                                <td>{ativo.ativoDescricao}</td>
                                                <td>{ativo.ativoValorCompra}</td>
                                                <td>{ativo.ativoValorLocacao}</td>
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