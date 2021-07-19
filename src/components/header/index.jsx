import React, {Component} from 'react';
import { Container } from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { logout } from "./../../actions/authAction";
import { withRouter } from 'react-router-dom';
import './index.css';

class Header extends Component {

	onLogoutClick = (e) => {
		this.props.logout(() => {
			this.props.history.push('/');
		});
	};

	render() {
		const { token } = this.props.auth || {};
		return <div className="HeaderWrapper">
			<Container className="NavbarWrapper">
				<ul>
					<li>
						<Link to={'/'} className="nav-link">Home</Link>
					</li>
					<li>
						<Link to={'/about'} className="nav-link">About</Link>
					</li>

					{!token && [
						<li>
							<Link to={'/signup'} className="nav-link">Register</Link>
						</li>,
						<li>
							<Link to={'/signin'} className="nav-link">Login</Link>
						</li>,
					]}
					{token && [
						<li>
							<Link to={'/list'} className="nav-link">List</Link>
						</li>,
						<li>
						<button onClick={this.onLogoutClick}>Logout</button>
						</li>,
					]}
				</ul>
			</Container>
		</div>;
	}


}

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default withRouter(
	connect(mapStateToProps, {
		logout,
	})(Header)
);