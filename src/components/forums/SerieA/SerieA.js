import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import EditModal from '../../layout/EditModal/EditModal';
import DeleteModal from '../../layout/DeleteModal/DeleteModal';

import ForumNav from '../../layout/ForumNav/ForumNav';

import { connect } from "react-redux";

import moment from 'moment';

import { setCurrentForum, fetchForumPosts, addForumPost, updateForumPost, deleteForumPost, setForumInterval, hideToast } from '../../../actions/forumActions';

class SerieA extends Component {
    state = {
        postText: '',
        updatedText: '',
        updatedPost: {},
        deletedPost: {},
        isEditModalOpen: false,
        isDeleteModalOpen: false
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
    };

    closeEditModal = () => {
        this.setState({ isEditModalOpen: false });
    };

    openDeleteModal = id => {
        const deletedPost = this.props.forum.serieAPosts.find(post => id === post._id);
        this.setState({
            isDeleteModalOpen: true,
            deletedPost
        });
    };

    closeDeleteModal = () => {
        this.setState({ isDeleteModalOpen: false });
    };

    addPost = () => {
        this.props.onAddForumPost({ text: this.state.postText, forumType: 'seriea' });

        this.setState({ postText: '' });
    }

    updatePost = () => {
        this.props.onUpdateForumPost({ id: this.state.updatedPost._id, text: this.state.updatedText, forumType: 'seriea' });

        this.setState({ updatedText: '', isEditModalOpen: false });
    }

    deletePost = () => {
        this.props.onDeleteForumPost({ id: this.state.deletedPost._id, forumType: 'seriea' });

        this.setState({ isDeleteModalOpen: false });
    }

    componentDidMount() {
        if (this.props.forum.currentForum !== 'seriea') {
            this.props.onSwitchForumNav('seriea');
        }

        this.props.onFetchForumPosts('seriea');

        const intervalID = setInterval(() => { this.props.onFetchForumPosts('seriea'); }, 30000);

        this.props.onSetInterval('seriea', intervalID);

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
                            <InputGroup.Text>Inlägg</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="With textarea" value={this.state.postText} onChange={e => this.textChangeHandler(e.target.value)} />
                    </InputGroup>
                    <Button variant="primary" onClick={this.addPost}>Skicka</Button>
                </>
            );
        }

        let spinner = null;

        if (this.props.forum.loading) {
            spinner =  <Spinner animation="border" variant="primary" />;
        }

        return (
            <Container style={{ height: "75vh", marginTop: '3em', position: 'relative' }}>
                <Toast style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 100
                        }} onClose={this.props.onHideToast} show={this.props.forum.isToastShowing} delay={3000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Meddelande</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body>{this.props.forum.toastMessage}</Toast.Body>
                </Toast>
                <EditModal isEditModalOpen={this.state.isEditModalOpen} closeEditModal={this.closeEditModal} updatedText={this.state.updatedText} updatedTextChangeHandler={this.updatedTextChangeHandler} updatePost={this.updatePost} />
                <DeleteModal isDeleteModalOpen={this.state.isDeleteModalOpen} closeDeleteModal={this.closeDeleteModal} deletedPost={this.state.deletedPost} deletePost={this.deletePost} />
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
                        {spinner}
                        <ListGroup>
                            {this.props.forum.serieAPosts ? this.props.forum.serieAPosts.map(sap => (
                                <ListGroup.Item key={sap._id}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{sap.userName}</h5>
                                        <small>{sap.updatedDate ? <span style={{ color: 'red' }}>(Redigerad {moment(sap.updatedDate).format('YYYY-MM-DD HH:mm')})</span> : null} {moment(sap.date).format('YYYY-MM-DD HH:mm')}</small>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start">
                                        <p className="mb-1">{sap.text}</p>
                                    </div>
                                    {this.props.auth.user.id === sap.userId ? (<ButtonToolbar>
                                        <Button variant="info" size="sm" style={{ marginRight: '1em' }} onClick={id => this.openEditModal(sap._id)}>
                                            Redigera
                                    </Button>
                                        <Button variant="danger" size="sm" onClick={id => this.openDeleteModal(sap._id)}>
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
        onAddForumPost: postData => dispatch(addForumPost(postData)),
        onUpdateForumPost: postData => dispatch(updateForumPost(postData)),
        onDeleteForumPost: postData => dispatch(deleteForumPost(postData)),
        onSetInterval: (forumType, interval) => dispatch(setForumInterval(forumType, interval)),
        onHideToast: () => dispatch(hideToast())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SerieA);