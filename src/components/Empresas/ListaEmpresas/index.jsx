import { useContext, useEffect, useState } from "react";
import style from "./styles.module.css";
import { getAllEmpresas } from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { EmpresaContext } from "../../../contexts/empresaContext";

export function ListaEmpresas() {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedEmpresa } = useContext(EmpresaContext);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmpresas()
            .then((response) => {
                setEmpresas(response.data.content);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        console.log(empresas);
    }, [empresas])

    function handleLinkClick(empresa) {
        selectedEmpresa(empresa);
    }

    function handleButtonClick() {
        navigate(`/empresa/novo`);
    }


    return (
        <div className={style.container}>
            <div className={style.containerCard}>
                <div className={style.cardTitle}>
                    <div>
                        <h3>Empresas</h3>
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
                                <th>ID</th><th>Nome</th><th>CNPJ</th><th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                loading ? (
                                    <tr>
                                        <td colSpan={4}><h3>Carregando Empresas...</h3></td>
                                    </tr>
                                ) :
                                    (
                                        empresas.map((empresa) => (
                                            <tr key={empresa.empresaId}>
                                                <td><Link onClick={handleLinkClick(empresa)} to={`/empresa/${empresa.empresaId}`} className={style.tableLink}>{empresa.empresaId}</Link></td>
                                                <td>{empresa.empresaNomeFantasia}</td>
                                                <td>{empresa.empresaCNPJ}</td>
                                                <td>{empresa.empresaStatus}</td>
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