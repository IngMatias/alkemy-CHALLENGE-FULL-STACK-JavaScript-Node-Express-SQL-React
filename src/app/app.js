import React, { Component } from 'react'
import { render } from 'react-dom'

import LogIn from './sessionComponents/login'
import Register from './sessionComponents/register'

class App extends Component {
    render() {
        return (
            <div>
                <LogIn></LogIn>
                <Register></Register>
            </div>
        )
    }
}

render(
    <App/>,
    document.getElementById('app')
)