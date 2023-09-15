import { Link } from 'react-router-dom'
import style from './styles.module.css'

export function Menu() {

    return (
        <div className={style.menu}>
            <div><Link className='dropdown-item' to="/empresa">Empresa</Link></div>
            <div className='dropdown'>
                <button className={`${style.btnDropdown} 'dropdown-toggle'`} data-bs-toggle="dropdown">Clientes</button>
                <ul className='dropdown-menu'>
                    <li><Link className='dropdown-item' to="/cliente/pf">Pessoa Física</Link></li>
                    <li><Link className='dropdown-item' to="/cliente/pj">Pessoa Jurídica</Link></li>
                </ul>
            </div>
            <div><Link className='dropdown-item' to="/ativo">Ativos</Link></div>
            <div><Link className='dropdown-item' to="/contrato">Contratos</Link></div>
            <div><Link className='dropdown-item' to="/visita">Visitas</Link></div>
            <div><Link className='dropdown-item' to="/funcionario">Funcionários</Link></div>
            <div><Link className='dropdown-item' to="/fechamento">Fechamentos</Link></div>
        </div>
    )
}