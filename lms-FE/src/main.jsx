import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './components/errorHandling/ErrorBoundary';
import { AccessTokenProvider } from './components/AccessTokenProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
      {/* <AccessTokenProvider> */}
        <App />
      {/* </AccessTokenProvider> */}
    {/* </ErrorBoundary> */}
  </React.StrictMode>,
)
