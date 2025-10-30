import type { FC } from 'react'

export type Aeronave = {
  id: string
  codigo: string
  modelo: string
  tipo: string
  capacidade: number
  alcance: string
}

type Props = {
  data: Aeronave[]
  onEdit: (a: Aeronave) => void
  onDelete: (id: string) => void
}

const AeronavesTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="card table-card">
      <div className="card-header">
        <h2>Aeronaves</h2>
        <p className="muted">Gerenciar aeronaves em produção</p>
      </div>

      <table className="aero-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Alcance</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id}>
              <td>{a.codigo}</td>
              <td>{a.modelo}</td>
              <td>{a.tipo}</td>
              <td>{a.capacidade}</td>
              <td>{a.alcance}</td>
              <td className="actions">
                <button className="btn-icon" onClick={() => onEdit(a)} title="Editar">✏️</button>
                <button className="btn-icon danger" onClick={() => onDelete(a.id)} title="Excluir">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AeronavesTable
