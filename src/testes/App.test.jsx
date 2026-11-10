
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import App from '../App'

describe('Testes do TaskFlow', () => {

  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
  })

  it('deve exibir o título do sistema', () => {
    render(<App />)

    expect(
      screen.getByText('TaskFlow')
    ).toBeInTheDocument()
  })

  it('deve exibir a seção Minhas tarefas', () => {
    render(<App />)

    expect(
      screen.getByText('Minhas tarefas')
    ).toBeInTheDocument()
  })

  it('deve salvar uma nova tarefa no localStorage', () => {
    render(<App />)

    const campo = screen.getByPlaceholderText(
      'Digite uma nova tarefa...'
    )

    fireEvent.change(campo, {
      target: { value: 'Estudar para a prova' }
    })

    fireEvent.click(screen.getByText('Adicionar'))

    const tarefasSalvas = JSON.parse(
      localStorage.getItem('taskflow-tarefas')
    )

    expect(tarefasSalvas).toContainEqual(
      expect.objectContaining({
        nome: 'Estudar para a prova',
        concluida: false
      })
    )
  })

  it('deve recuperar as tarefas salvas no localStorage', () => {
    localStorage.setItem(
      'taskflow-tarefas',
      JSON.stringify([
        {
          id: 10,
          nome: 'Tarefa salva anteriormente',
          concluida: false
        }
      ])
    )

    render(<App />)

    expect(
      screen.getByText(/Tarefa salva anteriormente/)
    ).toBeInTheDocument()
  })

  it('deve atualizar o armazenamento ao concluir uma tarefa', () => {
    render(<App />)

    fireEvent.click(screen.getByText(/Estudar React/))

    const tarefasSalvas = JSON.parse(
      localStorage.getItem('taskflow-tarefas')
    )

    expect(
      tarefasSalvas.find(tarefa => tarefa.nome === 'Estudar React').concluida
    ).toBe(true)
  })

  it('deve remover uma tarefa do armazenamento ao excluí-la', () => {
    render(<App />)

    const botoesExcluir = screen.getAllByText('Excluir')

    fireEvent.click(botoesExcluir[0])

    const tarefasSalvas = JSON.parse(
      localStorage.getItem('taskflow-tarefas')
    )

    expect(
      tarefasSalvas.some(tarefa => tarefa.nome === 'Estudar React')
    ).toBe(false)
  })
})
