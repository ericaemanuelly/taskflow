import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('Testes do TaskFlow', () => {
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
})