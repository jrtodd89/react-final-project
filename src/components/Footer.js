import styled from "styled-components"

	const PageFooter = styled.footer`
		display: flex;
		position:sticky;
		align-items: center;
		justify-content: center;
		padding: 24px;
		background-color: #000;
		color: #fff;
	`

export default function Footer(props) {


	return (
		<PageFooter>
			<p>This is a fake footer because I ran out of ideas.</p>
		</PageFooter>
	)

}