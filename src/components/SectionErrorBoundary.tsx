"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
}

export default class SectionErrorBoundary extends Component<Props, State> {
  private retryTimeout: NodeJS.Timeout | null = null;

  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    if (error) {}
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error in section:", this.props.sectionName, error, errorInfo);
    
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
    
    // Silently attempt to retry rendering/loading after 3 seconds
    this.retryTimeout = setTimeout(() => {
      this.setState({ hasError: false });
    }, 3000);
  }

  public componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  public render() {
    if (this.state.hasError) {
      // Show nothing on screen and silently retry in the background
      return null;
    }

    return this.props.children;
  }
}
