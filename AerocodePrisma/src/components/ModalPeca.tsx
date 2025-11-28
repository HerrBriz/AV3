import { useEffect, useState } from 'react'
import type { Peca } from './PecasTable'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (p: Peca) => void
  initial?: Peca | null
}

export default function ModalPeca({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState<Peca | null>(null)

  useEffect(() => {
    if (open) setForm(initial ?? { id: Date.now().toString(), nome: '', tipo: '', fornecedor: '', status: 'Pronta' })
  }, [open, initial])

  if (!open || !form) return null

  function change<K extends keyof Peca>(k: K, v: Peca[K]) {
    setForm(prev => ({ ...(prev as Peca), [k]: v } as Peca))
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Editar Peça</h3>
          <button className="close" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <label> Nome
            <input value={form.nome} onChange={(e) => change('nome', e.target.value)} />
          </label>

          <label> Tipo
            <input value={form.tipo} onChange={(e) => change('tipo', e.target.value)} />
          </label>

          <label> Fornecedor
            <input value={form.fornecedor} onChange={(e) => change('fornecedor', e.target.value)} />
          </label>

          <label> Status
            <select value={form.status} onChange={(e) => change('status', e.target.value as Peca['status'])}>
              <option>Pronta</option>
              <option>Em Produção</option>
              <option>Em Transporte</option>
            </select>
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
