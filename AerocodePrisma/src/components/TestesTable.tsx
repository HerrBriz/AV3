import type { FC } from 'react'

export type Teste = {
  id: string
  tipo: string
  resultado: 'Aprovado' | 'Reprovado'
  data: string
}

type Props = {
  data: Teste[]
  onEdit?: (t: Teste) => void
  onDelete?: (id: string) => void
}

const TestesTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
  <div className="card table-card full-bleed">
      <div className="card-header">
        <h2>Testes</h2>
        <p className="muted">Gerenciar testes de qualidade e certificação</p>
      </div>

      <table className="aero-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Resultado</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id}>
              <td>{t.tipo}</td>
              <td>
                <span className={`test-badge ${t.resultado === 'Aprovado' ? 'aprovado' : 'reprovado'}`}>
                  {t.resultado}
                </span>
              </td>
              <td>{t.data}</td>
              <td className="actions">
                {onEdit && <button className="btn-icon" onClick={() => onEdit(t)} title="Editar">✏️</button>}
                {onDelete && (
                  <button
                    className="btn-icon danger"
                    onClick={() => {
                      const ok = window.confirm('Confirma excluir este teste? A exclusão será aplicada quando você clicar em Salvar.')
                      if (ok) onDelete(t.id)
                    }}
                    title="Excluir"
                  >
                    🗑️
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TestesTable