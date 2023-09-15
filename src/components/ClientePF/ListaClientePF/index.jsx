import { useContext, useEffect, useState } from "react";
import style from "./styles.module.css";
import { getAllClientesPF } from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ClienteContext } from "../../../contexts/clienteContext";

export function ListaClientePF() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedCliente } = useContext(ClienteContext);
    const navigate = useNavigate();

    useEffect(() => {
        getAllClientesPF()
            .then((response) => {
                setClientes(response.data.content);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
       console.log(clientes);
    }, [clientes])

    function handleLinkClick(cliente) {
        selectedCliente(cliente);
    }

    function handleButtonClick() {
        navigate(`/cliente/pf/novo`);
    }


    return (
        <div className={style.container}>
            <div className={style.containerCard}>
                <div className={style.cardTitle}>
                    <div>
                        <h3>Clientes Pessoa Física</h3>
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
                                <th>ID</th><th>Nome</th><th>CPF</th><th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                loading ? ( 
                                    <tr>
                                        <td colSpan={4}><h3>Carregando Clientes...</h3></td>
                                    </tr>
                                 ) : 
                                (
                                    clientes.map((cliente) => (
                                        <tr key={cliente.clienteId}>
                                            <td><Link onClick={handleLinkClick(cliente)} to={`/cliente/pf/${cliente.clienteId}`} className={style.tableLink}>{cliente.clienteId}</Link></td>
                                            <td>{cliente.clienteNome}</td>
                                            <td>{cliente.clienteCPF}</td>
                                            <td>{cliente.clienteStatus}</td>
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