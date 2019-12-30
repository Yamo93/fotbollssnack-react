import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import ForumNav from '../../layout/ForumNav/ForumNav';

import { connect } from "react-redux";

import moment from 'moment';

import { setCurrentForum, fetchForumPosts, addForumPost } from '../../../actions/forumActions';

class PremierLeague extends Component {

    state = {
        postText: ''
    };

    textChangeHandler = value => {
        this.setState({ postText: value });
    }

    addPost = postData => {
        this.props.onAddForumPost({ text: this.state.postText, forumType: 'premierleague' });

        this.setState({ postText: '' });
    }

    componentDidMount() {
        if (this.props.forum.currentForum !== 'premierleague') {
            this.props.onSwitchForumNav('premierleague');
        }

        this.props.onFetchForumPosts('premierleague');

    }

    render() {
        let postInputField = null;

        if (this.props.auth.isAuthenticated) {
            postInputField = (
                <>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Användarnamn"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled
                            value={this.props.auth.user.name.split(' ')[0]}
                        />
                    </InputGroup>
                    <InputGroup style={{ marginBottom: '1em' }}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Meddelande</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="With textarea" value={this.state.postText} onChange={e => this.textChangeHandler(e.target.value)} />
                    </InputGroup>
                    <Button variant="primary" onClick={this.addPost}>Skicka</Button>
                </>
            );
        }

        return (
            <Container style={{ height: "75vh", marginTop: '3em' }}>
                <Row>
                    <Col>
                        <ForumNav />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Premier League</h2>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: '2em' }}>
                        {postInputField}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {this.props.forum.premierLeaguePosts ? this.props.forum.premierLeaguePosts.map(plp => (
                                <ListGroup.Item key={plp._id}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{plp.userName}</h5>
                                        <small>{moment(plp.date).format('YYYY-MM-DD HH:mm')}</small>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start">
                                        <p className="mb-1">{plp.text}</p>
                                    </div>
                                    {this.props.auth.user.id === plp.userId ? (<ButtonToolbar>
                                        <Button variant="info" size="sm" style={{ marginRight: '1em' }}>
                                            Redigera
                                    </Button>
                                        <Button variant="danger" size="sm">
                                            Radera
                                    </Button>
                                    </ButtonToolbar>) : null}
                                </ListGroup.Item>

                            )) : null}
                        </ListGroup>

                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    forum: state.forum
});

const mapDispatchToProps = dispatch => {
    return {
        onSwitchForumNav: forumType => dispatch(setCurrentForum(forumType)),
        onFetchForumPosts: forumType => dispatch(fetchForumPosts(forumType)),
        onAddForumPost: postData => dispatch(addForumPost(postData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PremierLeague);