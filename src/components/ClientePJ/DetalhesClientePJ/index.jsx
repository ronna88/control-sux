import { useContext, useEffect, useState } from "react";
import style from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ClienteContext } from "../../../contexts/clienteContext";
import { getCliente } from "../../../services/api";

export function DetalhesClientePJ() {

    const navigate = useNavigate();
    const { clienteId } = useParams();

    const { selCliente, setSelCliente } = useContext(ClienteContext);

    useEffect(() => {
        
        getCliente(clienteId)
        .then((response)=> {
            setSelCliente(response.data);
        })
        
    }, [])

    function handleButtonClick() {
        navigate(`/cliente/pj/${selCliente.clienteId}/editar`);
    }


    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.cardHeader}>
                    <div>
                        <h3>
                            Detalhes do Cliente
                        </h3>
                    </div>
                    <div>
                        <button className={style.btnEditar} onClick={handleButtonClick}>Editar</button>
                    </div>
                </div>
                

                {selCliente ? (
                    <div className={style.cardAttrib}>
                        <div className={style.leftAttrib}>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>ID:</strong>
                                    <span>{selCliente.clienteId}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Nome:</strong>
                                    <span>{selCliente.clienteNome}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>CNPJ:</strong>
                                    <span>{selCliente.clienteCNPJ}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Telefone:</strong>
                                    <span>{selCliente.clienteTelefone}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Endereço:</strong>
                                    <span>{selCliente.clienteEndereco}</span>
                                </div>
                            </div>
                        </div>

                        <div className={style.rightCard}>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Bairro:</strong>
                                    <span>{selCliente.clienteBairro}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Cidade:</strong>
                                    <span>{selCliente.clienteCidade}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>UF:</strong>
                                    <span>{selCliente.clienteUF}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>CEP:</strong>
                                    <span>{selCliente.clienteCEP}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Empresa Responsável:</strong>
                                    <span><strong>{selCliente.empresa.empresaNomeFantasia}</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                    : "Carregando detalhes..."}
            </div>
        </div>
    )

}