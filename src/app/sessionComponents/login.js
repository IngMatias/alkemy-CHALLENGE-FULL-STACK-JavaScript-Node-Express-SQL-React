import React, { Component } from 'react'
import { render } from 'react-dom'

class LogIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()

        fetch('/login', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status == 401) {
                render(
                    <span>Try again</span>,
                    document.getElementById('wrongLogInMessage')
                )
            }   
        })
    }
    handleEmailChange(e) {
        this.setState((state) => ({
            email: e.target.value,
            password: state.password
        }))
    }
    handlePasswordChange(e) {
        this.setState((state) => ({
            email: state.email,
            password: e.target.value
        }))
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='email'>
                    Email:
                </label>
                <input onChange={this.handleEmailChange} type='email' name='email' required></input>

                <label htmlFor='password'>
                    Password:
                </label>
                <input onChange={this.handlePasswordChange} type='password' name='password' required></input>

                <button>Log In!</button>

                <div id="wrongLogInMessage"></div>
            </form>
        )
    }
}

export default LogIn