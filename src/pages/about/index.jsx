import React, { Component } from 'react';
import { Container } from "reactstrap";
import { connect } from 'react-redux';

class About extends Component {

	render() {
		return <Container className="About">
			This is About Us page.
		</Container>;
	}

};

About.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {

})(About);