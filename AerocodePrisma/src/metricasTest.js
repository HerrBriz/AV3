import { performance } from 'perf_hooks'

const BASE = 'http://localhost:4000'
const ENDPOINT = `${BASE}/metricas`

async function medirMetricas() {
  const inicio = performance.now()
  const resposta = await fetch(ENDPOINT)
  const dados = await resposta.json()
  const fim = performance.now()

  const tempoResposta = fim - inicio
  const tempoProcessamento = typeof dados.tempoProcessamento === 'number' ? dados.tempoProcessamento : 0
  const latencia = tempoResposta - tempoProcessamento

  return { latencia, tempoProcessamento, tempoResposta }
}

async function testar(concorrentes) {
  console.log(`\nTestando ${concorrentes} usuário(s) simultâneos...`)
  const promises = []
  for (let i = 0; i < concorrentes; i++) promises.push(medirMetricas())
  const resultados = await Promise.all(promises)

  // calcular médias
  const soma = resultados.reduce((acc, r) => {
    acc.latencia += r.latencia
    acc.tempoProcessamento += r.tempoProcessamento
    acc.tempoResposta += r.tempoResposta
    return acc
  }, { latencia: 0, tempoProcessamento: 0, tempoResposta: 0 })

  const n = resultados.length || 1
  const media = {
    latencia: soma.latencia / n,
    tempoProcessamento: soma.tempoProcessamento / n,
    tempoResposta: soma.tempoResposta / n
  }

  console.table({ media })
  console.table(resultados)
}

;(async () => {
  // recomendo ter a API rodando: `npm run start:api`
  await testar(1)
  await testar(5)
  await testar(10)
})()
