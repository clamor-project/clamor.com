import React from 'react'
import { IState } from '../../reducers';
import { sendLogin } from '../../actions/login.action'
import { connect } from 'react-redux';

interface ISignInState {
    username: string
    password: string
    errorMessage: string
}

interface ISignInProps {
    self: any
    sendLogin: (username:string, password:string) => void
}

export class SignInComponent extends React.Component<ISignInProps, ISignInState>{//first is props second is state
    
    state = {
        username: '',
        password: '',
        errorMessage: ''
    }


    updateField = (field:string) => (event) => {
        this.setState({
            ...this.state,
            [field]: event.target.value
        })
    }
    

    login = async (event)=>{
        event.preventDefault()
        this.props.sendLogin(this.state.username, this.state.password)
    }


    render(){
        return (
            <form className="form-signin text-center" onSubmit={this.login}>
                <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input type="text" id="inputUsername" className="form-control" value={this.state.username} onChange={this.updateField('username')}placeholder="Username" required autoFocus/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" value={this.state.password} onChange={this.updateField('password')} placeholder="Password" required/>
                <p>{this.state.errorMessage}</p>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </form>
        )
    }
}

const mapStateToProps = (state:IState) => ({
    self: state.CurrentUser.self
})

const mapDispatchToProps = {
    sendLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent)