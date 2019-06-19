import React, { Component } from 'react'
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { sendRegistration } from '../../actions/login.action'

interface IRegisterPageProps extends RouteComponentProps {
  sendRegistration: (username:string, password:string, email:string, dateOfBirth:string, history:any) => void
}

interface IRegisterPageState {
  username:string
  email:string
  password:string
  dateOfBirth:string
}

export class RegisterForm extends Component<IRegisterPageProps, IRegisterPageState> {

  state = {
    username: '',
    email: '',
    password: '',
    dateOfBirth: '2000-01-01',
  }

  handleSubmit = event => {
    event.preventDefault();
    const {username, password, email, dateOfBirth} = this.state
    this.props.sendRegistration(username, password, email, dateOfBirth, this.props.history)
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
          <input type="text" placeholder="email" onChange={this.handleChange('email')} />
          <input type="date" placeholder="Date of Birth" onChange={this.handleChange('dateOfBirth')} />
          <input type="submit" value="Send Registration" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state:IState) => ({

})

const mapDispatchToProps = {
  sendRegistration
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterForm))
