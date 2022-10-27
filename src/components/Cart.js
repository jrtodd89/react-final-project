import React, { useState, useContext } from 'react'
import { nanoid } from 'nanoid';
import { CartContext } from './CartContext';
import styled from 'styled-components';


const CartContainer = styled.div`
	padding: 24px;
`

const CartButton = styled.button`
	border-radius:0;
	padding:16px;
	background-color:#000;
	color:#fff;
	margin: 24px 12px;
	border: 2px solid #000;
	cursor: pointer;
	transition: all ease 0.25s;
	&:hover, &:focus {
		background-color: #fff;
		color:#000;
`

function Cart() {
	const cart = useContext(CartContext);

	const [quantity, setQuantity] = useState(1);

	function handleSelectChange(e) {
		setQuantity(e.target.value)
	}


	return (

		<CartContainer>
			{cart.cart.length > 0 ?
				cart.cart?.map((product) => {
					return (
						<div key={nanoid()}>
							<h2>{product.product.title}</h2>
							<h3>{product.product.price}</h3>
							<div>
								Quantity: <strong>{product.quantity} </strong>
								<select defaultValue={quantity} onChange={handleSelectChange}>
									<option value='1'>1</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
									<option value='5'>5</option>
								</select>
								<CartButton onClick={() => cart.updateQuantity(product.product.id, quantity)}>Update Quantity</CartButton>
								<CartButton onClick={() => cart.removeFromCart(product.product.id)}>Remove Item</CartButton>
							</div>
						</div>
					)
				})
				:
				<h1>Your cart is empty.</h1>
			}
		</CartContainer>

	)
}

export default Cart