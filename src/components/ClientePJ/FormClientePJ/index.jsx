import { useContext, useEffect, useState } from "react";
import { ClienteContext } from "../../../contexts/clienteContext";
import style from "./styles.module.css";
import { createClientePJ, getClientePJ, saveClientePJ } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { SelectEmpresa } from "../../SelectEmpresas";

export function FormClientePJ() {

    const navigate = useNavigate();
    const { clearCliente } = useContext(ClienteContext);
    const { clienteId } = useParams();

    const [cliente, setCliente] = useState({
        clienteNome: '',
        clienteRazaoSocial: '',
        clienteInscricaoEstadual: '',
        clienteCNPJ: '',
        clienteTelefone: '',
        clienteEmail: '',
        clienteEndereco: '',
        clienteNumero: '',
        clienteBairro: '',
        clienteCidade: '',
        clienteUF: '',
        clienteCEP: '',
        empresa: ''
    });
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if (clienteId !== undefined) {
            setEditar(true);
            getClientePJ(clienteId)
                .then((response) => {
                    setCliente(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            setEditar(false);
            setCliente({
                clienteNome: '',
                clienteRazaoSocial: '',
                clienteInscricaoEstadual: '',
                clienteCNPJ: '',
                clienteTelefone: '',
                clienteEmail: '',
                clienteEndereco: '',
                clienteNumero: '',
                clienteBairro: '',
                clienteCidade: '',
                clienteUF: '',
                clienteCEP: '',
                empresa: ''
            });
        }
    }, [])



    function handleSubmit(e) {
        e.preventDefault();
        if (editar) {
            saveClientePJ(cliente)
                .then((res) => {
                    let id = cliente.clienteId;
                    clearCliente();
                    setCliente('');
                    navigate(`/cliente/pj/${id}`);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            createClientePJ(cliente)
                .then((res) => {
                    clearCliente();
                    setCliente('');
                    navigate(`/client/pj`);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }



    return (
        <>
            {cliente ? (

                <div className={style.container}>
                    <div className={style.card}>
                        <div className={style.cardHeader}>
                            <div>
                                <h3>Formulário Cliente Pessoa Jurídica</h3>
                            </div>
                        </div>
                        <div className={style.formContainer}>
                            <form className={style.formEmpresa}>

                                <SelectEmpresa setCliente={setCliente} cliente={cliente} />

                                <label for="nome" className={style.label}>Nome</label>
                                <input id="nome" type="text" placeholder="Nome" onChange={(e) => {
                                    setCliente({ ...cliente, clienteNome: e.target.value })
                                }} value={cliente.clienteNome} />

                                <label for="razaoSocial" className={style.label}>Razão Social</label>
                                <input id="razaoSocial" type="text" placeholder="Razão Social" onChange={(e) => {
                                    setCliente({ ...cliente, clienteRazaoSocial: e.target.value })
                                }} value={cliente.clienteRazaoSocial} />

                                <label for="cnpj" className={style.label}>CNPJ</label>
                                <input id="cnpj" type="text" placeholder="CNPJ" onChange={(e) => {
                                    setCliente({ ...cliente, clienteCNPJ: e.target.value })
                                }} value={cliente.clienteCNPJ} />

                                <label for="ie" className={style.label}>Inscrição Estadual</label>
                                <input id="ie" type="text" placeholder="Inscrição Estadual" onChange={(e) => {
                                    setCliente({ ...cliente, clienteInscricaoEstadual: e.target.value })
                                }} value={cliente.clienteInscricaoEstadual} />

                                <label for="telefone" className={style.label}>Telefone</label>
                                <input id="telefone" type="text" placeholder="Telefone" onChange={(e) => {
                                    setCliente({ ...cliente, clienteTelefone: e.target.value })
                                }} value={cliente.clienteTelefone} />

                                <label for="email" className={style.label}>Email</label>
                                <input id="email" type="text" placeholder="Email" onChange={(e) => {
                                    setCliente({ ...cliente, clienteEmail: e.target.value })
                                }} value={cliente.clienteEmail} />

                                <label for="endereco" className={style.label}>Endereço</label>
                                <input id="endereco" type="text" placeholder="Endereço" onChange={(e) => {
                                    setCliente({ ...cliente, clienteEndereco: e.target.value })
                                }} value={cliente.clienteEndereco} />

                                <label for="numero" className={style.label}>Numero</label>
                                <input id="numero" type="text" placeholder="Numero" onChange={(e) => {
                                    setCliente({ ...cliente, clienteNumero: e.target.value })
                                }} value={cliente.clienteNumero} />

                                <label for="bairro" className={style.label}>Bairro</label>
                                <input id="bairro" type="text" placeholder="Bairro" onChange={(e) => {
                                    setCliente({ ...cliente, clienteBairro: e.target.value })
                                }} value={cliente.clienteBairro} />

                                <label for="cidade" className={style.label}>Cidade</label>
                                <input id="cidade" type="text" placeholder="Cidade" onChange={(e) => {
                                    setCliente({ ...cliente, clienteCidade: e.target.value })
                                }} value={cliente.clienteCidade} />

                                <label for="uf" className={style.label}>UF</label>
                                <input id="uf" type="text" placeholder="UF" onChange={(e) => {
                                    setCliente({ ...cliente, clienteUF: e.target.value })
                                }} value={cliente.clienteUF} />

                                <label for="cep" className={style.label}>CEP</label>
                                <input id="cep" type="text" placeholder="CEP" onChange={(e) => {
                                    setCliente({ ...cliente, clienteCEP: e.target.value })
                                }} value={cliente.clienteCEP} />

                                <button className={style.btnSalvar} onClick={(e) => handleSubmit(e)}>Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>

            ) : (
                "Carregando dados do cliente..."
            )}
        </>
    )
}