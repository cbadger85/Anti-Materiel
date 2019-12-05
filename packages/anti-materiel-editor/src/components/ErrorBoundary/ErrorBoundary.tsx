import React from 'react';
export class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }
  componentDidMount(): void {
    window.onerror = this.logError;
  }
  componentDidCatch(...args: any): void {
    this.logError(args);
  }

  logError(args: any): void {
    console.error(args);
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          Hmmmmmm... something seems to have gone wrong....
        </div>
      );
    }
    return this.props.children;
  }
}
