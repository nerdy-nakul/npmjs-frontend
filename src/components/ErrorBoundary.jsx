import React, { Component } from "react";
// import "../index.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null, // Store the error
      errorInfo: null, // Store the error info
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to console
    console.error("Error caught by Error Boundary:", error, errorInfo);

    // Update state to display error and errorInfo
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Styled error component with Tailwind CSS
      return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-red-100 p-8">
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
            <p className="text-sm mb-2">An unexpected error occurred.</p>
            <p className="mt-2 text-xs">
              {this.state.error && this.state.error.toString()}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
