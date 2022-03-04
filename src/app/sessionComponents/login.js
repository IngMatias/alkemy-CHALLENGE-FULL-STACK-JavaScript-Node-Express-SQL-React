import React, { Component } from 'react'
import { render } from 'react-dom'
import { useNavigate } from 'react-router-dom'

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
            if (res.status == 401 || res.status == 404) {
                render(
                    <span>Try again</span>,
                    document.getElementById('underLogInMessage')
                )
            }
            if (res.status == 200) {
                window.location.href = '/home'
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
        return (<div id='login-container'>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleEmailChange} type='email' name='email' placeholder='email' required></input>
                <input onChange={this.handlePasswordChange} type='password' name='password' placeholder='password' required></input>

                <button>Log In</button>

                <div id="underLogInMessage"></div>
            </form>
        </div>)
    }
}

export default LogIn