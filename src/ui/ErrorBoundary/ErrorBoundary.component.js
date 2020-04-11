import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './ErrorBoundary.style.css';

class ErrorBoundary extends Component {

    state = {
        error: null,
        errorInfo: null,
        hasError: false
    }
    
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error, 
            errorInfo: errorInfo,
            hasError: true
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container p-4">
                    <div className="row mt-4">
                        <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12"></div>
                        <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12 text-center">
                            <div className="jumbotron">
                                <h1>Ooops! Something went wrong</h1>
                                <details style={{ whiteSpace: 'pre-wrap' }}>
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo.componentStack}
                                </details>
                                <button className="btn btn-lg btn-primary mt-4" onClick={this.props.history.goBack} type="button">Return Back</button>
                            </div>
                        </div>
                        <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12"></div>
                    </div>
                </div>
            );
        }
        return this.props.children
    }
}

export default withRouter(ErrorBoundary);