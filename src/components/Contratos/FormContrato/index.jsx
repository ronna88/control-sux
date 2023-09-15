import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { getContrato, saveContrato, createContrato } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { SelectClientes } from "../../SelectClientes";
import { SelectAtivos } from "../../SelectAtivos";

export function FormContrato() {

    const navigate = useNavigate();
    const { contratoId } = useParams();

    const [contrato, setContrato] = useState({
        contratoDescricao: '',
        contratoValorVisita: '',
        contratoValorRemoto: '',
        contratoHorasContempladas:'',
        cliente:''
    });
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if (contratoId !== undefined) {
            setEditar(true);
            getContrato(contratoId)
                .then((response) => {
                    setContrato(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setEditar(false);
            setContrato({
                contratoDescricao: '',
                contratoValorVisita: '',
                contratoValorRemoto: '',
                contratoHorasContempladas:'',
                cliente:''
            });
        }
    }, [])


    function handleSubmit(e) {
        e.preventDefault();
        if (editar) {
            saveContrato(contrato)
                .then((res) => {
                    let id = contrato.contratoId;
                    setContrato('');
                    navigate(`/contrato/${id}`);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            createContrato(contrato)
                .then((res) => {
                    setContrato('');
                    navigate(`/contrato`);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    return (
        <>
            {contrato ? (

                <div className={style.container}>
                    <div className={style.card}>
                        <div className={style.cardHeader}>
                            <div>
                                <h3>Formulário Contrato</h3>
                            </div>
                        </div>
                        <div className={style.formContainer}>
                            <form className={style.formEmpresa}>

                                <SelectClientes setEstado={setContrato} estado={contrato}/>

                                <label for="descricao" className={style.label}>Descrição</label>
                                <input type="text" placeholder="Descrição" onChange={(e) => { 
                                    setContrato({ ...contrato, contratoDescricao: e.target.value }) }} value={contrato.contratoDescricao} />

                                <label for="visita" className={style.label}>Valor da Visita</label>
                                <input id="visita" type="text" placeholder="Valor da Visita" onChange={(e) => {
                                    setContrato({ ...contrato, contratoValorVisita: e.target.value }) }} value={contrato.contratoValorVisita} />

                                <label for="remoto" className={style.label}>Valor do Acesso</label>
                                <input id="remoto" type="text" placeholder="Valor do Acesso" onChange={(e) => { 
                                    setContrato({ ...contrato, contratoValorRemovo: e.target.value }) }} value={contrato.contratoValorRemovo} />
                                
                                <label for="incluso" className={style.label}>Horas Inclusas</label>
                                <input id="incluso" type="text" placeholder="Horas Inclusas" onChange={(e) => { 
                                    setContrato({ ...contrato, contratoHorasContempladas: e.target.value }) }} value={contrato.contratoHorasContempladas} />
                                
                                <SelectAtivos setEstado={setContrato} estado={contrato}/>

                                <button className={style.btnSalvar} onClick={(e) => handleSubmit(e)}>Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>

            ) : (
                "Carregando dados do contrato..."
            )}
        </>
    )
}