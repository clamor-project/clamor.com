import React from 'react'

import LoginForm from './login.component'
import RegisterForm from './register.component'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

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
             <Button onClick={this.handleClick} color="secondary">{this.state.login? 'Register': 'Login'}</Button>
            </div>
        )
    }
}



export default connect()(SignInComponent)