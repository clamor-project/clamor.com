import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { IUser } from '../../models/User';
import { IUsergroup } from '../../models/Usergroup';
import { History } from 'history';
import { Table, Container, Button } from 'reactstrap';
import { setUsergroupRole } from '../../actions/usergroup.action';

interface IGroupOrganizerProps {
  history: History;
  match: any;
  currentUser: IUser;
  currentUsergroup: IUsergroup;
  usergroupList: IUsergroup[];
  setUsergroupRole: (usergroup: IUsergroup, roleId: number) => void;
}

interface IGroupOrganizerState {
  
}

class GroupOrganizer extends Component<IGroupOrganizerProps, IGroupOrganizerState> {
  constructor(props: IGroupOrganizerProps) {
    super(props);
    this.state = {
      
    }
  }

  setUserRole = (usergroup: IUsergroup, roleId: number) => {
    this.props.setUsergroupRole(usergroup, roleId);
  }

  banUnbanButton = (usergroup: IUsergroup) => {
    if (usergroup.role.id === 2) {
      return (
        <Button color="danger" onClick={() => this.setUserRole(usergroup, 3)} >Ban</Button>
      )
    } else if (usergroup.role.id === 3) {
      return (
        <Button color="primary" onClick={() => this.setUserRole(usergroup, 2)} >Unban</Button>
      )
    }
  }

  makeOrganizer = (usergroup: IUsergroup) => {
    if (usergroup.role.id === 2) {
      return (
        <Button color="warning" onClick={() => this.setUserRole(usergroup, 1)} >Make Organizer</Button>
      )
    }
    if (usergroup.role.id === 1 && usergroup.user.id !== this.props.currentUser.id) {
      return (
        <Button color="warning" onClick={() => this.setUserRole(usergroup, 2)} >Make Member</Button>
      )
    }
  }

  makeUsergroupRow = (usergroup: IUsergroup) => {
    if (usergroup.role.roleName !== 'left') {
      return (
        <tr>
          <td>{usergroup.user.username}</td>
          <td>{usergroup.role.roleName}</td>
          <td>{this.banUnbanButton(usergroup)}{this.makeOrganizer(usergroup)}</td>
        </tr>
      )
    }
  }

  render() {
    return (
      <div className="GroupOrganizer">
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.usergroupList ? this.props.usergroupList.map(usergroup => this.makeUsergroupRow(usergroup)) : <></>}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.CurrentUser.self,
    currentUsergroup: state.UsergroupState.currentUsergroup,
    usergroupList: state.UsergroupState.usergroupList
  }
}

const mapDispatchToProps = {
  setUsergroupRole
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupOrganizer);
