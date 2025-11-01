import { useEffect, useState } from 'react'
import type { Funcionario } from './FuncionariosTable'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (f: Funcionario) => void
  initial?: Funcionario | null
}

export default function ModalFuncionario({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState<Funcionario | null>(null)

  useEffect(() => {
    if (open) setForm(initial ?? { id: Date.now().toString(), nome: '', telefone: '', endereco: '', usuario: '', funcao: 'Engenheiro' })
  }, [open, initial])

  if (!open || !form) return null

  function change<K extends keyof Funcionario>(k: K, v: Funcionario[K]) {
    setForm(prev => ({ ...(prev as Funcionario), [k]: v } as Funcionario))
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Editar Funcionário</h3>
          <button className="close" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <label> Nome
            <input value={form.nome} onChange={(e) => change('nome', e.target.value)} />
          </label>

          <label> Telefone
            <input value={form.telefone} onChange={(e) => change('telefone', e.target.value)} />
          </label>

          <label> Endereço
            <input value={form.endereco} onChange={(e) => change('endereco', e.target.value)} />
          </label>

          <label> Usuário
            <input value={form.usuario} onChange={(e) => change('usuario', e.target.value)} />
          </label>

          <label> Função
            <select value={form.funcao} onChange={(e) => change('funcao', e.target.value as Funcionario['funcao'])}>
              <option>Engenheiro</option>
              <option>Operador</option>
              <option>Administrador</option>
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
