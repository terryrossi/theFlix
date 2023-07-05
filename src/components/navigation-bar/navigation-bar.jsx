import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { MainView } from '../main-view/main-view';

export const NavigationBar = ({ user, onLogout }) => {
	// const [user, setUser] = useState(null);
	// const [token, setToken] = useState(null);

	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');

	const [expanded, setExpanded] = useState(false);

	// Logout
	const handleLogout = (user) => {
		toggleNavbar();
		onLogout();
	};

	// Toggle NavBar
	const toggleNavbar = () => {
		setExpanded(!expanded);
	};

	return (
		<Row>
			<Navbar
				bg='dark'
				variant='dark'
				expand='lg'
				expanded={expanded}
				fixed='top'>
				{/* <Container> */}
				<Navbar.Brand
					href='#'
					style={{ color: 'red', padding: '0.5rem' }}>
					TheFLIX
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='navbar-nav'
					onClick={toggleNavbar}
				/>
				<Navbar.Collapse id='navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link
							as={Link}
							to='/'
							onClick={toggleNavbar}>
							Home
						</Nav.Link>
						<Nav.Link
							as={Link}
							to='/login'
							onClick={toggleNavbar}>
							Log In
						</Nav.Link>
						<Nav.Link
							as={Link}
							to='/signUp'
							onClick={toggleNavbar}>
							Sign Up
						</Nav.Link>
						<Nav.Link
							as={Link}
							to='/profile'
							onClick={toggleNavbar}>
							Profile
						</Nav.Link>

						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				{/* </Container> */}
			</Navbar>
		</Row>
	);
};

// export default MyHeader;
