import React from 'react';
import clamor from '../../assets/clamor.png';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { IUser } from '../../models/User';

interface INavcomponentState {
  isOpen: boolean
}

interface INavcomponentProps {
  currentUser: IUser
}

export class NavComponent extends React.Component<INavcomponentProps, INavcomponentState> {

  state = {
    isOpen: true
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <Navbar color="light" light expand="md" >
        <NavbarBrand href="/home">
          <img className="img-adjust-position rev-logo" src={clamor} alt="clamor" />
        </NavbarBrand>
        <NavbarToggler onClick={this.handleClick} />
        <Collapse isOpen={this.state.isOpen}>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/home">
                <Button color="primary" size="sm">Home</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/login">
                <Button color="primary" size="sm">Sign In</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"/profile/"  + this.props.currentUser.id.toString()}>
                <Button color="primary" size="sm">Profile</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/friends">
                <Button color="primary" size="sm">Friends</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/groups">
                <Button color="primary" size="sm">Groups</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/browse">
                <Button color="primary" size="sm">Browse Groups</Button>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state:IState) =>{
  return{
    currentUser: state.CurrentUser.self
  }
}

const mapActionToProps = {
}

export default connect(mapStateToProps,mapActionToProps)(NavComponent)