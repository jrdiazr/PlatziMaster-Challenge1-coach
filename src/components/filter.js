import React from "react";
import "./styles/filter.css";

const filter = (props) => {
	const { filters } = props;
	const keys = Object.keys(filters);
	console.log(keys);

	return (
		<div className="filter-layout">
			<div className="filter-container">
				<div className="filter-list">
					{keys.map((key) => {
						return filters[key].map((filter) => {
							console.log("Fil", filter);
							return (
								<div className="filter-item" key={filter}>
									<span className="filter-item__text">{filter}</span>
									<button
										name={key}
										className="filter-item__close"
										onClick={props.onRemoveSkill}
										value={filter}>
										X
									</button>
								</div>
							);
						});
					})}
				</div>
				<span className="clear" onClick={props.onClear}>
					Clear
				</span>
			</div>
		</div>
	);
};

export default filter;
