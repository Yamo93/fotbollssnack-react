import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import ForumNav from '../../layout/ForumNav/ForumNav';

import { connect } from "react-redux";

import { setCurrentForum, fetchForumPosts, addForumPost } from '../../../actions/forumActions';

class SerieA extends Component {
    state = {
        postText: ''
    };

    textChangeHandler = value => {
        this.setState({ postText: value });
    }

    componentDidMount() {
        if (this.props.forum.currentForum !== 'seriea') {
            this.props.onSwitchForumNav('seriea');
        }

        this.props.onFetchForumPosts('seriea');

    }

    render() {
        return (
            <Container style={{ height: "75vh", marginTop: '3em' }}>
                <Row>
                    <Col>
                        <ForumNav />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Serie A</h2>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: '2em' }}>
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
                        <Button variant="primary" onClick={postData => this.props.onAddForumPost({ text: this.state.postText, forumType: 'seriea' })}>Skicka</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {this.props.forum.serieAPosts ? this.props.forum.serieAPosts.map(sap => (
                                <ListGroup.Item key={sap._id}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{sap.userId}</h5>
                                        <small>{sap.date}</small>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start">
                                        <p className="mb-1">{sap.text}</p>
                                    </div>
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
)(SerieA);