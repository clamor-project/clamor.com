import React from 'react';
import clamor from '../../assets/clamor.png';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

interface INavcomponentState {
  isOpen: boolean
}
export class NavComponent extends React.Component<any, INavcomponentState> {

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
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Sign In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/friends">Friends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/groups">Groups</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/browse">Browse Groups</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}