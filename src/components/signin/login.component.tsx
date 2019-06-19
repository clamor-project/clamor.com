
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { sendLogin } from '../../actions/login.action'

interface ILoginProps extends RouteComponentProps {
  self: any
  sendLogin: (username:string, password:string, history:any) => void
}

interface ILoginState {
  username:string
  password:string
}

class LoginForm extends Component<ILoginProps, ILoginState> {

  state = {
    username: '',
    password: ''
}

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendLogin(this.state.username, this.state.password, this.props.history)
  }

  handleChange = (key:string) => event => {
    this.setState({
      ...this.state,
      [key]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="username" onChange={this.handleChange('username')} />
          <input type="text" placeholder="password" onChange={this.handleChange('password')} />
          <input type="submit" value="Sign In" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state:IState) => ({
  self: state.CurrentUser.self
})

const mapDispatchToProps = {
  sendLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))