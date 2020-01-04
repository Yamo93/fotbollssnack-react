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
import Pagination from 'react-bootstrap/Pagination';
import Badge from 'react-bootstrap/Badge';

import EditModal from '../../layout/EditModal/EditModal';
import DeleteModal from '../../layout/DeleteModal/DeleteModal';

import ForumNav from '../../layout/ForumNav/ForumNav';

import { connect } from "react-redux";

import moment from 'moment';

import { setCurrentForum, fetchForumPosts, addForumPost, updateForumPost, deleteForumPost, setForumInterval, hideToast, setCurrentForumPage } from '../../../actions/forumActions';

class LaLiga extends Component {

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
        const updatedPost = this.props.forum.laLigaPosts.find(post => id === post._id);
        this.setState({
            isEditModalOpen: true,
            updatedPost,
            updatedText: updatedPost.text
        });
    }

    closeEditModal = () => {
        this.setState({ isEditModalOpen: false });
    }

    openDeleteModal = id => {
        const deletedPost = this.props.forum.laLigaPosts.find(post => id === post._id);
        this.setState({
            isDeleteModalOpen: true,
            deletedPost
        });
    };

    closeDeleteModal = () => {
        this.setState({ isDeleteModalOpen: false });
    }

    addPost = () => {
        this.props.onAddForumPost({ text: this.state.postText, forumType: 'laliga' });

        this.setState({ postText: '' });
    }

    updatePost = () => {
        this.props.onUpdateForumPost({ id: this.state.updatedPost._id, text: this.state.updatedText, forumType: 'laliga' });

        this.setState({ updatedText: '', isEditModalOpen: false });
    }

    deletePost = () => {
        this.props.onDeleteForumPost({ id: this.state.deletedPost._id, forumType: 'laliga' });

        this.setState({ isDeleteModalOpen: false });
    }

    componentDidMount() {
        if (this.props.forum.currentForum !== 'laliga') {
            this.props.onSwitchForumNav('laliga');
        }

        this.props.onFetchForumPosts('laliga');

        const intervalID = setInterval(() => { this.props.onFetchForumPosts('laliga'); }, 30000);

        this.props.onSetInterval('laliga', intervalID);

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
                            value={this.props.auth.user.nickname ? this.props.auth.user.nickname : this.props.auth.user.name.split(' ')[0]}
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
            spinner = <Spinner animation="border" variant="primary" />;
        }

        return (
            <Container style={{ marginTop: '3em', position: 'relative' }}>
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
                    <Toast.Body className={this.props.forum.toastColorClass}>{this.props.forum.toastMessage}</Toast.Body>
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
                        <h2>La Liga</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button style={{ marginBottom: '1em' }}
                            variant="primary"
                            disabled={this.props.forum.loading}
                            onClick={forumType => this.props.onFetchForumPosts('laliga')}
                        >
                            {this.props.forum.loading ? 'Laddar om...' : 'Ladda om inläggen'}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: '2em' }}>
                        {postInputField}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Pagination>
                            {this.props.forum.laLigaPostPages ? this.props.forum.laLigaPostPages.map(postPage => <Pagination.Item key={postPage} onClick={(forumPageId, forumType) => this.props.onSetCurrentForumPage(postPage, 'laliga')} active={this.props.forum.currentLaLigaForumPage === postPage}>{postPage}</Pagination.Item>) : null}
                        </Pagination>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {spinner}
                        <ListGroup>
                            {this.props.forum.laLigaPaginatedPostsToShow ? this.props.forum.laLigaPaginatedPostsToShow.map(llp => llp? (
                                <ListGroup.Item key={llp._id}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{llp.nickname ? llp.nickname : llp.userName}
                                        {llp.favoriteclub ? <Badge style={{ marginLeft: '5px', fontSize: '12px' }} pill variant="success">
                                            {llp.favoriteclub}
                                        </Badge> : null}
                                        </h5>
                                        <small>{llp.updatedDate ? <span style={{ color: 'red' }}>(Redigerad {moment(llp.updatedDate).format('YYYY-MM-DD HH:mm')})</span> : null} {moment(llp.date).format('YYYY-MM-DD HH:mm')}</small>
                                    </div>
                                    <div className="d-flex w-100 justify-content-start">
                                        <p className="mb-1">{llp.text}</p>
                                    </div>
                                    {this.props.auth.user.id === llp.userId ? (<ButtonToolbar>
                                        <Button variant="info" size="sm" style={{ marginRight: '1em' }} onClick={id => this.openEditModal(llp._id)}>
                                            Redigera
                                    </Button>
                                        <Button variant="danger" size="sm" onClick={id => this.openDeleteModal(llp._id)}>
                                            Radera
                                    </Button>
                                    </ButtonToolbar>) : null}
                                </ListGroup.Item>

                            ) : null) : null}
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
        onHideToast: () => dispatch(hideToast()),
        onSetCurrentForumPage: (forumPageId, forumType) => dispatch(setCurrentForumPage(forumPageId, forumType))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LaLiga);