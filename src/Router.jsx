import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import { Ativos } from "./components/Ativos"
import { Contratos } from "./components/Contratos"
import { Visitas } from "./components/Visitas"
import { Funcionarios } from "./components/Funcionarios"
import { Fechamentos } from "./components/Fechamentos"
import { ClientePJ } from "./components/ClientePJ";
import { ListaEmpresas } from "./components/Empresas/ListaEmpresas";
import { DetalhesEmpresa } from "./components/Empresas/DetalhesEmpresa";
import { FormEmpresa } from "./components/Empresas/FormEmpresa";
import { EmpresaProvider } from "./contexts/empresaContext";
import { Home } from "./pages/Home";
import { ListaClientePF } from "./components/ClientePF/ListaClientePF";
import { ClienteProvider } from "./contexts/clienteContext";
import { DetalhesClientePF } from "./components/ClientePF/DetalhesClientePF";
import { FormClientePF } from "./components/ClientePF/FormClientePF";


export function Router() {


    return (
        <Routes>
            <Route path="/" element={<AdminLayout />} >
                <Route path="/" element={<Home />} />

                
                    <Route path="/empresa" element={
                        <EmpresaProvider>
                            <ListaEmpresas />
                        </EmpresaProvider>
                    } />
                    <Route path="/empresa/:empresaId" element={
                        <EmpresaProvider>
                            <DetalhesEmpresa />
                        </EmpresaProvider>
                    } />
                    <Route path="/empresa/:empresaId/editar" element={
                        <EmpresaProvider>
                            <FormEmpresa />
                        </EmpresaProvider>
                    } />
                    <Route path="/empresa/novo" element={
                        <EmpresaProvider>
                            <FormEmpresa />
                        </EmpresaProvider>
                    } />
                
                    <Route path="/cliente/pf" element={
                        <ClienteProvider>
                            <ListaClientePF />
                        </ClienteProvider>
                    }  />
                    <Route path="/cliente/pf/:clienteId" element={
                        <ClienteProvider>
                            <DetalhesClientePF />
                        </ClienteProvider>
                    }  />
                    <Route path="/cliente/pf/:clienteId/editar" element={
                        <ClienteProvider>
                            <FormClientePF />
                        </ClienteProvider>
                    }  />
                    <Route path="/cliente/pf/novo" element={
                        <ClienteProvider>
                            <FormClientePF />
                        </ClienteProvider>
                    }  />




                <Route path="/cliente/pj" element={<ClienteProvider><ClientePJ /></ClienteProvider>} />


                <Route path="/ativo" element={<Ativos />} />
                <Route path="/contrato" element={<Contratos />} />
                <Route path="/visita" element={<Visitas />} />
                <Route path="/funcionario" element={<Funcionarios />} />
                <Route path="/fechamento" element={<Fechamentos />} />
            </Route>
        </Routes>
    )
}