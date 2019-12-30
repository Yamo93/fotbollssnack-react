import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal'

import ForumNav from '../../layout/ForumNav/ForumNav';

import { connect } from "react-redux";

import moment from 'moment';

import { setCurrentForum, fetchForumPosts, addForumPost } from '../../../actions/forumActions';

class SerieA extends Component {
    state = {
        postText: '',
        updatedText: '',
        updatedPost: {},
        isEditModalOpen: false
    };

    textChangeHandler = value => {
        this.setState({ postText: value });
    }

    updatedTextChangeHandler = value => {
        this.setState({ updatedText: value });
    }

    openEditModal = id => {
        const updatedPost = this.props.forum.serieAPosts.find(post => id === post._id);
        this.setState({
            isEditModalOpen: true,
            updatedPost,
            updatedText: updatedPost.text
        });
    }

    closeEditModal = () => {
        this.setState({ isEditModalOpen: false });
    }

    addPost = postData => {
        this.props.onAddForumPost({ text: this.state.postText, forumType: 'seriea' });

        this.setState({ postText: '' });
    }

    componentDidMount() {
        if (this.props.forum.currentForum !== 'seriea') {
            this.props.onSwitchForumNav('seriea');
        }

        this.props.onFetchForumPosts('seriea');

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
                <Modal show={this.state.isEditModalOpen} onHide={this.closeEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Uppdatera meddelande</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            <FormControl as="textarea" aria-label="With textarea" value={this.state.updatedText} onChange={e => this.updatedTextChangeHandler(e.target.value)} />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeEditModal}>
                            Avbryt
                        </Button>
                        <Button variant="primary" onClick={this.closeEditModal}>
                            Redigera
                        </Button>
                    </Modal.Footer>
                </Modal>
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
                        {postInputField}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {this.props.forum.serieAPosts ? this.props.forum.serieAPosts.map(sap => (
                                <ListGroup.Item key={sap._id}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{sap.userName}</h5>
                                        <small>{moment(sap.date).format('YYYY-MM-DD HH:mm')}</small>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start">
                                        <p className="mb-1">{sap.text}</p>
                                    </div>
                                    {this.props.auth.user.id === sap.userId ? (<ButtonToolbar>
                                        <Button variant="info" size="sm" style={{ marginRight: '1em' }} onClick={id => this.openEditModal(sap._id)}>
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
)(SerieA);