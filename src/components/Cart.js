import React, {useState, useEffect} from 'react'

function Cart() {

	const fetchCart = () => {fetch('https://fakestoreapi.com/carts')
	.then(res=>res.json())
	.then(json=>console.log(json))
}

useEffect(() => {
  return () => {
	fetchCart();
  }
}, [])


  return (
	<div>Cart</div>
  )
}

export default Cart