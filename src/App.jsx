
import { useState } from 'react'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, nome: 'Estudar React', concluida: false },
    { id: 2, nome: 'Organizar o projeto TaskFlow', concluida: true },
    { id: 3, nome: 'Aprender GitHub Actions', concluida: false }
  ])

  const [novaTarefa, setNovaTarefa] = useState('')

  function adicionarTarefa(e) {
    e.preventDefault()

    if (!novaTarefa.trim()) return

    setTarefas([
      ...tarefas,
      {
        id: Date.now(),
        nome: novaTarefa,
        concluida: false
      }
    ])

    setNovaTarefa('')
  }

  function concluirTarefa(id) {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id
        ? { ...tarefa, concluida: !tarefa.concluida }
        : tarefa
    ))
  }

  function excluirTarefa(id) {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
  }

  const concluidas = tarefas.filter(tarefa => tarefa.concluida).length

  return (
    <main className="container">
      <header>
        <h1>TaskFlow</h1>
        <p>Organize suas tarefas e acompanhe seu progresso.</p>
      </header>

      <section className="painel">
        <h2>Minhas tarefas</h2>

        <div className="resumo">
          <span>Total: {tarefas.length}</span>
          <span>Concluídas: {concluidas}</span>
          <span>Pendentes: {tarefas.length - concluidas}</span>
        </div>

        <form onSubmit={adicionarTarefa}>
          <input
            type="text"
            placeholder="Digite uma nova tarefa..."
            value={novaTarefa}
            onChange={e => setNovaTarefa(e.target.value)}
          />
          <button type="submit">Adicionar</button>
        </form>

        <ul>
          {tarefas.map(tarefa => (
            <li key={tarefa.id}>
              <span
                className={tarefa.concluida ? 'concluida' : ''}
                onClick={() => concluirTarefa(tarefa.id)}
              >
                {tarefa.concluida ? '✓' : '○'} {tarefa.nome}
              </span>

              <button
                className="excluir"
                onClick={() => excluirTarefa(tarefa.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App

