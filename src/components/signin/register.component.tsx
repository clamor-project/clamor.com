import React, { Component } from 'react'
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { sendRegistration } from '../../actions/login.action'
import { Card, Container, Row, Col, Form, Input, FormGroup, Label } from 'reactstrap';

interface IRegisterPageProps extends RouteComponentProps {
  sendRegistration: (username: string, password: string, email: string, dateOfBirth: string, history: any) => void
}

interface IRegisterPageState {
  username: string
  email: string
  password: string
  dateOfBirth: string
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
    const { username, password, email, dateOfBirth } = this.state
    this.props.sendRegistration(username, password, email, dateOfBirth, this.props.history)
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
                  <Label for="email">Email</Label>
                  <Input type="text" placeholder="email" onChange={this.handleChange('email')} id="email" />
                  <Label for="dateOfBirth">Date of Birth</Label>
                  <Input type="date" placeholder="Date of Birth" onChange={this.handleChange('dateOfBirth')} id="dateOfBirth" />
                </FormGroup>
                <Input type="submit" value="Send Registration" />
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {
  sendRegistration
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterForm))
