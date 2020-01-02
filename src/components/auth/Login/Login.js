import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // redirect user to dashboard when they login
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    render() {
        const { errors } = this.state;

        return (
            <Container style={{ marginTop: '3em' }}>
                <Row>
                    <Col>
                        <Link to="/" className="btn-flat waves-effect">
                            Tillbaka till startsidan
                        </Link>
                        <h4>
                            <b>Logga in</b>
                        </h4>
                        <p className="grey-text text-darken-1">
                            Ny på sidan? <Link to="/register">Bli medlem här.</Link>
                        </p>

                        <Form noValidate onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="email">E-postadress</Form.Label>
                                <Form.Control type="email" placeholder="E-postadress" onChange={this.onChange}
                                    value={this.state.email}
                                    isInvalid={errors.email}
                                    id="email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="password">Lösenord</Form.Label>
                                <Form.Control type="password" placeholder="Lösenord" onChange={this.onChange}
                                    value={this.state.password}
                                    isInvalid={errors.password}
                                    id="password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Logga in
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);