import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser, clearErrors } from '../../../actions/authActions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            nickname: "",
            favoriteclub: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // Rensar gamla felmeddelanden
        this.props.clearErrors();
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
            password2: this.state.password2,
            nickname: this.state.nickname,
            favoriteclub: this.state.favoriteclub
        };

        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return (
            <Container style={{ marginTop: '3em', paddingBottom: '4em' }}>
                <Row>
                    <Col>
                        <Link to="/" >
                            Tillbaka till startsidan
                        </Link>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                            <h4>
                                <b>Bli medlem</b>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Redan medlem? <Link to="/login">Logga in här istället.</Link>
                            </p>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="name">Namn</Form.Label>
                                <Form.Control onChange={this.onChange}
                                    placeholder="Namn"
                                    value={this.state.name}
                                    isValid={this.state.name !== ''}
                                    isInvalid={this.props.errors.payload.name}
                                    id="name"
                                    type="text"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.props.errors.payload.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="email">E-postadress</Form.Label>
                                <Form.Control type="email" placeholder="E-postadress" onChange={this.onChange}
                                    value={this.state.email}
                                    isValid={emailRegExp.test(String(this.state.email).toLowerCase())}
                                    isInvalid={this.props.errors.payload.email}
                                    id="email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.props.errors.payload.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="password">Lösenord</Form.Label>
                                <Form.Control type="password" placeholder="Lösenord" onChange={this.onChange}
                                    value={this.state.password}
                                    isValid={this.state.password !== '' && this.state.password.length >= 6 && this.state.password.length <= 30}
                                    isInvalid={this.props.errors.payload.password}
                                    id="password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.props.errors.payload.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="password2">Bekräfta lösenord</Form.Label>
                                <Form.Control type="password" placeholder="Bekräfta lösenord" onChange={this.onChange}
                                    value={this.state.password2}
                                    isValid={this.state.password2 !== '' && this.state.password2.length >= 6 && this.state.password2.length <= 30 && this.state.password === this.state.password2}
                                    isInvalid={this.props.errors.payload.password2}
                                    id="password2"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.props.errors.payload.password2}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <hr />
                            <Form.Group>
                                <Form.Label htmlFor="nickname">Vad vill du heta på forumet?</Form.Label>
                                <Form.Control onChange={this.onChange}
                                    placeholder="Användarnamn"
                                    value={this.state.nickname}
                                    isValid={this.state.nickname !== ''}
                                    isInvalid={this.props.errors.payload.nickname}
                                    id="nickname"
                                    type="text"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.props.errors.payload.nickname}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="favoriteclub">Vilket är din favoritklubb?</Form.Label>
                                <Form.Control onChange={this.onChange}
                                    placeholder="Favoritklubb"
                                    value={this.state.favoriteclub}
                                    isValid={this.state.favoriteclub !== ''}
                                    id="favoriteclub"
                                    type="text"
                                />
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
    { registerUser, clearErrors }
)(withRouter(Register));