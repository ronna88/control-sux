import { useContext, useEffect, useState } from "react";
import { ClienteContext } from "../../../contexts/clienteContext";
import style from "./styles.module.css";
import { createClientePF, getCliente, saveClientePF } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { SelectEmpresa } from "../../SelectEmpresas";

export function FormClientePF() {

    const navigate = useNavigate();
    const { clearCliente  } = useContext(ClienteContext);
    const { clienteId } = useParams();

    const [cliente, setCliente] = useState({
        clienteNome: '',
        clienteTelefone: '',
        clienteCPF:'',
        clienteEmail: '',
        clienteEndereco: '',
        clienteNumero: '',
        clienteBairro: '',
        clienteCidade:'',
        clienteUF:'',
        clienteCEP:'',
        empresa: ''
    });
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if(clienteId !== undefined) {
            setEditar(true);
            getCliente(clienteId)
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
                clienteTelefone: '',
                clienteEmail: '',
                clienteEndereco: '',
                clienteNumero: '',
                clienteBairro: '',
                clienteCidade:'',
                clienteUF:'',
                clienteCEP:'',
                empresa: ''
            });
        }
    }, [])

    

    function handleSubmit(e) {
        e.preventDefault();
        if(editar) {
            saveClientePF(cliente)
            .then((res) => {
                let id = cliente.clienteId;
                clearCliente();
                setCliente('');
                navigate(`/cliente/pf/${id}`);
            })
            .catch((error)=> {
                console.log(error);
            })
        } else {
            createClientePF(cliente)
            .then((res) => {
                clearCliente();
                setCliente('');
                navigate(`/cliente`);
            })
            .catch((error)=> {
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
                                <h3>Formulário Cliente Pessoa Física</h3>
                            </div>
                        </div>
                        <div className={style.formContainer}>
                            <form className={style.formEmpresa}>
                                <SelectEmpresa setCliente={setCliente} cliente={cliente}/>
                                <input type="text" placeholder="Nome" onChange={(e) => { 
                                    setCliente({...cliente, clienteNome:e.target.value}) }} value={cliente.clienteNome} />
                                <input type="text" placeholder="CPF" onChange={(e) => { 
                                    setCliente({...cliente, clienteCPF:e.target.value}) }} value={cliente.clienteCPF} />
                                <input type="text" placeholder="Telefone" onChange={(e) => { 
                                    setCliente({...cliente, clienteTelefone:e.target.value}) }} value={ cliente.clienteTelefone } />
                                <input type="text" placeholder="Email" onChange={(e) => { 
                                    setCliente({...cliente, clienteEmail:e.target.value}) }} value={cliente.clienteEmail} />
                                <input type="text" placeholder="Endereço" onChange={(e) => { 
                                    setCliente({...cliente, clienteEndereco:e.target.value}) }} value={cliente.clienteEndereco} />
                                <input type="text" placeholder="Numero" onChange={(e) => { 
                                    setCliente({...cliente, clienteNumero:e.target.value}) }} value={cliente.clienteNumero} />
                                <input type="text" placeholder="Bairro" onChange={(e) => { 
                                    setCliente({...cliente, clienteBairro:e.target.value}) }} value={cliente.clienteBairro} />
                                <input type="text" placeholder="Cidade" onChange={(e) => { 
                                    setCliente({...cliente, clienteCidade:e.target.value}) }} value={cliente.clienteCidade} />
                                <input type="text" placeholder="UF" onChange={(e) => { 
                                    setCliente({...cliente, clienteUF:e.target.value}) }} value={cliente.clienteUF} />
                                <input type="text" placeholder="CEP" onChange={(e) => { 
                                    setCliente({...cliente, clienteCEP:e.target.value}) }} value={cliente.clienteCEP} />
                               
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