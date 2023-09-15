import { useContext, useEffect, useState } from "react";
import { EmpresaContext } from "../../../contexts/empresaContext";
import style from "./styles.module.css";
import { createEmpresa, getEmpresa, saveEmpresa } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export function FormEmpresa() {

    const navigate = useNavigate();
    const { clearEmpresa } = useContext(EmpresaContext);
    const { empresaId } = useParams();

    const [empresa, setEmpresa] = useState({
        empresaNomeFantasia: '',
        empresaCNPJ: '',
        empresaInscricaoEstadual: '',
        empresaEndereco: '',
        empresaEmail: '',
        empresaTelefone: '',
    });
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if(empresaId !== undefined) {
            setEditar(true);
            getEmpresa(empresaId)
                .then((response) => {
                    setEmpresa(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setEditar(false);
            setEmpresa({
                empresaNomeFantasia: '',
                empresaCNPJ: '',
                empresaInscricaoEstadual: '',
                empresaEndereco: '',
                empresaEmail: '',
                empresaTelefone: '',
            });
        }
    }, [])


    function handleSubmit(e) {
        e.preventDefault();
        if (editar) {
            saveEmpresa(empresa)
                .then((res) => {
                    let id = empresa.empresaId;
                    clearEmpresa();
                    setEmpresa('');
                    navigate(`/empresa/${id}`);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            createEmpresa(empresa)
            .then((res) => {
                clearEmpresa();
                setEmpresa('');
                navigate(`/empresa`);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }


    return (
        <>
            {empresa ? (

                <div className={style.container}>
                    <div className={style.card}>
                        <div className={style.cardHeader}>
                            <div>
                                <h3>Formulário Empresa</h3>
                            </div>
                        </div>
                        <div className={style.formContainer}>
                            <form className={style.formEmpresa}>
                                <input type="text" placeholder="Nome Fantasia" onChange={(e) => { setEmpresa({ ...empresa, empresaNomeFantasia: e.target.value }) }} value={empresa.empresaNomeFantasia} />
                                <input type="text" placeholder="CNPJ" onChange={(e) => { setEmpresa({ ...empresa, empresaCNPJ: e.target.value }) }} value={empresa.empresaCNPJ} />
                                <input type="text" placeholder="Inscrição Estadual" onChange={(e) => { setEmpresa({ ...empresa, empresaInscricaoEstadual: e.target.value }) }} value={empresa.empresaInscricaoEstadual} />
                                <input type="text" placeholder="Endereço" onChange={(e) => { setEmpresa({ ...empresa, empresaEndereco: e.target.value }) }} value={empresa.empresaEndereco} />
                                <input type="text" placeholder="Email" onChange={(e) => { setEmpresa({ ...empresa, empresaEmail: e.target.value }) }} value={empresa.empresaEmail} />
                                <input type="text" placeholder="Telefone" onChange={(e) => { setEmpresa({ ...empresa, empresaTelefone: e.target.value }) }} value={empresa.empresaTelefone} />
                                <button className={style.btnSalvar} onClick={(e) => handleSubmit(e)}>Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>

            ) : (
                "Carregando dados da empresa..."
            )}
        </>
    )
}