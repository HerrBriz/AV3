import type { FC } from 'react'

const Sidebar: FC = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">✈️</div>
        <div className="brand-text">
          <strong>Sistema Aerocode</strong>
          <small>Gerenciamento de Produção de Aeronaves</small>
        </div>
      </div>

      <nav className="nav">
        <a className="nav-item active">Dashboard</a>
        <a className="nav-item active-link">Aeronaves</a>
        <a className="nav-item">Peças</a>
        <a className="nav-item">Etapas de Produção</a>
        <a className="nav-item">Funcionários</a>
        <a className="nav-item">Testes</a>
        <a className="nav-item">Relatórios</a>
      </nav>
    </aside>
  )
}

export default Sidebar
