import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';



export default function ProductList(props) {

	const [products, setProducts] = useState([])
	const [product, setProduct] = useState([])

	const loadProducts = async () => {
		const response = await fetch(`https://fakestoreapi.com/products`);
		const data = await response.json();
		setProducts(data);
		console.log(data);
	}

	const loadProduct = async (productID) => {
		const response = await fetch(`https://fakestoreapi.com/products/${productID}`);
		const data = await response.json();
		setProduct(data)
		console.log(data)
	}

	useEffect(() => {
		loadProducts();
	}, []);

	const productList = (
		<div className='productContainer'>
			{products.map((product) => (
				<div key={nanoid()} className='product' id={product.id} onClick={() => {loadProduct(product.id)}}>
					<img className='productImage' src={product.image} alt={product.title} />
					<div className='productInfo'>
						<h2 className='productTitle'>{product.title}</h2>
						<h3>{product.rating.rate} / 5</h3>
						<h3>${product.price}</h3>
					</div>
				</div>
			))}
		</div>
	)
	return (productList);

}