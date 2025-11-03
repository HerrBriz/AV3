export type UserRole = 'admin' | 'engenheiro' | 'operador'

export interface User {
  id: string
  username: string
  password: string
  role: UserRole
  nome: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface LoginCredentials {
  username: string
  password: string
}