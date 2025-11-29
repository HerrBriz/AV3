// server.js (ESM)
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

function handleError(res, err) {
  console.error(err)
  return res.status(500).json({ error: 'Internal server error' })
}

// --- Aeronaves ---
app.get('/api/aeronaves', async (req, res) => {
  try {
    const list = await prisma.aeronave.findMany()
    res.json(list)
  } catch (err) { handleError(res, err) }
})
app.get('/api/aeronaves/:id', async (req, res) => {
  try {
    const a = await prisma.aeronave.findUnique({ where: { id: req.params.id }})
    res.json(a)
  } catch (err) { handleError(res, err) }
})
app.post('/api/aeronaves', async (req, res) => {
  try {
    const created = await prisma.aeronave.create({ data: req.body })
    res.status(201).json(created)
  } catch (err) { handleError(res, err) }
})
app.put('/api/aeronaves/:id', async (req, res) => {
  try {
    const updated = await prisma.aeronave.update({ where: { id: req.params.id }, data: req.body })
    res.json(updated)
  } catch (err) { handleError(res, err) }
})
app.delete('/api/aeronaves/:id', async (req, res) => {
  try {
    await prisma.aeronave.delete({ where: { id: req.params.id }})
    res.status(204).end()
  } catch (err) { handleError(res, err) }
})

// --- Funcionarios ---
app.get('/api/funcionarios', async (req, res) => {
  try {
    const list = await prisma.funcionario.findMany({ include: { etapas: true }})
    res.json(list)
  } catch (err) { handleError(res, err) }
})
app.get('/api/funcionarios/:id', async (req, res) => {
  try {
    const f = await prisma.funcionario.findUnique({ where: { id: req.params.id }, include: { etapas: true }})
    res.json(f)
  } catch (err) { handleError(res, err) }
})
app.post('/api/funcionarios', async (req, res) => {
  try {
    const { etapasIds, ...rest } = req.body
    const data = { ...rest }
    if (etapasIds && Array.isArray(etapasIds)) data.etapas = { connect: etapasIds.map(id => ({ id })) }
    const created = await prisma.funcionario.create({ data })
    res.status(201).json(created)
  } catch (err) { handleError(res, err) }
})
app.put('/api/funcionarios/:id', async (req, res) => {
  try {
    const { etapasIds, ...rest } = req.body
    const data = { ...rest }
    if (etapasIds && Array.isArray(etapasIds)) {
      // replace relation: disconnect all then connect provided
      data.etapas = { set: etapasIds.map(id => ({ id })) }
    }
    const updated = await prisma.funcionario.update({ where: { id: req.params.id }, data })
    res.json(updated)
  } catch (err) { handleError(res, err) }
})
app.delete('/api/funcionarios/:id', async (req, res) => {
  try {
    await prisma.funcionario.delete({ where: { id: req.params.id }})
    res.status(204).end()
  } catch (err) { handleError(res, err) }
})

// --- Etapas ---
app.get('/api/etapas', async (req, res) => {
  try {
    const list = await prisma.etapa.findMany({ include: { funcionarios: true }})
    res.json(list)
  } catch (err) { handleError(res, err) }
})
app.get('/api/etapas/:id', async (req, res) => {
  try {
    const e = await prisma.etapa.findUnique({ where: { id: req.params.id }, include: { funcionarios: true }})
    res.json(e)
  } catch (err) { handleError(res, err) }
})
app.post('/api/etapas', async (req, res) => {
  try {
    const { funcionariosIds, ...rest } = req.body
    const data = { ...rest }
    if (funcionariosIds && Array.isArray(funcionariosIds)) data.funcionarios = { connect: funcionariosIds.map(id => ({ id })) }
    const created = await prisma.etapa.create({ data })
    res.status(201).json(created)
  } catch (err) { handleError(res, err) }
})
app.put('/api/etapas/:id', async (req, res) => {
  try {
    const { funcionariosIds, ...rest } = req.body
    const data = { ...rest }
    if (funcionariosIds && Array.isArray(funcionariosIds)) data.funcionarios = { set: funcionariosIds.map(id => ({ id })) }
    const updated = await prisma.etapa.update({ where: { id: req.params.id }, data })
    res.json(updated)
  } catch (err) { handleError(res, err) }
})
app.delete('/api/etapas/:id', async (req, res) => {
  try {
    await prisma.etapa.delete({ where: { id: req.params.id }})
    res.status(204).end()
  } catch (err) { handleError(res, err) }
})

// endpoints to attach/detach funcionarios to an etapa
app.post('/api/etapas/:id/funcionarios', async (req, res) => {
  try {
    const { funcionariosIds } = req.body
    if (!Array.isArray(funcionariosIds)) return res.status(400).json({ error: 'funcionariosIds array required' })
    const updated = await prisma.etapa.update({ where: { id: req.params.id }, data: { funcionarios: { connect: funcionariosIds.map(id => ({ id })) } }, include: { funcionarios: true } })
    res.json(updated)
  } catch (err) { handleError(res, err) }
})
app.delete('/api/etapas/:id/funcionarios/:fid', async (req, res) => {
  try {
    const updated = await prisma.etapa.update({ where: { id: req.params.id }, data: { funcionarios: { disconnect: [{ id: req.params.fid }] } }, include: { funcionarios: true } })
    res.json(updated)
  } catch (err) { handleError(res, err) }
})

// --- Pecas ---
app.get('/api/pecas', async (req, res) => {
  try {
    const list = await prisma.peca.findMany()
    res.json(list)
  } catch (err) { handleError(res, err) }
})
app.post('/api/pecas', async (req, res) => {
  try {
    const created = await prisma.peca.create({ data: req.body })
    res.status(201).json(created)
  } catch (err) { handleError(res, err) }
})
app.put('/api/pecas/:id', async (req, res) => {
  try {
    const updated = await prisma.peca.update({ where: { id: req.params.id }, data: req.body })
    res.json(updated)
  } catch (err) { handleError(res, err) }
})
app.delete('/api/pecas/:id', async (req, res) => {
  try {
    await prisma.peca.delete({ where: { id: req.params.id }})
    res.status(204).end()
  } catch (err) { handleError(res, err) }
})

// --- Testes ---
app.get('/api/testes', async (req, res) => {
  try {
    const list = await prisma.teste.findMany()
    res.json(list)
  } catch (err) { handleError(res, err) }
})
app.post('/api/testes', async (req, res) => {
  try {
    const created = await prisma.teste.create({ data: req.body })
    res.status(201).json(created)
  } catch (err) { handleError(res, err) }
})
app.put('/api/testes/:id', async (req, res) => {
  try {
    const updated = await prisma.teste.update({ where: { id: req.params.id }, data: req.body })
    res.json(updated)
  } catch (err) { handleError(res, err) }
})
app.delete('/api/testes/:id', async (req, res) => {
  try {
    await prisma.teste.delete({ where: { id: req.params.id }})
    res.status(204).end()
  } catch (err) { handleError(res, err) }
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))