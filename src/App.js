import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';
import { CartContext } from './components/CartContext';

const Main = styled.main`
	position:relative;
	margin:0 auto;
	max-width:960px;
	min-height: 72.7vh;
`
function App() {

	const [cart, setCart] = useState([])

	return (
		<div className="App">

			<CartContext.Provider value={{
				cart,
				addToCart: (quantity, product) => {
					const parsedQuantity = parseInt(quantity);
					const newProduct = { product: product, quantity: parsedQuantity };
					setCart([...cart, newProduct])
					console.log(cart);
				},
				updateCart: (newData) => {
					return setCart([...cart, newData]);
				},
				updateQuantity: (productID, newQuantity) => {
					const updatedQuantity = cart?.map((cartItem) => {
						const parsedQuantity = parseInt(newQuantity);
						if (cartItem.product.id === productID) {
							cartItem.quantity = parsedQuantity;
						}
						setCart([...cart]);
					})

				},
				removeFromCart: (productID) => {
					const filteredCart = cart?.filter((cartItem) => {
						return cartItem.product.id !== productID;
					})
					setCart(filteredCart);
				},
				emptyCart: () => {
					setCart([]);
				}
			}}>
				<Header />

				<Main>

					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/products' element={<Products />} />
						<Route path='/products/:id' exact strict element={<ProductDetails />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/checkout' element={<Checkout />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</Main>

				<Footer />
			</CartContext.Provider>
		</div>
	);
}

export default App;
