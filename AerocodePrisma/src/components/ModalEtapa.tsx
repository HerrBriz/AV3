import { useEffect, useState } from 'react'
import type { Etapa } from './EtapasTable'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (e: Etapa) => void
  initial?: Etapa | null
}

export default function ModalEtapa({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState<Etapa | null>(null)

  useEffect(() => {
    if (open) setForm(initial ?? { id: Date.now().toString(), nome: '', prazo: '', status: 'Pendente', funcionarios: '' })
  }, [open, initial])

  if (!open || !form) return null

  function change<K extends keyof Etapa>(k: K, v: Etapa[K]) {
    setForm(prev => ({ ...(prev as Etapa), [k]: v } as Etapa))
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Editar Etapa</h3>
          <button className="close" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <label> Nome
            <input value={form.nome} onChange={(e) => change('nome', e.target.value)} />
          </label>

          <label> Prazo
            <input type="date" value={form.prazo} onChange={(e) => change('prazo', e.target.value)} />
          </label>

          <label> Status
            <select value={form.status} onChange={(e) => change('status', e.target.value as Etapa['status'])}>
              <option>Pendente</option>
              <option>Em Andamento</option>
              <option>Concluida</option>
            </select>
          </label>

          <label> Funcionários (separe por vírgula)
            <input value={form.funcionarios} onChange={(e) => change('funcionarios', e.target.value)} />
          </label>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn primary" onClick={() => { onSave(form); onClose() }}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
