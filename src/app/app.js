import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Index from './index'
import Home from './home'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />}/>
                <Route path='/home' element={<Home />}/>
            </Routes>
        </BrowserRouter>
    )
}

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('app')
)