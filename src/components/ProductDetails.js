import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { CartContext } from '../components/CartContext';

const Img = styled.img`
	padding:32px;
	max-width:250px;
`

const DetailsContainer = styled.div`
	margin-top:32px;
`

const Btn = styled.button`
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

export default function ProductDetails(props) {

	const cart = useContext(CartContext);

	const [product, setProduct] = useState()

	let { id } = useParams();

	const loadProduct = async () => {
		const response = await fetch(`https://fakestoreapi.com/products/${id.substring(1)}`);
		const data = await response.json();
		setProduct(data);
	}

	useEffect(() => {
		loadProduct();
		setQuantity('1')
	}, []);

	const [quantity, setQuantity] = useState(0);

	function handleSelectChange(e) {
		setQuantity(e.target.value)
	}


	function handleSubmit(e, productID) {
		e.preventDefault();
	}


	if (product) {

		return (
			<div className='productContainer'>
				<form onSubmit={(e) => { handleSubmit(e, product.id) }}>
					<div className='product'>
						<Img className='productImage' src={product.image} alt={product.title} />
						<DetailsContainer>
							<h2 className='productTitle'>{product.title}</h2>
							<h3>${product.price}</h3>
							<h3>{product.rating.rate} / 5</h3>
							<h3>Category: {product.category}</h3>
							<div>
								Quantity:
								<select defaultValue={'1'} onChange={handleSelectChange}>
									<option value='1'>1</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
									<option value='5'>5</option>
								</select>
							</div>
							<p>{product.description}</p>
							<div>
								<Btn type='submit' onClick={() => { cart.addToCart(quantity, product) }}>Add to cart</Btn>
							</div>
						</DetailsContainer>
					</div>
				</form>
			</div>
		)

	}
}