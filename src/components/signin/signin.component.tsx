import React from 'react'

import LoginForm from './login.component'
import RegisterForm from './register.component'
import { connect } from 'react-redux';

interface ISignInState {
    login: boolean
}


export class SignInComponent extends React.Component<any, ISignInState>{//first is props second is state

    state = {
        login: true
    }

    handleClick = () => {
        this.setState({
            login: !this.state.login
        })
    }


    render() {
        return (
            <div>
                {this.state.login ?
                    <LoginForm />
                    :
                    <RegisterForm />
                }
             <button onClick={this.handleClick}>{this.state.login? 'Register': 'Login'}</button>
            </div>
        )
    }
}



export default connect()(SignInComponent)