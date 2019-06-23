
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { sendLogin } from '../../actions/login.action'
import { Form, FormGroup, Input, Card, Container, Row, Col, Label } from 'reactstrap';

interface ILoginProps extends RouteComponentProps {
  self: any
  sendLogin: (username: string, password: string, history: any) => void
}

interface ILoginState {
  username: string
  password: string
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

  handleChange = (key: string) => event => {
    this.setState({
      ...this.state,
      [key]: event.target.value
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="4">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input type="text" placeholder="username" onChange={this.handleChange('username')} id="username" />
                  <Label for="password">Password</Label>
                  <Input type="password" placeholder="password" onChange={this.handleChange('password')} id="password" />
                </FormGroup>
                <Input type="submit" value="Sign In" />
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  self: state.CurrentUser.self
})

const mapDispatchToProps = {
  sendLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))