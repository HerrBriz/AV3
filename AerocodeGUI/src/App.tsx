import './App.css'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import AeronavesTable, { type Aeronave } from './components/AeronavesTable'
import ModalAeronave from './components/ModalAeronave'

function App() {
	const [data, setData] = useState<Aeronave[]>(() => [
		{ id: '1', codigo: 'AC-001', modelo: 'Boeing 737', tipo: 'Comercial', capacidade: 180, alcance: '6,570 km' },
		{ id: '2', codigo: 'AC-002', modelo: 'Airbus A320', tipo: 'Comercial', capacidade: 150, alcance: '6,100 km' },
		{ id: '3', codigo: 'AC-003', modelo: 'F-16 Fighting Falcon', tipo: 'Militar', capacidade: 1, alcance: '4,220 km' },
		{ id: '4', codigo: 'AC-004', modelo: 'Embraer E195', tipo: 'Comercial', capacidade: 132, alcance: '3,428 km' }
	])

	const [modalOpen, setModalOpen] = useState(false)
	const [editing, setEditing] = useState<Aeronave | null>(null)

	function handleAdd() {
		setEditing(null)
		setModalOpen(true)
	}

	function handleEdit(a: Aeronave) {
		setEditing(a)
		setModalOpen(true)
	}

	function handleDelete(id: string) {
		setData(d => d.filter(x => x.id !== id))
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

	return (
		<div className="app-root">
			<Sidebar />

			<main className="content">
				<div className="content-header">
					<div>
						<h1>Aeronaves</h1>
						<p className="muted">Gerenciar aeronaves em produção</p>
					</div>

					<div>
						<button className="btn primary" onClick={handleAdd}>+ Adicionar Aeronave</button>
					</div>
				</div>

				<AeronavesTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
			</main>

			<ModalAeronave open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
		</div>
	)
}

export default App
