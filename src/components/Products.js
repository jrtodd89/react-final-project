import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Flex = styled.div`
	display:flex;
	align-items: center;
	justify-content: space-around;
`

const Product = styled.div`
	border-bottom: 1px solid #000;
`

const ImgContainer = styled.div`
	max-width: 200px;
	width:100%;
`

const Img = styled.img`
	max-width: 150px;
	padding:32px;
    position: relative;
    margin: 0 auto;
    display: block;
`

const ProductLink = styled(Link)`
	color:#000;
	text-decoration:none;
`

const SearchInput = styled.input`
	margin:12px;
	padding:12px;
	width:100%;
	max-width: 800px;
`

const Select = styled.select`
	padding:12px;
	margin: 12px;
`

const SearchBtn = styled.button`
	border-radius: 0;
	border 2px solid #000;
	background-color: #000;
	color: #fff;
	cursor: pointer;
	padding: 12px;
	&:hover, &:focus {
		background-color: #fff;
		color: #000;
	}
`

export default function ProductList(props) {

	const [fetchResult, setFetchResult] = useState([])
	const [products, setProducts] = useState([])
	const [sort, setSort] = useState([])
	const [type, setType] = useState([])
	const [sidebarSearch, setSidebarSearch] = useState('');

	const loadProducts = async () => {
		const response = await fetch(`https://fakestoreapi.com/products`);
		const data = await response.json();
		setFetchResult(data);
		setProducts(data);
		console.log(data)
	}

	useEffect(() => {
		loadProducts();
	}, []);

	const filteredProducts = products.filter((product) => {
		return product.title.toLowerCase().includes(sidebarSearch.toLowerCase());
	})

	const typeFiltered = products.filter((product) => {
		return product.category === type;
	})
	


	
	
	useEffect(() => {
		if(sort === 'pricelth') {
			const lthSort = fetchResult.slice().sort(function(a,b){return a.price - b.price})
			setProducts(lthSort);
		} else if(sort === 'pricehtl') {
			const htlSort = fetchResult.slice().sort(function(a,b){return b.price - a.price})
			setProducts(htlSort);
		} else {
			const idSort = fetchResult.slice().sort(function(a,b){return a.id - b.id})
			setProducts(idSort);
		}
	}, [sort]);

	useEffect(() => {
		if(type !== 'all') {
			setProducts(typeFiltered)
		} else {
			setProducts(fetchResult);
		}
	}, [type]);

	function handleChange(e) {
		setSidebarSearch(e.target.value);
	}

	function handleSelectChange(e) {
		setProducts(fetchResult);
		setType(e.target.value)
	}

	function handleSortChange(e) {
		// setProducts(fetchResult);
		setSort(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
	}

	const productList = (
		<>
			<div className='search'>
				<form
					onSubmit={handleSubmit}
				>
					<Flex>
						<SearchInput
							type="text"
							placeholder="Fjallraven"
							value={sidebarSearch}
							onChange={handleChange}
						/>
						<Select defaultValue={'all'} onChange={handleSelectChange}>
							<option value='all'>All</option>
							<option value="men's clothing">Men's Clothing</option>
							<option value="women's clothing">Women's Clothing</option>
							<option value="jewelery">Jewelery</option>
							<option value="electronics">Electronics</option>
						</Select>
						<Select defaultValue={'id'} onChange={handleSortChange}>
							<option value='id'>ID</option>
							<option value="pricelth">Price (Low to High)</option>
							<option value="pricehtl">Price (High to Low)</option>
						</Select>
						<SearchBtn
							type="submit"
							className='btn'
						>
							Search
						</SearchBtn>
					</Flex>
				</form>
			</div>
			<div className='productContainer'>
				{!filteredProducts ?
				products?.map((product) => (
					<Product className='product' key={nanoid()} id={product.id}>
						<ImgContainer>
							<Img className='productImage' src={product.image} alt={product.title} />
						</ImgContainer>
						<div className='productInfo'>
							<ProductLink to={{ pathname: `/products/:${product.id}` }}>
								<h2 className='productTitle'>{product.title}</h2>
							</ProductLink>
							<h3>{product.rating.rate} / 5</h3>
							<h3>${product.price}</h3>
						</div>
					</Product>
				))
				:
				filteredProducts?.map((product) => (
					<Product className='product' key={nanoid()} id={product.id}>
						<ImgContainer>
							<Img className='productImage' src={product.image} alt={product.title} />
						</ImgContainer>
						<div className='productInfo'>
							<ProductLink to={{ pathname: `/products/:${product.id}` }}>
								<h2 className='productTitle'>{product.title}</h2>
							</ProductLink>
							<h3>{product.rating.rate} / 5</h3>
							<h3>${product.price}</h3>
						</div>
					</Product>
				))
			}
			</div>
		</>
	)
	return (productList);

}