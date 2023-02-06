import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import <%= element %> from "./elements/<%= element %>"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <<%=element %> />
  </React.StrictMode>,
)
