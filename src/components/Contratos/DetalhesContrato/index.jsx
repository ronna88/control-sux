import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getContrato } from "../../../services/api";

export function DetalhesContrato() {

    const navigate = useNavigate();
    const { contratoId } = useParams();
    const [contrato, setContrato] = useState();

    useEffect(() => {
        
        getContrato(contratoId)
        .then((response)=> {
            setContrato(response.data);
        })
        .catch((error)=> {
            console.log(error);
        })
        
    }, [])

    function handleButtonClick() {
        navigate(`/contrato/${contrato.contratoId}/editar`);
    }


    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.cardHeader}>
                    <div>
                        <h3>
                            Detalhes do Contrato
                        </h3>
                    </div>
                    <div>
                        <button className={style.btnEditar} onClick={handleButtonClick}>Editar</button>
                    </div>
                </div>
                

                {contrato ? (
                    <div className={style.cardAttrib}>
                        <div className={style.leftAttrib}>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>ID:</strong>
                                    <span>{contrato.contratoId}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Descrição:</strong>
                                    <span>{contrato.contratoDescricao}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Valor da Visita:</strong>
                                    <span>{contrato.contratoValorVisita}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Valor do Acesso:</strong>
                                    <span>{contrato.contratoValorRemoto}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Horas Inclusas:</strong>
                                    <span>{contrato.contratoHorasContempladas}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Cliente:</strong>
                                    <span>{contrato.cliente.clienteNome}</span>
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