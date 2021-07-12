import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import { getUsers, deleteUser } from "./../../actions/userAction";
import AddModal from "./addModal";
import PropTypes from 'prop-types';

class List extends Component {

    componentDidMount() {
        this.props.getUsers();
    }

    onDeleteClick = (id) => {
        console.log("Delete", id);
        this.props.deleteUser(id);
    }

    render() {
        const { users } = this.props.item || {};
        return (
            <Container>
                <AddModal></AddModal>

                <ListGroup>
                    <TransitionGroup className="users-list">
                        {users && users.map(({_id, name, email, password, location}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
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
                                        {name},{email},{password},{location}
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
    item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    item: state.item,
});
export default connect(mapStateToProps, {
    getUsers,
    deleteUser,
})(List);