import { useContext, useEffect, useState } from "react";
import style from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { EmpresaContext } from "../../../contexts/empresaContext";
import { getEmpresa } from "../../../services/api";

export function DetalhesEmpresa() {

    const navigate = useNavigate();
    const { empresaId } = useParams();

    const { selEmpresa, setSelEmpresa } = useContext(EmpresaContext);

    useEffect(() => {
        
        getEmpresa(empresaId)
        .then((response)=> {
            setSelEmpresa(response.data);
        })
        
    }, [])

    function handleButtonClick() {
        navigate(`/empresa/${selEmpresa.empresaId}/editar`);
    }


    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.cardHeader}>
                    <div>
                        <h3>
                            Detalhes da Empresa
                        </h3>
                    </div>
                    <div>
                        <button className={style.btnEditar} onClick={handleButtonClick}>Editar</button>
                    </div>
                </div>
                

                {selEmpresa ? (
                    <div className={style.cardAttrib}>
                        <div className={style.leftAttrib}>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>ID:</strong>
                                    <span>{selEmpresa.empresaId}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Nome Fantasia:</strong>
                                    <span>{selEmpresa.empresaNomeFantasia}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>CNPJ:</strong>
                                    <span>{selEmpresa.empresaCNPJ}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>IE:</strong>
                                    <span>{selEmpresa.empresaInscricaoEstadual}</span>
                                </div>
                            </div>
                        </div>

                        <div className={style.rightCard}>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Endereço:</strong>
                                    <span>{selEmpresa.empresaEndereco}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Telefone:</strong>
                                    <span>{selEmpresa.empresaTelefone}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Email:</strong>
                                    <span>{selEmpresa.empresaEmail}</span>
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