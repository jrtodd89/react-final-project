import { Link } from "react-router-dom";

function NotFound() {
  return (
	<div>
		<p>Ooops, no page here!</p>
		<p>Return to <Link to='/'>HOME</Link></p>
	</div>
  )
}

export default NotFound