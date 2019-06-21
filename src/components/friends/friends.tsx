import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { Table } from 'reactstrap';
import { IUser } from '../../models/User';
import { makeFriending, abandonFriending } from '../../actions/friending.action'
import { IFriending } from '../../models/Friending';
import RequestModal from './requestmodal'

interface IFriendsPageProps {
  mutualFriends: IFriending[]
  requests: IFriending[]
  self: IUser
  makeFriending: (userId:number, targetId:number) => void
  abandonFriending: (userId:number, targetId:number) => void
}

interface IFriendsPageState {
  makeRequestModal:boolean
}

export class FriendsPage extends PureComponent<IFriendsPageProps, IFriendsPageState> {

  state = {
    makeRequestModal: false
  }

  handleOpen = () => {
    this.setState({
      makeRequestModal: !this.state.makeRequestModal
    })
  }

  handleAccept = (id:number) => () => {
    this.props.makeFriending(this.props.self.id, id)
  }

  handleReject = (id:number) => () => {
    this.props.abandonFriending(id, this.props.self.id)
  }

  render() {
    return (
      <div>
        {this.state.makeRequestModal && <RequestModal handleClose={this.handleOpen} />}
        {this.props.mutualFriends.length ? <div>
          <p>Friends</p>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Chat</th>
              </tr>
            </thead>
            <tbody>
              {this.props.mutualFriends.map(friend => <tr key={friend.id}>
                <td>{friend.user1.username}</td>
                <td><button>. . .</button></td>
              </tr>)}
            </tbody>
          </Table>
        </div>: <p>you have no friends</p>}
        {this.props.requests.length ? <div>
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
                <td><button onClick={this.handleAccept(request.user1.id)}>friend</button></td>
                <td><button onClick={this.handleReject(request.user1.id)}>ignore</button></td>
              </tr>)}
            </tbody>
          </Table>
        </div>
        : <p>no one wants to be friends with you</p>}
        {this.props.self.id && <button onClick={this.handleOpen}>Make Request</button>}
      </div>
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
