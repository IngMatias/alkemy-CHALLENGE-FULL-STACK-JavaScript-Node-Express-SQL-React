import React, { Component } from 'react'
import { render } from 'react-dom'

class Register extends Component {
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

        fetch('/register', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status == 304) {
                render(
                    <span>Already register</span>,
                    document.getElementById('underRegisterMessage')
                )
            }
            if (res.status == 201) {
                render(
                    <span>Registered successfully</span>,
                    document.getElementById('underRegisterMessage')
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
        return (<div id='register-container'>
            <form onSubmit={this.handleSubmit}>

                <input onChange={this.handleEmailChange} type='email' name='email' placeholder='email' required></input>
                <input onChange={this.handlePasswordChange} type='password' name='password' placeholder='password' required></input>

                <button>Register</button>

                <div id="underRegisterMessage"></div>
            </form>
        </div>)
    }
}

export default Register