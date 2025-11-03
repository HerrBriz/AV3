import { useState } from 'react'
import type { UserRole } from '../types/auth'

interface RegisterData {
  username: string
  password: string
  nome: string
  role: UserRole
}

type Props = {
  onRegister: (data: RegisterData) => void
  onBackToLogin: () => void
}

export default function Register({ onRegister, onBackToLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [role, setRole] = useState<UserRole>('operador')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onRegister({ username, password, nome, role })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-icon">✈️</div>
          <h2>Criar Conta</h2>
          <p className="muted">Cadastre-se no Sistema Aerocode</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input 
              id="nome"
              type="text" 
              value={nome} 
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input 
              id="username"
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Função</label>
            <select 
              id="role"
              value={role} 
              onChange={e => setRole(e.target.value as UserRole)}
              required
            >
              <option value="operador">Operador</option>
              <option value="engenheiro">Engenheiro</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn primary full-width">
            Cadastrar
          </button>
        </form>

        <div className="auth-footer">
          <p>Já tem uma conta?</p>
          <button onClick={onBackToLogin} className="btn link">
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  )
}