import React, { useState } from 'react'
import type { Aeronave } from './AeronavesTable'
import type { Peca } from './PecasTable'
import type { Etapa } from './EtapasTable'
import type { Funcionario } from './FuncionariosTable'
import type { Teste } from './TestesTable'

type Props = {
  aeronaves: Aeronave[]
  pecas: Peca[]
  etapas: Etapa[]
  funcionarios: Funcionario[]
  testes: Teste[]
}

function formatDate(d = new Date()) {
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export default function Relatorios({ aeronaves, pecas, etapas, funcionarios, testes }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(aeronaves[0]?.id ?? null)
  const [lastReport, setLastReport] = useState<string>('')

  function buildReport(aId: string | null) {
    if (!aId) return ''
    const a = aeronaves.find(x => x.id === aId)
    if (!a) return ''

    const relatedPecas = pecas
    const relatedEtapas = etapas
    const relatedTestes = testes

    const lines: string[] = []
    lines.push('RELATÓRIO DE PRODUÇÃO AEROCODE')
    lines.push(`Data: ${formatDate()}`)
    lines.push('')
    lines.push('=======================================')
    lines.push('AERONAVE SELECIONADA')
    lines.push('=======================================')
    lines.push('')
    lines.push(`Código: ${a.codigo}`)
    lines.push(`Modelo: ${a.modelo}`)
    lines.push(`Tipo: ${a.tipo}`)
    lines.push(`Capacidade: ${a.capacidade} passageiros`)
    lines.push(`Alcance: ${a.alcance}`)
    lines.push('')
    lines.push('PEÇAS ASSOCIADAS:')
    relatedPecas.forEach(p => {
      lines.push(`- ${p.nome} (${p.tipo}) - ${p.status}`)
    })

    lines.push('')
    lines.push('ETAPAS DE PRODUÇÃO:')
    relatedEtapas.forEach((et, idx) => {
      lines.push(`${idx + 1}. ${et.nome} - ${et.status} (Prazo: ${et.prazo})`)
      if (et.funcionarios) lines.push(`   Funcionários: ${et.funcionarios}`)
      lines.push('')
    })

    lines.push('TESTES REALIZADOS:')
    relatedTestes.forEach(t => {
      lines.push(`- Teste ${t.tipo}: ${t.resultado} (${t.data})`)
    })

    return lines.join('\n')
  }

  function handleGenerate() {
    const txt = buildReport(selectedId)
    setLastReport(txt)
  }

  function handleExport() {
    const txt = lastReport || buildReport(selectedId)
    if (!txt) return
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio_${selectedId ?? 'aeronave'}.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const selected = aeronaves.find(x => x.id === selectedId) ?? null

  return (
    <div className="relatorios-root">
      <div className="card">
        <h3 style={{color:'black'}}>Selecionar Aeronave</h3>
        <div style={{ marginTop: 8 }}>
          <select value={selectedId ?? ''} onChange={e => setSelectedId(e.target.value)} className="select">
            <option value="">Escolha uma aeronave</option>
            {aeronaves.map(a => (
              <option key={a.id} value={a.id}>{`${a.codigo} - ${a.modelo}`}</option>
            ))}
          </select>
        </div>

        {selected && (
          <div className="aeronave-card" style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="icon">✈️</div>
              <div>
                <strong>{selected.modelo}</strong>
                <div style={{ fontSize: 13, color: '#666' }}>{`Código: ${selected.codigo}`}</div>
                <div style={{ fontSize: 13, color: '#666' }}>{`Tipo: ${selected.tipo}`}</div>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{color:'black'}}>Ações</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn primary" onClick={handleGenerate}>Gerar Relatório de Aeronave</button>
          <button className="btn" onClick={handleExport}>Exportar como Arquivo de Texto</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{color:'black'}}>Último Relatório Gerado</h3>
        <div style={{ background: '#f7f9fb', padding: 12, borderRadius: 8, color: '#111' }}>
          <pre style={{ background:  '#ebf0f5ff', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 13 ,color: '#111'}}>{lastReport || 'Nenhum relatório gerado ainda.'}</pre>
        </div>
      </div>
    </div>
  )
}
