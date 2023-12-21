import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorMessage: null
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorMessage: errorInfo
        });

        // Log the error to a logging service or console
        console.error(error);
    }

    render() {
        if (this.state.error) {
            // Display a more informative error message
            return <div>Oops! Something went wrong. Please try again.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;