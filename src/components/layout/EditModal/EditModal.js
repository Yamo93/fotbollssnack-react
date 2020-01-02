import React, { Component } from 'react';

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { connect } from "react-redux";

import { updateForumPost } from '../../../actions/forumActions';

class EditModal extends Component {
    render() {
        return (
            <Modal show={this.props.isEditModalOpen} onHide={this.props.closeEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Uppdatera inlägg</Modal.Title>
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
                            value={this.props.auth.user.name ? this.props.auth.user.name.split(' ')[0] : ''}
                        />
                    </InputGroup>
                    <InputGroup style={{ marginBottom: '1em' }}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Inlägg</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="With textarea" value={this.props.updatedText} onChange={e => this.props.updatedTextChangeHandler(e.target.value)} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeEditModal}>
                        Avbryt
                </Button>
                    <Button variant="primary" onClick={this.props.updatePost}>
                        Redigera
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
        onUpdateForumPost: postData => dispatch(updateForumPost(postData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditModal);