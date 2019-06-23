import React, { Component } from 'react'
import { IState } from '../../reducers';
import { getMessage, postMessage } from '../../actions/friending.action'
import { connect } from 'react-redux';
import { IUser } from '../../models/User';
import { IDirectmessage } from '../../models/Directmessage';
import { IFriending } from '../../models/Friending';

interface IChatProps {
  friending: IFriending
  self: IUser
  messages: IDirectmessage[]
  setMessages: (user1: number, user2: number) => void
  postMessage: (message:IDirectmessage) => void
}

interface IChatState {
  text: string
  lastRoom: number
}

class Chat extends Component<IChatProps, IChatState> {

  state = {
    text: '',
    lastRoom: 0
  }

  handleChat = event => {
    this.setState({
      ...this.state,
      text: event.target.value
    })
  }

  handlePost = () => {
    let toSend:IDirectmessage = {
      id:0,
      friends: this.props.friending,
      content: this.state.text,
      sentDate: new Date()
    }
    this.props.postMessage(toSend)
    this.setState({
      ...this.state,
      text: ''
    })
  }

  handleRefresh = () => {
    this.props.setMessages(this.props.friending.user1.id, this.props.self.id)
    this.setState({
      ...this.state,
      lastRoom: this.props.friending.id
    })
  }

  componentDidUpdate() {
    if(this.state.lastRoom !== this.props.friending.id) {
      this.handleRefresh()
    }
  }

  render() {
    return (
      <div>
        {this.props.friending && <> {this.props.messages.map(msg => (
          <div key={msg.id}>
            <b>{msg.friends.user2.username}</b>
            <i>{' ' + new Date(msg.sentDate).toUTCString() + ':  '}</i>
            <p>{msg.content}</p>
          </div>
        ))}
          <textarea value={this.state.text} onChange={this.handleChat} placeholder="message" />
          <button onClick={this.handlePost}>post message</button>
          <button onClick={this.handleRefresh}>refresh</button>
        </>}
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  messages: state.FriendState.messages,
  self: state.CurrentUser.self
})

const mapDispatchToProps = {
  setMessages: getMessage,
  postMessage: postMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
