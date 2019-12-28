import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
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
                        <Col>
                            <h4>
                                <b>Bli medlem</b>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Redan medlem? <Link to="/login">Logga in här istället.</Link>
                            </p>
                        </Col>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="name">Namn</Form.Label>
                                <Form.Control onChange={this.onChange}
                                    placeholder="Namn"
                                    value={this.state.name}
                                    isInvalid={errors.name}
                                    id="name"
                                    type="text"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

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

                            <Form.Group>
                                <Form.Label htmlFor="password2">Bekräfta lösenord</Form.Label>
                                <Form.Control type="password" placeholder="Bekräfta lösenord" onChange={this.onChange}
                                    value={this.state.password2}
                                    isInvalid={errors.password2}
                                    id="password2"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password2}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Bli medlem
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));