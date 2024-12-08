import { Component, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  fallback: ReactNode
  children: any
}
class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: { error: Error | undefined } = {
    error: undefined,
  };

  componentDidCatch(error: any) {
    this.setState({ error });
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return this.props.fallback;
  }
}

export default ErrorBoundary;
