import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { IUser } from '../../../models/User';
import { IGroup } from '../../../models/Group';
import { Container, Input, Button, Table, Form } from 'reactstrap';
import './group-messaging.component.css';
import { IGroupMessage } from '../../../models/GroupMessage';
import { IUsergroup } from '../../../models/Usergroup';
import { postGroupMessage, deleteGroupMessage } from '../../../actions/group-message.action';

// Dear future self: I am _SO_ sorry...
interface IGroupMessagingProps {
  currentUser: IUser;
  currentGroup: IGroup;
  messageList: IGroupMessage[];
  usergroup: IUsergroup;
  postGroupMessage: (groupMessage: IGroupMessage) => void;
  deleteGroupMessage: (messageId: number, groupId: number) => void;
}

interface IGroupMessagingState {
  messageText: string;
}

class GroupMessaging extends Component<IGroupMessagingProps, IGroupMessagingState> {
  constructor(props: IGroupMessagingProps) {
    super(props);
    this.state = {
      messageText: ''
    }
  }

  handleInputChange = (property: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
  }

  submit = (event) => {
    event.preventDefault();
    const groupMessage: IGroupMessage = {
      author: this.props.usergroup,
      id: 0,
      content: this.state.messageText,
      dateCreated: new Date()
    }
    if (this.state.messageText !== '') {
      this.props.postGroupMessage(groupMessage);
    }
    this.setState({
      ...this.state,
      messageText: ''
    });
  }

  formItems = () => {
    if (this.props.usergroup.role.roleName && ['member', 'organizer'].includes(this.props.usergroup.role.roleName)) {
      return (
        <tr>
          <td className="username">{this.props.currentUser.username}</td>
          <td className="message">
            <Input type="text" value={this.state.messageText} onChange={this.handleInputChange('messageText')} />
          </td>
          <td className="post">
            <Button type="submit" value="submit">Post</Button>
          </td>
        </tr>
      );
    }
  }

  deleteMessage = (message: IGroupMessage) => {
    this.props.deleteGroupMessage(+message.id, +message.author.group.id);
  }

  componentDidMount() {
    console.log(this.props.messageList);
  }

  render() {
    return (
      <div className="GroupMessaging">
        <Container>
          <Form onSubmit={this.submit}>
            <Table>
              <thead>
                <tr>
                  <th className="username">Username</th>
                  <th className="message">Message</th>
                  {/* <th className="action"></th> */}
                  <th className="post"></th>
                </tr>
              </thead>
              <tbody>
                {this.formItems()}
                {this.props.messageList ? this.props.messageList.map(message => 
                <tr key={"message-" + message.id}>
                  <td className="username">{message.author.user.username}:</td>
                  <td className="message">{message.content}</td>
                  {/* <td className="action">{message.author.user.id === this.props.currentUser.id ? <Button color="danger" onClick={() => this.deleteMessage(message)}>Delete</Button> : <></>}</td> */}
                  <td className="post">{((new Date(message.dateCreated)).toString()).substr(0,24)}</td>
                </tr>): <></>}
              </tbody>
            </Table>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.CurrentUser.self,
    currentGroup: state.CurrentGroup,
    messageList: state.GroupMessageState.messageList
  }
}

const mapDispatchToProps = {
  postGroupMessage,
  deleteGroupMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupMessaging);
