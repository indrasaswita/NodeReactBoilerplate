import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import { getUsers, deleteUser } from "./../../actions/usersAction";
import AddModal from "./addModal";
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class List extends Component {

    componentDidMount() {
        const { token, user } = this.props.auth;
        if(user && token) {
            this.props.getUsers();
        } else {
            cookies.remove('auth_token');
            cookies.remove('auth_user');

            this.props.history.push('/signin');
        }
    }

    onDeleteClick = (id) => {
        this.props.deleteUser(id);
    }

    render() {
        const users = this.props.users || {};
        return (
            <Container>
                {/* <AddModal></AddModal> */}

                <ListGroup>
                    <TransitionGroup className="users-list">
                        {users.loading ? "is loading": "not loading"}
                        {users
                            && users.users
                            && users.users.map(({_id, name, email, password, location}) => (
                            <CSSTransition
                              key={_id}
                              timeout={500}
                              classNames="fade">
                                <ListGroupItem>
                                    <div className="Action">
                                        <Button
                                            color="danger"
                                            size="sm"
                                            className="BtnDelete"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >X</Button>
                                    </div>
                                    <div className="">
                                        {name}<br/>
                                        {email}<br/>
                                        {location}
                                    </div>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

List.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {
    getUsers,
    deleteUser,
})(List);