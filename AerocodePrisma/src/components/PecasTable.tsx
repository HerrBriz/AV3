import type { FC } from 'react'

export type Peca = {
  id: string
  nome: string
  tipo: string
  fornecedor: string
  status: 'Pronta' | 'Em Produção' | 'Em Transporte'
}

type Props = {
  data: Peca[]
  onEdit?: (p: Peca) => void
  onDelete?: (id: string) => void
}

const PecasTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
  <div className="card table-card full-bleed">
      <div className="card-header">
        <h2>Peças</h2>
        <p className="muted">Gerenciar peças e componentes</p>
      </div>

      <table className="aero-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Fornecedor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.tipo}</td>
              <td>{p.fornecedor}</td>
              <td>
                <span className={`badge ${p.status === 'Pronta' ? 'pronta' : p.status === 'Em Produção' ? 'em-producao' : 'em-transporte'}`}>
                  {p.status}
                </span>
              </td>
              <td className="actions">
                {onEdit && <button className="btn-icon" onClick={() => onEdit(p)} title="Editar">✏️</button>}
                {onDelete && <button className="btn-icon danger" onClick={() => onDelete(p.id)} title="Excluir">🗑️</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PecasTable
