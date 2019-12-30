import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import moment from 'moment';

import { connect } from "react-redux";

import { deleteForumPost } from '../../../actions/forumActions';

class DeleteModal extends Component {
    render() {
        return (
            <Modal show={this.props.isDeleteModalOpen} onHide={this.props.closeDeleteModal}>
            <Modal.Header closeButton>
                <Modal.Title>Radera inlägg</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Vill du radera följande inlägg?</h5>
                <p><strong>Användarnamn:</strong> {this.props.deletedPost.userName}</p>
                <p><strong>Inlägg:</strong> {this.props.deletedPost.text}</p>
                <p><strong>Datum:</strong> {moment(this.props.deletedPost.date).format('YYYY-MM-DD HH:mm')}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeDeleteModal}>
                    Avbryt
                </Button>
                <Button variant="danger" onClick={this.props.deletePost}>
                    Radera
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    forum: state.forum
});

const mapDispatchToProps = dispatch => {
    return {
        onDeleteForumPost: postData => dispatch(deleteForumPost(postData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteModal);