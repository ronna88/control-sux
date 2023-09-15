import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { getAtivo, saveAtivo, createAtivo } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export function FormAtivo() {

    const navigate = useNavigate();
    const { ativoId } = useParams();

    const [ativo, setAtivo] = useState({
        ativoDescricao: '',
        ativoValorCompra: '',
        ativoValorLocacao: '',
    });
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if (ativoId !== undefined) {
            setEditar(true);
            getAtivo(ativoId)
                .then((response) => {
                    setAtivo(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setEditar(false);
            setAtivo({
                ativoDescricao: '',
                ativoValorCompra: '',
                ativoValorLocacao: '',
            });
        }
    }, [])


    function handleSubmit(e) {
        e.preventDefault();
        if (editar) {
            saveAtivo(ativo)
                .then((res) => {
                    let id = ativo.ativoId;
                    setAtivo('');
                    navigate(`/ativo/${id}`);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            createAtivo(ativo)
                .then((res) => {
                    setAtivo('');
                    navigate(`/ativo`);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    return (
        <>
            {ativo ? (

                <div className={style.container}>
                    <div className={style.card}>
                        <div className={style.cardHeader}>
                            <div>
                                <h3>Formulário Ativo</h3>
                            </div>
                        </div>
                        <div className={style.formContainer}>
                            <form className={style.formEmpresa}>
                                <label for="descricao" className={style.label}>Descrição</label>
                                <input type="text" placeholder="Descrição" onChange={(e) => { 
                                    setAtivo({ ...ativo, ativoDescricao: e.target.value }) }} value={ativo.ativoDescricao} />

                                <label for="compra" className={style.label}>Valor de Compra</label>
                                <input type="text" placeholder="Valor de Compra" onChange={(e) => {
                                    setAtivo({ ...ativo, ativoValorCompra: e.target.value }) }} value={ativo.ativoValorCompra} />

                                <label for="locacao" className={style.label}>Valor de Locação</label>
                                <input type="text" placeholder="Inscrição Estadual" onChange={(e) => { 
                                    setAtivo({ ...ativo, ativoValorLocacao: e.target.value }) }} value={ativo.ativoValorLocacao} />
                                
                                <button className={style.btnSalvar} onClick={(e) => handleSubmit(e)}>Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>

            ) : (
                "Carregando dados do ativo..."
            )}
        </>
    )
}