import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'

export default function ProductDetails(props) {

	const [product, setProduct] = useState()

	const loadProduct = async () => {
		const response = await fetch(`https://fakestoreapi.com/products/1`);
		const data = await response.json();
		setProduct(data);
		console.log(data);
	}

	useEffect(() => {
		loadProduct();
	}, []);

	const [quantity, setQuantity] = useState(0);

	function handleSelectChange(e) {
		setQuantity(e.target.value)
	}

	function handleSubmit(e, productID) {
		e.preventDefault();
		const parsedQuantity = parseInt(quantity);
		console.log(productID, parsedQuantity)
	}


	if (product) {

		return (
			<div className='productContainer'>
				<form onSubmit={(e) => {handleSubmit(e, product.id)}}>
					<div className='product'>
						<img className='productImage' src={product.image} alt={product.title} />
						<h2 className='productTitle'>{product.title}</h2>
						<h3>${product.price}</h3>
						<h3>{product.rating.rate} / 5</h3>
						<div>
							Quantity:
							<select defaultValue={1} onChange={handleSelectChange}>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
							</select>
						</div>
					</div>
					<div>
						<button type='submit'>Add to cart</button>
					</div>
				</form>
			</div>
		)

	}
}