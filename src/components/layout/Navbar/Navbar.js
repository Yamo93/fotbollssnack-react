import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

class MainNavbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Nav.Link as={Link} to="/">Fotbollssnack <span role="img" aria-label="soccer-icon">⚽</span></Nav.Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            {this.props.auth.isAuthenticated ? <Nav.Link active disabled>Välkommen, {this.props.auth.user.name.split(' ')[0]}!</Nav.Link> : <Nav.Link as={Link} to="/register">Bli medlem</Nav.Link>}
                        </Nav.Item>
                        <Nav.Item>
                            {this.props.auth.isAuthenticated ? <Nav.Link as={Link} to="/" onClick={this.onLogoutClick}>Logga ut</Nav.Link> : <Nav.Link as={Link} to="/login">Logga in</Nav.Link>}
                        </Nav.Item>
                        <NavDropdown title="Inställningar" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

MainNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(MainNavbar);