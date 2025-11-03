import type { FC } from 'react'

export type Funcionario = {
  id: string
  nome: string
  telefone: string
  endereco: string
  usuario: string
  funcao: 'Engenheiro' | 'Operador' | 'Administrador'
}

type Props = {
  data: Funcionario[]
  onEdit?: (f: Funcionario) => void
  onDelete?: (id: string) => void
}

const FuncionariosTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
  <div className="card table-card full-bleed">
      <div className="card-header">
        <h2>Funcionários</h2>
        <p className="muted">Gerenciar funcionários e usuários do sistema</p>
      </div>

      <table className="aero-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Usuário</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((f) => (
            <tr key={f.id}>
              <td>{f.nome}</td>
              <td>{f.telefone}</td>
              <td>{f.endereco}</td>
              <td>{f.usuario}</td>
              <td>
                <span className={`role ${f.funcao === 'Engenheiro' ? 'engenheiro' : f.funcao === 'Operador' ? 'operador' : 'administrador'}`}>
                  {f.funcao}
                </span>
              </td>
              <td className="actions">
                {onEdit && <button className="btn-icon" onClick={() => onEdit(f)} title="Editar">✏️</button>}
                {onDelete && <button className="btn-icon danger" onClick={() => onDelete(f.id)} title="Excluir">🗑️</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FuncionariosTable
