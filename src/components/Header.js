import React, { useState } from 'react';
import logo from '../images/may_logo.jpg'
import dumb from '../images/may_dumb_sm.jpg'
import Navbar from './Navbar';
import styled from 'styled-components';

const HeaderSection = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 5px solid #000;
`

export default function Header(props) {

	const [logoImage, setLogoImage] = useState(logo)

	function headerSwap() {
		if (logoImage === logo) {
			setLogoImage(dumb);
		} else {
			setLogoImage(logo);
		}
	}

	return (
		<HeaderSection>
			<div>
				<div className='logoContainer'>
					<img
						className='logo'
						src={logoImage}
						alt="May"
						onClick={headerSwap}
					/>
				</div>
				<div className='headingContainer'>
					<h1 className='pageHeading'>May's Miscellaneous Materials</h1>
					<span className='subHeading'>"May has wares if you have coin"</span>
				</div>
			</div>
			<div>
				<Navbar />
			</div>
		</HeaderSection>
	)

}