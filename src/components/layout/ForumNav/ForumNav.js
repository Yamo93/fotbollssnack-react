import React, { Component } from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { LinkContainer } from "react-router-bootstrap";

import { connect } from "react-redux";

import { setCurrentForum } from '../../../actions/forumActions';

class ForumNav extends Component {
    render() {
        return (
            <Breadcrumb>
                <LinkContainer onClick={forumType => this.props.onSwitchForumNav('premierleague')} to="/premierleague">
                    <Breadcrumb.Item active={this.props.forum.currentForum === 'premierleague' ? true : false}>Premier League</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer onClick={forumType => this.props.onSwitchForumNav('seriea')} to="/seriea">
                    <Breadcrumb.Item active={this.props.forum.currentForum === 'seriea' ? true : false}>
                        Serie A
        </Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer onClick={forumType => this.props.onSwitchForumNav('laliga')} to="/laliga">
                    <Breadcrumb.Item active={this.props.forum.currentForum === 'laliga' ? true : false}>La Liga</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer onClick={forumType => this.props.onSwitchForumNav('allsvenskan')} to="/allsvenskan">
                    <Breadcrumb.Item active={this.props.forum.currentForum === 'allsvenskan' ? true : false}>Allsvenskan</Breadcrumb.Item>
                </LinkContainer>
            </Breadcrumb>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    forum: state.forum
});

const mapDispatchToProps = dispatch => {
    return {
        onSwitchForumNav: forumType => dispatch(setCurrentForum(forumType))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForumNav);