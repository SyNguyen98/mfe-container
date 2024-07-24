import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import VueComponentWrapper from "./mfes/VueMFE";
import ReactMFE from "./mfes/ReactMFE";

const App = () => (
    <div className="container">
        <div>Name: mfe-container</div>
        <div>Framework: react</div>
        <div>Language: TypeScript</div>
        <div>CSS: Empty CSS</div>

        <ReactMFE/>

        <VueComponentWrapper/>
    </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

root.render(<App/>)