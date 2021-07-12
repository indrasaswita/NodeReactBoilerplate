import React, { Component } from "react";
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addUser } from "../../actions/userAction";
import PropTypes from 'prop-types';


class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        cpassword: '',
        location: '',
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            location: this.state.location,
        };

        this.props.addUser(newUser);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return <div>
            <h2>Register</h2>
            <Form
                onSubmit={this.onSubmit}
            >
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Input your name here"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Input password (min. 6 chars)"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="cpassword">Re-type Password</Label>
                    <Input
                        type="password"
                        name="cpassword"
                        id="cpassword"
                        placeholder="Re-type your password"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <hr />
                <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Input your name here"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Where are you from?"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <Button
                    color="dark"
                    onClick={this.onSubmit}
                >OK</Button>
            </Form>
        </div>;
    }
}

Register.propTypes = {
    addUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    item: state.item,
});


export default connect(mapStateToProps, {addUser})(Register);