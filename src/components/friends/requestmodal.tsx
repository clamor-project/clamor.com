import React, { PureComponent } from 'react'
import { Modal, ModalBody, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { getFriendables } from '../../actions/user.action'
import { IUser } from '../../models/User';
import { makeFriending } from '../../actions/friending.action'

interface IRequestModalProps {
  handleClose: () => void
  requestable: IUser[]
  getFriendables: (id:number) => void
  self: IUser
  makeFriending: (userId: number, targetId: number) => void
}

class RequestModal extends PureComponent<IRequestModalProps> {

  handleClick = (id:number) => () => {
    this.props.makeFriending(this.props.self.id, id)
    this.props.handleClose()
  }

  componentDidMount(){
    this.props.getFriendables(this.props.self.id)
  }

  render() {
    return (
      <Modal isOpen>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>username</th>
                <th>send request</th>
              </tr>
            </thead>
            <tbody>
            {this.props.requestable.map(friendable => (
            <tr key={friendable.id}>
              <td>{friendable.username}</td>
              <td><Button onClick={this.handleClick(friendable.id)} color="primary">send request</Button></td>
            </tr>
          ))}
            </tbody>
          </Table>

        </ModalBody>
        <Button onClick={this.props.handleClose} color="secondary">Close</Button>
      </Modal>
    )
  }
}

const mapStateToProps = (state:IState) => ({
  requestable: state.FriendState.friendables,
  self: state.CurrentUser.self
})

const mapDispatchToProps = {
  getFriendables,
  makeFriending
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestModal)
