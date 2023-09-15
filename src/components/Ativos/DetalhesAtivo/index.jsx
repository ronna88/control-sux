import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getAtivo } from "../../../services/api";

export function DetalhesAtivo() {

    const navigate = useNavigate();
    const { ativoId } = useParams();
    const [ativo, setAtivo] = useState();

    useEffect(() => {
        
        getAtivo(ativoId)
        .then((response)=> {
            setAtivo(response.data);
        })
        .catch((error)=> {
            console.log(error);
        })
        
    }, [])

    function handleButtonClick() {
        navigate(`/ativo/${ativo.ativoId}/editar`);
    }


    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.cardHeader}>
                    <div>
                        <h3>
                            Detalhes do Ativo
                        </h3>
                    </div>
                    <div>
                        <button className={style.btnEditar} onClick={handleButtonClick}>Editar</button>
                    </div>
                </div>
                

                {ativo ? (
                    <div className={style.cardAttrib}>
                        <div className={style.leftAttrib}>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>ID:</strong>
                                    <span>{ativo.ativoId}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Descrição:</strong>
                                    <span>{ativo.ativoDescricao}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Valor de Compra:</strong>
                                    <span>{ativo.ativoValorCompra}</span>
                                </div>
                            </div>
                            <div className="details-card">
                                <div className={style.attrib}>
                                    <strong>Valor da Locação:</strong>
                                    <span>{ativo.ativoValorLocacao}</span>
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