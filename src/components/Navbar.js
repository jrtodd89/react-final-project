import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { CartContext } from '../components/CartContext';

const Nav = styled.nav`
	display:flex;
	width: 500px;
	justify-content: space-around;
`

const NavbarLink = styled(Link)`
	color:#000;
	text-decoration:none;
	font-weight:bold;
	padding: 12px 24px;
	border: 2px solid #fff;
	&:hover,
	&:focus{
		border: 2px solid #000;
		background: #000;
		color: #fff;
}
`

function Navbar() {

	const cart = useContext(CartContext);
	
	return (

		<Nav className='navbar'>
			<NavbarLink to="/">Home</NavbarLink>
			<NavbarLink to="/products">Products</NavbarLink>
			<NavbarLink to="/cart">Cart</NavbarLink>
			<NavbarLink to="/checkout">Checkout ({cart.cart.length})</NavbarLink>
		</Nav>
	)
}

export default Navbar