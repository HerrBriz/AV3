import React from 'react'

type Props = { children: React.ReactNode }

type State = { hasError: boolean; error?: Error | null }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: any) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Ocorreu um erro na aplicação</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#fff', color: '#111', padding: 12, borderRadius: 8 }}>{String(this.state.error)}</pre>
          <p>Por favor, verifique o console do navegador para detalhes.</p>
        </div>
      )
    }
    return this.props.children
  }
}
