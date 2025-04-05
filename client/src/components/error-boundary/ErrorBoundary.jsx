import { Component } from "react";

export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMessage: ''
        }
    }
    static getDerivedStateFromError(error) {
        console.log('Error occurs', error);

        return {
            hasError: true,
            errorMessage: error.message
        }
    }

    // componentDidCatch(error, errorInfo){
    //     console.log('ErrorBoundary did catch');
        
    // }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>Error Page</h1>
                    <h2>{this.state.errorMessage}</h2>
                </>
            )
        }
        return this.props.children;
    }
}