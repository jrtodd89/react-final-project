import React, { useState, useEffect } from 'react';

export default function Sidebar(props) {

	const [sidebarSearch, setSidebarSearch] = useState('');
	const [type, setType] = useState('')

	function handleSubmit(e) {
		e.preventDefault();
		console.log(e);
	}

	function handleChange(e) {
	setSidebarSearch(e.target.value);
	}

	function handleSelectChange(e) {
		setType(e.target.value)
	}

	return (
		<div className='sidebar'>
			<form
				onSubmit={handleSubmit}
			>
			<input
				type="text"
				placeholder="Men's clothing"
				value={sidebarSearch}
				onChange={handleChange}
			/>
			{/* <select defaultValue={''} onChange={handleSelectChange}>
				<option>Men's Clothing</option>
				<option>Women's Clothing</option>
				<option>Jewelery</option>
				<option>Electronics</option>
			</select> */}
			<button
				type="submit"
				className='btn'
			>
				Search
			</button>
			</form>
		</div>
	)

}