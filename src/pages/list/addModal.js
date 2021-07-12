import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addUser } from '../../actions/userAction';
import PropTypes from 'prop-types';
import {faCoffee} from "@fortawesome/pro-duotone-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class AddModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
        };

        this.props.addUser(newUser);
        this.toggle();
    }

    render() {
        return <div className="ListAddModal">
            <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
            >Add Item</Button>

            <FontAwesomeIcon icon={faCoffee} /> asdf

            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
            >
                <ModalHeader toggle={this.toggle}>Add To Users</ModalHeader>
                <ModalBody>
                    <Form
                        onSubmit={this.onSubmit}
                    >
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Input name here"
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Input your email"
                                onChange={this.onChange}
                            />
                        </FormGroup>

                        <Button
                            color="dark"
                            onClick={this.onSubmit}
                        >Add User</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>;
    }
}

AddModal.propTypes = {
    addUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    item: state.item,
});

export default connect(mapStateToProps, {addUser})(AddModal);