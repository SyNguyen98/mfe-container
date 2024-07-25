import './App.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactMFE from "./mfes/ReactMFE";
import VueMFE from "./mfes/VueMFE";

const App = () => (
    <div className="container">
        <h1>This is MFE Container</h1>

        <ReactMFE/>

        <VueMFE/>
    </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

root.render(<App/>)