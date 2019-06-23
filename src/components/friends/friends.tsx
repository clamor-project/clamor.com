import React, { Component } from 'react'
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { Table, Container, Col, Row, Button } from 'reactstrap';
import { IUser } from '../../models/User';
import { makeFriending, abandonFriending } from '../../actions/friending.action'
import { IFriending } from '../../models/Friending';
import RequestModal from './requestmodal'
import Chat from './chat';

interface IFriendsPageProps {
  mutualFriends: IFriending[]
  requests: IFriending[]
  self: IUser
  makeFriending: (userId: number, targetId: number) => void
  abandonFriending: (userId: number, targetId: number) => void
}

interface IFriendsPageState {
  makeRequestModal: boolean
  chatroom: IFriending
}

export class FriendsPage extends Component<IFriendsPageProps, IFriendsPageState> {

  state = {
    makeRequestModal: false,
    chatroom: undefined
  }

  handleOpen = () => {
    this.setState({
      ...this.state,
      makeRequestModal: !this.state.makeRequestModal
    })
  }

  handleAccept = (id: number) => () => {
    this.props.makeFriending(this.props.self.id, id)
  }

  handleReject = (id: number) => () => {
    this.props.abandonFriending(id, this.props.self.id)
  }

  handleChangeChat = (friending: IFriending) => () => {
    this.setState({
      ...this.state,
      chatroom: friending
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="4">
            {this.state.makeRequestModal && <RequestModal handleClose={this.handleOpen} />}
            {this.props.mutualFriends.length ?
              <>
                <p><b><i>Friends</i></b></p>
                <Table dark>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Chat</th>
                      <th>Abandon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.mutualFriends.map(friend => <tr key={friend.id}>
                      <td>{friend.user1.username}</td>
                      <td><Button onClick={this.handleChangeChat(friend)} color="info">. . .</Button></td>
                      <td><Button onClick={this.handleReject(friend.user1.id)}>X(</Button></td>
                    </tr>)}
                  </tbody>
                </Table>
              </>
              : <p>you have no friends</p>}</Col>
          <Col xs="4">{this.props.requests.length ?
            <>
              <p>Friend Requests</p>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Accept</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.requests.map(request => <tr key={request.id}>
                    <td>{request.user1.username}</td>
                    <td><Button onClick={this.handleAccept(request.user1.id)} color="success">friend</Button></td>
                    <td><Button onClick={this.handleReject(request.user1.id)} color="danger">ignore</Button></td>
                  </tr>)}
                </tbody>
              </Table>
            </>
            : <p>no one wants to be friends with you</p>}
            {this.props.self.id && <Button onClick={this.handleOpen} color="success">Make Request</Button>}
          </Col>
          <Col xs="4"><Chat friending={this.state.chatroom} /></Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  mutualFriends: state.FriendState.mutualFriends,
  requests: state.FriendState.friendRequests,
  self: state.CurrentUser.self
})

const mapDispatchToProps = {
  makeFriending,
  abandonFriending
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage)
