import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { Table } from 'reactstrap';
import { IUser } from '../../models/User';
import { makeFriending, abandonFriending } from '../../actions/friending.action'

interface IFriendsPageProps {
  mutualFriends: IUser[]
  requests: IUser[]
  self: IUser
  makeFriending: (userId:number, targetId:number) => void
  abandonFriending: (userId:number, targetId:number) => void
}

export class FriendsPage extends PureComponent<IFriendsPageProps> {

  handleAccept = (id:number) => () => {
    this.props.makeFriending(this.props.self.id, id)
  }

  handleReject = (id:number) => () => {
    this.props.abandonFriending(id, this.props.self.id)
  }

  render() {
    return (
      <div>
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
                <td>{friend.username}</td>
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
                <td>{request.username}</td>
                <td><button onClick={this.handleAccept(request.id)}>friend</button></td>
                <td><button onClick={this.handleReject(request.id)}>ignore</button></td>
              </tr>)}
            </tbody>
          </Table>
        </div>
        : <p>no one wants to be friends with you</p>}
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
