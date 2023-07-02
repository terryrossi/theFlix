import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Row, Container } from 'react-bootstrap';
// import { MainView } from '../main-view/main-view';

export const MyHeader = ({ onLogout }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');

	// Logout
	const handleLogout = (user) => {
		onLogout();
	};

	return (
		<Row>
			<Navbar
				bg='dark'
				variant='dark'
				expand='lg'
				fixed='top'>
				{/* <Container> */}
				<Navbar.Brand
					href='#'
					style={{ color: 'red', padding: '0.5rem' }}>
					TheFLIX
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbar-nav' />
				<Navbar.Collapse id='navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link href='#'>Home</Nav.Link>
						<Nav.Link href='#'>TV Shows</Nav.Link>
						<Nav.Link href='#'>Movies</Nav.Link>
						<Nav.Link href='#'>My List</Nav.Link>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				{/* </Container> */}
			</Navbar>
		</Row>
	);
};

// export default MyHeader;
