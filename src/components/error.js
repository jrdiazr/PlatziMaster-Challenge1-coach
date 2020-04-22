import React from "react";
import "./styles/error.css";

const error = (props) => {
	const { error } = props;
	return (
		<div className="error-container">
			<div className="error-info">
				<h1>Opps!, ocurrio un error</h1>
				<p>{error.message}</p>
			</div>
		</div>
	);
};

export default error;
