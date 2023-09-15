import axios from "axios";

const baseUrl = "http://localhost:7000";


export const getAllEmpresas = async () => {
    return await axios.get(`${baseUrl}/empresa`);
}
export const getEmpresa = async (empresaId) => {
    return await axios.get(`${baseUrl}/empresa/${empresaId}`);
}
export const saveEmpresa = async (empresa) => {
    console.log("Atualizar Empresa");
    return axios.put(`${baseUrl}/empresa/${empresa.empresaId}`, {
        ...empresa
    });
}
export const createEmpresa = async (empresa) => {
    console.log("Criar Empresa...");
    return axios.post(`${baseUrl}/empresa/novo`, {
        ...empresa
    });
}
////////////////////////////////////////////////////////////////////////////////////
export const getAllClientesPF = async () => {
    return await axios.get(`${baseUrl}/cliente/pf`);
}
export const getCliente = async (clienteId) => {
    return await axios.get(`${baseUrl}/cliente/pf/${clienteId}`);
}
export const saveClientePF = async (cliente) => {
    console.log("Atualizar Cliente PF");
    delete cliente.empresa;
    return axios.put(`${baseUrl}/cliente/pf/${cliente.clienteId}`, {
        ...cliente
    });
}
export const createClientePF = async (cliente) => {
    console.log("Criar Cliente PF...");
    return axios.post(`${baseUrl}/cliente/pf/novo`, {
        ...cliente
    });
}
///////////////////////////////////////////////////////////////////////////////////////
export const getClientePJ = async (clienteId) => {
    return await axios.get(`${baseUrl}/cliente/pj/${clienteId}`);
}
export const getAllClientesPJ = async () => {
    return await axios.get(`${baseUrl}/cliente/pj`);
}
export const saveClientePJ = async (cliente) => {
    console.log("Atualizar Cliente PJ");
    delete cliente.empresa;
    return axios.put(`${baseUrl}/cliente/pj/${cliente.clienteId}`, {
        ...cliente
    });
}
export const createClientePJ = async (cliente) => {
    console.log("Criar Cliente PJ...");
    return axios.post(`${baseUrl}/cliente/pj/novo`, {
        ...cliente
    });
}
/////////////////////////////////////////////////////////////////////////////////////
export const getAllAtivos = async () => {
    return await axios.get(`${baseUrl}/ativo`);
}
export const getAtivo = async (ativoId) => {
    return await axios.get(`${baseUrl}/ativo/${ativoId}`);
}
export const saveAtivo = async (ativo) => {
    console.log("Atualizar Ativo");
    return axios.put(`${baseUrl}/ativo/${ativo.ativoId}`, {
        ...ativo
    });
}
export const createAtivo = async (ativo) => {
    console.log("Criar Ativo...");
    return axios.post(`${baseUrl}/ativo/novo`, {
        ...ativo
    });
}