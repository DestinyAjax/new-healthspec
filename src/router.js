import React, { Suspense } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Loader from '@iso/components/utility/loader';
import App from './App';

class Routes extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Router>
            <App />
          </Router>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default Routes;
