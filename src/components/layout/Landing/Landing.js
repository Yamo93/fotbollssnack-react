import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link, withRouter } from "react-router-dom";

import { connect } from 'react-redux';

class Landing extends Component {

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
            <Container style={{ height: "75vh", marginTop: '3rem' }}>
                <Row>
                    <Col>
                        <h4>
                            <b>Diskutera</b> med Sveriges fotbollsfantaster om ditt favoritlag.
                        </h4>
                        <p className="flow-text grey-text text-darken-1">
                            En modern mötesplats där du kan diskutera i ditt forum eller chatta live med dina supporterkamrater.
                        </p>
                        <br />
                        <div className="col s6">
                            <Link
                                to="/register"
                                style={{
                                    letterSpacing: "1.5px",
                                    marginBottom: '1em'
                                }}
                                className="btn btn-primary"
                            >
                                Bli medlem</Link>
                        </div>
                        <div className="col s6">
                            <Link
                                to="/login"
                                style={{
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-secondary"
                            >
                                Logga in
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps, null
)(withRouter(Landing));