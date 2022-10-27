import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { nanoid } from 'nanoid';

import { CartContext } from './CartContext';

const Flex = styled.div`
	display:flex;
	justify-content: space-between;
`

const CartContainer = styled.div`
	padding: 24px;
`

const Form = styled.form`
	margin: 24px 0;
	width: 300px;
	position:relative;
	right:0;
	
`

const Label = styled.label`
	display:block;
`

const FormInput = styled.input`
	padding: 12px;
	width: 300px;
	font-size: 24px;
`

const SubmitBtn = styled.button`
	border-radius:0;
	padding:16px 24px;
	background-color:#000;
	color:#fff;
	margin: 24px 0;
	border: 2px solid #000;
	cursor: pointer;
	transition: all ease 0.25s;
	&:hover, &:focus {
		background-color: #fff;
		color:#000;
}
`

function Checkout() {

	const cart = useContext(CartContext);

	const [nameInput, setNameInput] = useState('')
	const [shippingInput, setShippingInput] = useState('')
	const [billingInput, setBillingInput] = useState('')
	const [creditCard, setCreditCard] = useState('')



	let cartTotal = [];

	cart.cart?.map((cartItem) => {
		return cartTotal = [...cartTotal, cartItem.product.price * cartItem.quantity]
	})

	const calculateSum = (arr) => {
		return arr.reduce((total, current) => {
			return total + current;
		}, 0);
	}


	function handleNameChange(e) {
		setNameInput(e.target.value);
	}

	function handleShippingChange(e) {
		setShippingInput(e.target.value);
	}

	function handleBillingChange(e) {
		setBillingInput(e.target.value);
	}

	function handleCreditCard(e) {
		setCreditCard(e.target.value);
	}

	let navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		// setName(nameInput);
		console.log(cart);
		cart.emptyCart();
		navigate('../products')
	}

	return (
		<Flex>
			<CartContainer>
				{
					console.log(cart.cart)
				}
				{cart.cart.length === 0 ?
				<h1>Your cart is empty.</h1>
				:
				cart.cart?.map((product) => {
					return (
						<div key={nanoid()}>
							<h2>{product.product.title}</h2>
							<h3>{product.product.price}</h3>
							<h3>Quantity: {product.quantity}</h3>
							<button onClick={() => cart.removeFromCart(product.product.id)}>Remove</button>
						</div>
					)
				})}
			</CartContainer>
			<Form onSubmit={handleSubmit}>
				<div>
					<Label>Name: </Label>
					<FormInput value={nameInput} onChange={handleNameChange} />
				</div>
				<div>
					<Label>Shipping Address: </Label>
					<FormInput value={shippingInput} onChange={handleShippingChange} />
				</div>
				<div>
					<Label>Billing Address: </Label>
					<FormInput value={billingInput} onChange={handleBillingChange} />
				</div>
				<div>
					<Label>Credit Card: </Label>
					<FormInput value={creditCard} onChange={handleCreditCard} />
				</div>
				<div>
					{
						cartTotal === 0 ?
							<p>Cart is empty</p>
							:
							<h2>Total Cost: $ {calculateSum(cartTotal)}</h2>
					}
				</div>
				<div>
					<SubmitBtn type='submit'>Submit</SubmitBtn>
				</div>
			</Form>
		</Flex>
	)
}

export default Checkout