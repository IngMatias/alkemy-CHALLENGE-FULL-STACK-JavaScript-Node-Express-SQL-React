import React, { Component } from 'react'
import { render } from 'react-dom'

import LogIn from './sessionComponents/login'
import Register from './sessionComponents/register'

class Index extends Component {
    render() {
        return (<div id='index-container'>
            <h1>Welcome</h1>
            <LogIn></LogIn>
            <Register></Register>
        </div>)
    }
}

export default Index