import { useEffect, useState } from 'react'
import type { Aeronave } from './AeronavesTable'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (a: Aeronave) => void
  initial?: Aeronave | null
}

export default function ModalAeronave({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState<Aeronave | null>(null)

  useEffect(() => {
    if (open) setForm(initial ?? { id: Date.now().toString(), codigo: '', modelo: '', tipo: 'Comercial', capacidade: 0, alcance: '' })
  }, [open, initial])

  if (!open || !form) return null

  function change<K extends keyof Aeronave>(k: K, v: Aeronave[K]) {
    setForm(prev => ({ ...(prev as Aeronave), [k]: v } as Aeronave))
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Editar Aeronave</h3>
          <button className="close" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <label> Código
            <input value={form.codigo} onChange={(e) => change('codigo', e.target.value)} />
          </label>

          <label> Modelo
            <input value={form.modelo} onChange={(e) => change('modelo', e.target.value)} />
          </label>

          <label> Tipo
            <select value={form.tipo} onChange={(e) => change('tipo', e.target.value)}>
              <option>Comercial</option>
              <option>Militar</option>
              <option>Carga</option>
            </select>
          </label>

          <label> Capacidade
            <input type="number" value={form.capacidade} onChange={(e) => change('capacidade', Number(e.target.value))} />
          </label>

          <label> Alcance
            <input value={form.alcance} onChange={(e) => change('alcance', e.target.value)} />
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
