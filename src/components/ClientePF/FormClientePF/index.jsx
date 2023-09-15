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
                navigate(`/cliente/pf`);
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
                                
                                <label for="nome" className={style.label}>Nome</label>
                                <input id="nome" type="text" placeholder="Nome" onChange={(e) => { 
                                    setCliente({...cliente, clienteNome:e.target.value}) }} value={cliente.clienteNome} />
                                
                                
                                <label for="cpf" className={style.label}>CPF</label>
                                <input id="cpf" type="text" placeholder="CPF" onChange={(e) => { 
                                    setCliente({...cliente, clienteCPF:e.target.value}) }} value={cliente.clienteCPF} />
                                
                                <label for="telefone" className={style.label}>Telefone</label>
                                <input id="telefone" type="text" placeholder="Telefone" onChange={(e) => { 
                                    setCliente({...cliente, clienteTelefone:e.target.value}) }} value={ cliente.clienteTelefone } />
                                
                                <label for="email" className={style.label}>Email</label>
                                <input id="email" type="text" placeholder="Email" onChange={(e) => { 
                                    setCliente({...cliente, clienteEmail:e.target.value}) }} value={cliente.clienteEmail} />
                                
                                <label for="endereco" className={style.label}>Endereço</label>
                                <input id="endereco" type="text" placeholder="Endereço" onChange={(e) => { 
                                    setCliente({...cliente, clienteEndereco:e.target.value}) }} value={cliente.clienteEndereco} />
                                
                                <label for="numero" className={style.label}>Número</label>
                                <input id="numero" type="text" placeholder="Numero" onChange={(e) => { 
                                    setCliente({...cliente, clienteNumero:e.target.value}) }} value={cliente.clienteNumero} />
                                
                                <label for="bairro" className={style.label}>Bairro</label>
                                <input id="bairro" type="text" placeholder="Bairro" onChange={(e) => { 
                                    setCliente({...cliente, clienteBairro:e.target.value}) }} value={cliente.clienteBairro} />
                                
                                <label for="cidade" className={style.label}>Cidade</label>
                                <input id="cidade" type="text" placeholder="Cidade" onChange={(e) => { 
                                    setCliente({...cliente, clienteCidade:e.target.value}) }} value={cliente.clienteCidade} />
                                
                                <label for="uf" className={style.label}>UF</label>
                                <input id="uf" type="text" placeholder="UF" onChange={(e) => { 
                                    setCliente({...cliente, clienteUF:e.target.value}) }} value={cliente.clienteUF} />
                                
                                <label for="cep" className={style.label}>CEP</label>
                                <input id="cep" type="text" placeholder="CEP" onChange={(e) => { 
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