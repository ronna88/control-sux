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

export const getAllClientesPF = async () => {
    return await axios.get(`${baseUrl}/cliente/pf`);
}

export const getCliente = async (clienteId) => {
    return await axios.get(`${baseUrl}/cliente/pf/${clienteId}`);
}
export const getClientePJ = async (clienteId) => {
    return await axios.get(`${baseUrl}/cliente/pj/${clienteId}`);
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

export const getAllClientesPJ = async () => {
    return await axios.get(`${baseUrl}/cliente/pj`);
}