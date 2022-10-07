import React, { useState, useEffect } from 'react'

import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';


function App() {


	const [products, setProducts] = useState([])

	const [category, setCategory] = useState('')

	const fetchProductByCategory = async (category) => {
		const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
		const data = await response.json();
		setProducts(data);
		console.log(data);
	}

	useEffect(() => {
		fetchProductByCategory();
	},[category]);

	return (
		<div className="App">

			<Cart/>

			<Header />

			<div onClick={() => {setCategory('jewelery')}}>Jewelery</div>
			<div onClick={() => {setCategory('men\'s clothing')}}>Men's Clothing</div>
			<div onClick={() => {setCategory('women\'s clothing')}}>Women's Clothing</div>
			<div onClick={() => {setCategory('electronics')}}>Electronics</div>

			{products?.map((product) => {
				return (product.title);
			})}

			<main>
				<div>
					<Sidebar />
				</div>
				<div>
					<ProductDetails />
					<ProductList />
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default App;
