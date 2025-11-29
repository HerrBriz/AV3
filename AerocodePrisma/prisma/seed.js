import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Aeronaves
  await prisma.aeronave.createMany({
    data: [
      { codigo: 'AC-001', modelo: 'Boeing 737', tipo: 'Comercial', capacidade: 180, alcance: '6,570 km' },
      { codigo: 'AC-002', modelo: 'Airbus A320', tipo: 'Comercial', capacidade: 150, alcance: '6,100 km' },
      { codigo: 'AC-003', modelo: 'F-16 Fighting Falcon', tipo: 'Militar', capacidade: 1, alcance: '4,220 km' },
      { codigo: 'AC-004', modelo: 'Embraer E195', tipo: 'Comercial', capacidade: 132, alcance: '3,428 km' }
    ],
    skipDuplicates: true
  })

  // Pecas
  await prisma.peca.createMany({
    data: [
      { nome: 'Motor X', tipo: 'Motor', fornecedor: 'MotorCorp', status: 'Pronta' },
      { nome: 'Painel A', tipo: 'Aviônico', fornecedor: 'AvioTech', status: 'Em Produção' }
    ],
    skipDuplicates: true
  })

  // Funcionarios
  const f1 = await prisma.funcionario.create({ data: { nome: 'João Silva', telefone: '+55 11 99999-0001', endereco: 'Rua A, 123', usuario: 'joao', funcao: 'Engenheiro' } })
  const f2 = await prisma.funcionario.create({ data: { nome: 'Maria Souza', telefone: '+55 11 99999-0002', endereco: 'Rua B, 456', usuario: 'maria', funcao: 'Operador' } })
  const f3 = await prisma.funcionario.create({ data: { nome: 'Carlos Lima', telefone: '+55 11 99999-0003', endereco: 'Rua C, 789', usuario: 'carlos', funcao: 'Administrador' } })

  // Etapas
  const e1 = await prisma.etapa.create({ data: { nome: 'Montagem', prazo: '2025-12-10', status: 'Pendente' } })
  const e2 = await prisma.etapa.create({ data: { nome: 'Teste', prazo: '2025-12-20', status: 'Pendente' } })

  // Associate funcionarios with etapas (many-to-many)
  await prisma.etapa.update({ where: { id: e1.id }, data: { funcionarios: { connect: [{ id: f1.id }, { id: f2.id }] } } })
  await prisma.etapa.update({ where: { id: e2.id }, data: { funcionarios: { connect: [{ id: f2.id }, { id: f3.id }] } } })

  // Testes
  await prisma.teste.createMany({
    data: [
      { tipo: 'Elétrico', resultado: 'Aprovado', data: '2025-11-01' },
      { tipo: 'Hidráulico', resultado: 'Aprovado', data: '2025-11-02' }
    ],
    skipDuplicates: true
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
