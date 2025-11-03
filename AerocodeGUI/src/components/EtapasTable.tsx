import type { FC } from 'react'

export type Etapa = {
  id: string
  nome: string
  prazo: string // date string
  status: 'Pendente' | 'Em Andamento' | 'Concluida'
  funcionarios: string
}

type Props = {
  data: Etapa[]
  onEdit?: (e: Etapa) => void
  onDelete?: (id: string) => void
}

const EtapasTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
  <div className="card table-card full-bleed">
      <div className="card-header">
        <h2>Etapas de Produção</h2>
        <p className="muted">Gerenciar etapas do processo produtivo</p>
      </div>

      <table className="aero-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Prazo</th>
            <th>Status</th>
            <th>Funcionários</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((et) => (
            <tr key={et.id}>
              <td>{et.nome}</td>
              <td>{et.prazo}</td>
              <td>
                <span className={`badge ${et.status === 'Concluida' ? 'pronta' : et.status === 'Em Andamento' ? 'em-producao' : ''}`}>
                  {et.status}
                </span>
              </td>
              <td>{et.funcionarios || 'Não atribuído'}</td>
              <td className="actions">
                <button className="btn-icon" title="Iniciar">▶️</button>
                {onEdit && <button className="btn-icon" onClick={() => onEdit(et)} title="Editar">✏️</button>}
                {onDelete && <button className="btn-icon danger" onClick={() => onDelete(et.id)} title="Excluir">🗑️</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EtapasTable
