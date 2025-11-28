import type { FC } from 'react'

import type { UserRole } from '../types/auth'

type Props = {
  active?: string
  onNavigate?: (page: string) => void
  userName?: string
  userRole?: UserRole
  onLogout?: () => void
}

const Sidebar: FC<Props> = ({ active = 'aeronaves', onNavigate, userName, userRole, onLogout }) => {
  function nav(page: string) {
    onNavigate?.(page)
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">✈️</div>
        <div className="brand-text">
          <strong style={{color:'black'}}>Sistema Aerocode</strong>
          <small>Gerenciamento de Produção de Aeronaves</small>
        </div>
      </div>

      <nav className="nav">
        <button className={`nav-item ${active === 'aeronaves' ? 'active-link' : ''}`} onClick={() => nav('aeronaves')}>Aeronaves</button>
        <button className={`nav-item ${active === 'pecas' ? 'active-link' : ''}`} onClick={() => nav('pecas')}>Peças</button>
        <button className={`nav-item ${active === 'etapas' ? 'active' : ''}`} onClick={() => nav('etapas')}>Etapas de Produção</button>
        <button className={`nav-item ${active === 'funcionarios' ? 'active' : ''}`} onClick={() => nav('funcionarios')}>Funcionários</button>
        <button className={`nav-item ${active === 'testes' ? 'active' : ''}`} onClick={() => nav('testes')}>Testes</button>
        <button className={`nav-item ${active === 'relatorios' ? 'active' : ''}`} onClick={() => nav('relatorios')}>Relatórios</button>
      </nav>

      {/* User Info */}
      <div className="user-info">
        <div className="user-details">
          <strong>{userName}</strong>
          <span className={`role ${userRole}`}>{userRole}</span>
        </div>
        <button className="btn danger" onClick={onLogout}>
          Sair
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
