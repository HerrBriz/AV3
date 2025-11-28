import { useState } from 'react'
import type { LoginCredentials } from '../types/auth'

type Props = {
  onLogin: (credentials: LoginCredentials) => void
  onRegisterClick: () => void
}

export default function Login({ onLogin, onRegisterClick }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onLogin({ username, password })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-icon">✈️</div>
          <h2>Sistema Aerocode</h2>
          <p className="muted">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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

          <button type="submit" className="btn primary full-width">
            Entrar
          </button>
        </form>

        <div className="auth-footer">
          <p>Não tem uma conta?</p>
          <button onClick={onRegisterClick} className="btn link">
            Registre-se
          </button>
        </div>
      </div>
    </div>
  )
}