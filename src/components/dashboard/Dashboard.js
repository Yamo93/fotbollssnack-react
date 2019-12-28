import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForumNav from '../layout/ForumNav/ForumNav';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { setCurrentForum } from '../../actions/forumActions';

class Dashboard extends Component {

    componentDidMount() {
        this.props.onSwitchForumNav('');
    }


    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <Container style={{ height: "75vh", marginTop: '3em' }}>
                <Row>
                    <Col>
                        <ForumNav />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>
                            <b>Hej,</b> {user.name.split(" ")[0]}!
                            <p className="flow-text grey-text text-darken-1">
                                Välkommen till Fotbollssnack.
                            </p>
                        </h4>
                    </Col>
                </Row>
            </Container>
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    forum: state.forum
});

const mapDispatchToProps = dispatch => {
    return {
        onSwitchForumNav: forumType => dispatch(setCurrentForum(forumType)),
        logoutUser
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);