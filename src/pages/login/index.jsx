import React, {Component} from "react";
import {
	Button,
	Input,
	Form,
	FormGroup,
	Label, Container,
} from "reactstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from "../../actions/authAction";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends Component {

	state = {
		username: '',
		password: '',
	};

	componentDidMount() {
		const {token, user} = this.props.auth || {};
		if (token && user) {
			console.log("LOGGED IN, send to home");
			this.props.history.push('/');
		} else {
			cookies.remove("auth_token");
			cookies.remove("auth_user");
		}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const auth = {
			username: this.state.username,
			password: this.state.password,
		};

		this.props.login(auth, () => {
			this.props.history.push("/");
		});
	};

	render() {
		const {token} = this.props.auth || {};
		return <Container className="LoginWrapper">
			<h2>Login</h2>
			<Form
				onSubmit={this.onSubmit}
			>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input
						type="text"
						name="username"
						id="username"
						placeholder="Input registered email"
						onChange={this.onChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="Type your password"
						onChange={this.onChange}
					/>
				</FormGroup>
				<Button
					color="primary"
					onClick={this.onSubmit}
				>Submit</Button>
			</Form>
		</Container>;
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	login,
})(Login);