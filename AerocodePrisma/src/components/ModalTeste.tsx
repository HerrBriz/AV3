import { useEffect, useState } from 'react'
import type { Teste } from './TestesTable'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (t: Teste) => void
  initial?: Teste | null
}

export default function ModalTeste({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState<Teste | null>(null)

  useEffect(() => {
    if (open) {
      const hoje = new Date().toISOString().split('T')[0]
      setForm(initial ?? { id: Date.now().toString(), tipo: 'Elétrico', resultado: 'Aprovado', data: hoje })
    }
  }, [open, initial])

  if (!open || !form) return null

  function change<K extends keyof Teste>(k: K, v: Teste[K]) {
    setForm(prev => ({ ...(prev as Teste), [k]: v } as Teste))
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Adicionar Teste</h3>
          <button className="close" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <label> Tipo
            <select value={form.tipo} onChange={(e) => change('tipo', e.target.value)}>
              <option>Elétrico</option>
              <option>Hidráulico</option>
              <option>Aerodinâmico</option>
              <option>Estrutural</option>
              <option>Aviônico</option>
            </select>
          </label>

          <label> Resultado
            <select value={form.resultado} onChange={(e) => change('resultado', e.target.value as Teste['resultado'])}>
              <option>Aprovado</option>
              <option>Reprovado</option>
            </select>
          </label>

          <label> Data
            <input type="date" value={form.data} onChange={(e) => change('data', e.target.value)} />
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