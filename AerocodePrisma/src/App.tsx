import './App.css'
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import AeronavesTable, { type Aeronave } from './components/AeronavesTable'
import ModalAeronave from './components/ModalAeronave'
import PecasTable, { type Peca } from './components/PecasTable'
import ModalPeca from './components/ModalPeca'
import EtapasTable, { type Etapa } from './components/EtapasTable'
import ModalEtapa from './components/ModalEtapa'
import FuncionariosTable, { type Funcionario } from './components/FuncionariosTable'
import ModalFuncionario from './components/ModalFuncionario'
import TestesTable, { type Teste } from './components/TestesTable'
import ModalTeste from './components/ModalTeste'
import Relatorios from './components/Relatorios'
import Login from './components/Login'
import Register from './components/Register'
import ErrorBoundary from './components/ErrorBoundary'
import type { User, AuthState, LoginCredentials } from './types/auth'
 
 function App() {
  // Estado de autenticação
	const [authState, setAuthState] = useState<AuthState>(() => {
		try {
			const savedAuth = localStorage.getItem('auth')
			if (!savedAuth) return { user: null, isAuthenticated: false }
			const parsed = JSON.parse(savedAuth)
			// basic validation
			if (typeof parsed.isAuthenticated === 'boolean' && (parsed.user === null || parsed.user.username)) {
				return parsed as AuthState
			}
			return { user: null, isAuthenticated: false }
		} catch (e) {
			console.warn('Falha ao ler auth do localStorage, resetando', e)
			return { user: null, isAuthenticated: false }
		}
	})
  const [showRegister, setShowRegister] = useState(false)

  // Salvando estado de autenticação
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(authState))
  }, [authState])

  // Usuários registrados (em memória)
	const [users, setUsers] = useState<User[]>(() => {
		try {
			const saved = localStorage.getItem('users')
			if (!saved) return []
			const parsed = JSON.parse(saved)
			if (Array.isArray(parsed)) {
				// filter to objects that look like users
				return parsed.filter((u: any) => u && typeof u.username === 'string' && typeof u.password === 'string')
			}
			return []
		} catch (e) {
			console.warn('Falha ao ler users do localStorage, resetando', e)
			return []
		}
	})

  // Salvando usuários
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

	// --- ESTADOS GLOBAIS DA APLICAÇÃO (declarados sempre, independentemente da autenticação)
	const [data, setData] = useState<Aeronave[]>(() => [
		{ id: '1', codigo: 'AC-001', modelo: 'Boeing 737', tipo: 'Comercial', capacidade: 180, alcance: '6,570 km' },
		{ id: '2', codigo: 'AC-002', modelo: 'Airbus A320', tipo: 'Comercial', capacidade: 150, alcance: '6,100 km' },
		{ id: '3', codigo: 'AC-003', modelo: 'F-16 Fighting Falcon', tipo: 'Militar', capacidade: 1, alcance: '4,220 km' },
		{ id: '4', codigo: 'AC-004', modelo: 'Embraer E195', tipo: 'Comercial', capacidade: 132, alcance: '3,428 km' }
	])

	const [modalOpen, setModalOpen] = useState(false)
	const [editing, setEditing] = useState<Aeronave | null>(null)
	const [page, setPage] = useState<'aeronaves' | 'pecas' | string>('aeronaves')

	const [pecas, setPecas] = useState<Peca[]>(() => [
		{ id: 'p1', nome: 'Turbina JT8D', tipo: 'Importada', fornecedor: 'Pratt & Whitney', status: 'Pronta' },
		{ id: 'p2', nome: 'Asa Principal', tipo: 'Nacional', fornecedor: 'Embraer', status: 'Em Produção' },
		{ id: 'p3', nome: 'Sistema Hidráulico', tipo: 'Importada', fornecedor: 'Parker Aerospace', status: 'Em Transporte' },
		{ id: 'p4', nome: 'Cockpit Display', tipo: 'Importada', fornecedor: 'Honeywell', status: 'Pronta' }
	])

	const [modalPecaOpen, setModalPecaOpen] = useState(false)
	const [editingPeca, setEditingPeca] = useState<Peca | null>(null)

	const [etapas, setEtapas] = useState<Etapa[]>(() => [
		{ id: 'e1', nome: 'Montagem da Fuselagem', prazo: '2025-11-14', status: 'Em Andamento', funcionarios: 'João Silva, Maria Santos' },
		{ id: 'e2', nome: 'Instalação de Sistemas Elétricos', prazo: '2025-11-19', status: 'Pendente', funcionarios: 'Pedro Oliveira' },
		{ id: 'e3', nome: 'Montagem das Asas', prazo: '2025-11-09', status: 'Concluida', funcionarios: 'Ana Costa, Carlos Ferreira' },
		{ id: 'e4', nome: 'Instalação de Motores', prazo: '2025-11-24', status: 'Pendente', funcionarios: '' }
	])

	const [modalEtapaOpen, setModalEtapaOpen] = useState(false)
	const [editingEtapa, setEditingEtapa] = useState<Etapa | null>(null)

	const [funcionarios, setFuncionarios] = useState<Funcionario[]>(() => [
		{ id: 'f1', nome: 'João Silva', telefone: '(11) 98765-4321', endereco: 'Rua A, 123', usuario: 'joao.silva', funcao: 'Engenheiro' },
		{ id: 'f2', nome: 'Maria Santos', telefone: '(11) 98765-4322', endereco: 'Rua B, 456', usuario: 'maria.santos', funcao: 'Operador' },
		{ id: 'f3', nome: 'Pedro Oliveira', telefone: '(11) 98765-4323', endereco: 'Rua C, 789', usuario: 'pedro.oliveira', funcao: 'Administrador' },
		{ id: 'f4', nome: 'Ana Costa', telefone: '(11) 98765-4324', endereco: 'Rua D, 101', usuario: 'ana.costa', funcao: 'Engenheiro' }
	])

	const [modalFuncionarioOpen, setModalFuncionarioOpen] = useState(false)
	const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null)

	const [testes, setTestes] = useState<Teste[]>(() => [
		{ id: 't1', tipo: 'Elétrico', resultado: 'Aprovado', data: '2025-10-24' },
		{ id: 't2', tipo: 'Hidráulico', resultado: 'Aprovado', data: '2025-10-25' },
		{ id: 't3', tipo: 'Aerodinâmico', resultado: 'Reprovado', data: '2025-10-26' },
		{ id: 't4', tipo: 'Elétrico', resultado: 'Aprovado', data: '2025-10-27' }
	])

	const [modalTesteOpen, setModalTesteOpen] = useState(false)
	const [editingTeste, setEditingTeste] = useState<Teste | null>(null)

  // Manipuladores de autenticação
  function handleLogin(credentials: LoginCredentials) {
		console.log('Tentativa de login', credentials)
		const user = users.find(u => u.username === credentials.username && u.password === credentials.password)
		console.log('Usuário encontrado', user)

		if (user) {
			setAuthState({ user, isAuthenticated: true })
		} else {
			alert('Usuário ou senha inválidos')
		}
  }

  function handleRegister(data: Omit<User, 'id'>) {
    const userExists = users.some(u => u.username === data.username)
    if (userExists) {
      alert('Nome de usuário já existe')
      return
    }

    const newUser = { ...data, id: Date.now().toString() }
    setUsers([...users, newUser])
    alert('Cadastro realizado com sucesso! Faça login para continuar.')
    setShowRegister(false)
  }

  function handleLogout() {
    setAuthState({ user: null, isAuthenticated: false })
  }

  // Se não estiver autenticado, mostra tela de login/registro
  if (!authState.isAuthenticated) {
		if (showRegister) {
			return (
				<ErrorBoundary>
					<Register 
						onRegister={handleRegister} 
						onBackToLogin={() => setShowRegister(false)} 
					/>
				</ErrorBoundary>
			)
		}
		return (
			<ErrorBoundary>
				<Login 
					onLogin={handleLogin}
					onRegisterClick={() => setShowRegister(true)}
				/>
			</ErrorBoundary>
		)
  }

  // Verificações de permissão
  function hasPermission(requiredRole: 'admin' | 'engenheiro') {
    if (!authState.user) return false
    if (authState.user.role === 'admin') return true
    return authState.user.role === requiredRole
  }


  function handleAdd() {
    if (page === 'pecas') {
      setEditingPeca(null)
      setModalPecaOpen(true)
      return
    }
    if (page === 'etapas') {
      setEditingEtapa(null)
      setModalEtapaOpen(true)
      return
    }
    if (page === 'funcionarios') {
      setEditingFuncionario(null)
      setModalFuncionarioOpen(true)
      return
    }
    if (page === 'testes') {
      setEditingTeste(null)
      setModalTesteOpen(true)
      return
    }
    setEditing(null)
    setModalOpen(true)
  }

  function handleEditTeste(t: Teste) {
    setEditingTeste(t)
    setModalTesteOpen(true)
  }

  function handleDeleteTeste(id: string) {
    setTestes(d => d.filter(x => x.id !== id))
  }

  function handleSaveTeste(t: Teste) {
    setTestes(d => {
      const exists = d.find(x => x.id === t.id)
      if (exists) return d.map(x => x.id === t.id ? t : x)
      return [...d, t]
    })
  }	function handleEdit(a: Aeronave) {
		setEditing(a)
		setModalOpen(true)
	}

		function handleEditPeca(p: Peca) {
			setEditingPeca(p)
			setModalPecaOpen(true)
		}

			function handleEditEtapa(e: Etapa) {
				setEditingEtapa(e)
				setModalEtapaOpen(true)
			}

				function handleEditFuncionario(f: Funcionario) {
					setEditingFuncionario(f)
					setModalFuncionarioOpen(true)
				}

	function handleDelete(id: string) {
		setData(d => d.filter(x => x.id !== id))
	}

		function handleDeletePeca(id: string) {
			setPecas(d => d.filter(x => x.id !== id))
		}

			function handleDeleteEtapa(id: string) {
				setEtapas(d => d.filter(x => x.id !== id))
			}

				function handleDeleteFuncionario(id: string) {
					setFuncionarios(d => d.filter(x => x.id !== id))
				}

	function handleSave(a: Aeronave) {
		setData((d) => {
			const exists = d.find(x => x.id === a.id)
			if (exists) {
				return d.map(x => x.id === a.id ? a : x)
			}
			return [...d, a]
		})
	}

		function handleSavePeca(p: Peca) {
			setPecas((d) => {
				const exists = d.find(x => x.id === p.id)
				if (exists) return d.map(x => x.id === p.id ? p : x)
				return [...d, p]
			})
		}

			function handleSaveEtapa(e: Etapa) {
				setEtapas(d => {
					const exists = d.find(x => x.id === e.id)
					if (exists) return d.map(x => x.id === e.id ? e : x)
					return [...d, e]
				})
			}

				function handleSaveFuncionario(f: Funcionario) {
					setFuncionarios(d => {
						const exists = d.find(x => x.id === f.id)
						if (exists) return d.map(x => x.id === f.id ? f : x)
						return [...d, f]
					})
				}

				// Persist all local changes to the backend DB
				async function handleSaveAll() {
					const base = 'http://localhost:4000/api'
					try {
						// --- Aeronaves ---
						const resA = await fetch(`${base}/aeronaves`)
						const dbAero = await resA.json()
						const mapA = new Map(dbAero.map((x: any) => [x.codigo, x]))
						for (const a of data) {
							const match = mapA.get(a.codigo)
							const payload = { codigo: a.codigo, modelo: a.modelo, tipo: a.tipo, capacidade: Number(a.capacidade), alcance: a.alcance }
							if (match) {
								await fetch(`${base}/aeronaves/${match.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							} else {
								await fetch(`${base}/aeronaves`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							}
						}

						// --- Pecas --- (match by nome)
						const resP = await fetch(`${base}/pecas`)
						const dbP = await resP.json()
						const mapP = new Map(dbP.map((x: any) => [x.nome, x]))
						for (const p of pecas) {
							const match = mapP.get(p.nome)
							const payload = { nome: p.nome, tipo: p.tipo, fornecedor: p.fornecedor, status: p.status }
							if (match) {
								await fetch(`${base}/pecas/${match.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							} else {
								await fetch(`${base}/pecas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							}
						}

						// --- Funcionarios --- (match by usuario)
						const resF = await fetch(`${base}/funcionarios`)
						const dbF = await resF.json()
						const mapF = new Map(dbF.map((x: any) => [x.usuario, x]))
						for (const f of funcionarios) {
							const match = mapF.get(f.usuario)
							const payload = { nome: f.nome, telefone: f.telefone, endereco: f.endereco, usuario: f.usuario, funcao: f.funcao }
							if (match) {
								await fetch(`${base}/funcionarios/${match.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							} else {
								await fetch(`${base}/funcionarios`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							}
						}

						// --- Etapas --- (match by nome)
						const resE = await fetch(`${base}/etapas`)
						const dbE = await resE.json()
						const mapE = new Map(dbE.map((x: any) => [x.nome, x]))
						for (const e of etapas) {
							const match = mapE.get(e.nome)
							const payload = { nome: e.nome, prazo: e.prazo, status: e.status }
							if (match) {
								await fetch(`${base}/etapas/${match.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							} else {
								await fetch(`${base}/etapas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							}
						}

						// --- Testes --- (match by tipo+data)
						const resT = await fetch(`${base}/testes`)
						const dbT = await resT.json()
						for (const t of testes) {
							const match = dbT.find((x: any) => x.tipo === t.tipo && x.data === t.data)
							const payload = { tipo: t.tipo, resultado: t.resultado, data: t.data }
							if (match) {
								await fetch(`${base}/testes/${match.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							} else {
								await fetch(`${base}/testes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
							}
						}

						// --- Deletions: remove DB records that are no longer present locally ---
						// Aeronaves (match by codigo)
						const localCodigos = new Set(data.map(a => a.codigo))
						for (const dbItem of dbAero) {
							if (!localCodigos.has(dbItem.codigo)) {
								await fetch(`${base}/aeronaves/${dbItem.id}`, { method: 'DELETE' })
							}
						}

						// Pecas (match by nome)
						const localPecas = new Set(pecas.map(p => p.nome))
						for (const dbItem of dbP) {
							if (!localPecas.has(dbItem.nome)) {
								await fetch(`${base}/pecas/${dbItem.id}`, { method: 'DELETE' })
							}
						}

						// Funcionarios (match by usuario)
						const localUsuarios = new Set(funcionarios.map(f => f.usuario))
						for (const dbItem of dbF) {
							if (!localUsuarios.has(dbItem.usuario)) {
								await fetch(`${base}/funcionarios/${dbItem.id}`, { method: 'DELETE' })
							}
						}

						// Etapas (match by nome)
						const localEtapas = new Set(etapas.map(e => e.nome))
						for (const dbItem of dbE) {
							if (!localEtapas.has(dbItem.nome)) {
								await fetch(`${base}/etapas/${dbItem.id}`, { method: 'DELETE' })
							}
						}

						// Testes (match by tipo+data)
						const localTestKeys = new Set(testes.map(t => `${t.tipo}|${t.data}`))
						for (const dbItem of dbT) {
							const key = `${dbItem.tipo}|${dbItem.data}`
							if (!localTestKeys.has(key)) {
								await fetch(`${base}/testes/${dbItem.id}`, { method: 'DELETE' })
							}
						}

						// reload from server to sync ids and data
						const [freshA, freshP, freshE, freshF, freshT] = await Promise.all([
							fetch(`${base}/aeronaves`).then(r => r.json()),
							fetch(`${base}/pecas`).then(r => r.json()),
							fetch(`${base}/etapas`).then(r => r.json()),
							fetch(`${base}/funcionarios`).then(r => r.json()),
							fetch(`${base}/testes`).then(r => r.json())
						])
						// convert ids to string for app state compatibility
						setData(freshA.map((x: any) => ({ ...x, id: String(x.id) })))
						setPecas(freshP.map((x: any) => ({ ...x, id: String(x.id) })))
						setEtapas(freshE.map((x: any) => ({ ...x, id: String(x.id), funcionarios: (x.funcionarios || []).map((f: any) => f.nome).join(', ') })))
						setFuncionarios(freshF.map((x: any) => ({ ...x, id: String(x.id) })))
						setTestes(freshT.map((x: any) => ({ ...x, id: String(x.id) })))

						alert('Dados salvos no banco com sucesso.')
					} catch (err) {
						console.error(err)
						alert('Falha ao salvar dados. Veja console para detalhes.')
					}
				}

		return (
			<ErrorBoundary>
				<div className="app-root">
				<Sidebar 
          active={page} 
						onNavigate={(p) => setPage(p)} 
						onSaveAll={handleSaveAll}
          userName={authState.user?.nome}
          userRole={authState.user?.role}
          onLogout={handleLogout}
        />

					<main className="content">
						<div className="content-header">
							<div>
								<h1>
									{page === 'pecas'
										? 'Peças'
										: page === 'etapas'
										? 'Etapas'
										: page === 'funcionarios'
										? 'Funcionários'
										: page === 'testes'
										? 'Testes'
										: page === 'relatorios'
										? 'Relatórios'
										: 'Aeronaves'
									}
								</h1>
								<p className="muted">
									{page === 'pecas'
										? 'Gerenciar peças e componentes'
										: page === 'etapas'
										? 'Gerenciar etapas de produção'
										: page === 'funcionarios'
										? 'Gerenciar funcionários'
										: page === 'testes'
										? 'Gerenciar testes e validações'
										: page === 'relatorios'
										? 'Gerar e exportar relatórios de produção'
										: 'Gerenciar aeronaves em produção'
									}
								</p>
							</div>

							<div>
								{page !== 'relatorios' && (
									hasPermission(page === 'funcionarios' ? 'admin' : 'engenheiro') && (
										<button className="btn primary" onClick={handleAdd}>+ {
											page === 'pecas'
												? 'Adicionar Peça'
												: page === 'etapas'
												? 'Adicionar Etapa'
												: page === 'funcionarios'
												? 'Adicionar Funcionário'
												: page === 'testes'
												? 'Adicionar Teste'
												: 'Adicionar Aeronave'
										}</button>
									)
								)}
							</div>
						</div>

										{page === 'pecas' ? (
											<PecasTable 
												data={pecas} 
												onEdit={hasPermission('engenheiro') ? handleEditPeca : undefined} 
												onDelete={hasPermission('engenheiro') ? handleDeletePeca : undefined} 
											/>
										) : page === 'etapas' ? (
											<EtapasTable 
												data={etapas} 
												onEdit={hasPermission('engenheiro') ? handleEditEtapa : undefined} 
												onDelete={hasPermission('engenheiro') ? handleDeleteEtapa : undefined} 
											/>
										) : page === 'funcionarios' ? (
											<FuncionariosTable 
												data={funcionarios} 
												onEdit={hasPermission('admin') ? handleEditFuncionario : undefined} 
												onDelete={hasPermission('admin') ? handleDeleteFuncionario : undefined} 
											/>
										) : page === 'relatorios' ? (
											<Relatorios 
												aeronaves={data} 
												pecas={pecas} 
												etapas={etapas} 
												funcionarios={funcionarios} 
												testes={testes} 
											/>
										) : page === 'testes' ? (
											<TestesTable 
												data={testes} 
												onEdit={hasPermission('engenheiro') ? handleEditTeste : undefined} 
												onDelete={hasPermission('engenheiro') ? handleDeleteTeste : undefined} 
											/>
										) : (
											<AeronavesTable 
												data={data} 
												onEdit={hasPermission('engenheiro') ? handleEdit : undefined} 
												onDelete={hasPermission('engenheiro') ? handleDelete : undefined} 
											/>
										)}
					</main>

						<ModalAeronave open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
						<ModalPeca open={modalPecaOpen} onClose={() => setModalPecaOpen(false)} onSave={handleSavePeca} initial={editingPeca} />
						<ModalEtapa open={modalEtapaOpen} onClose={() => setModalEtapaOpen(false)} onSave={handleSaveEtapa} initial={editingEtapa} />
						<ModalFuncionario open={modalFuncionarioOpen} onClose={() => setModalFuncionarioOpen(false)} onSave={handleSaveFuncionario} initial={editingFuncionario} />
						<ModalTeste open={modalTesteOpen} onClose={() => setModalTesteOpen(false)} onSave={handleSaveTeste} initial={editingTeste} />
					</div>
				</ErrorBoundary>
			)
}

export default App
