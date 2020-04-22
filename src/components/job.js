import React from "react";
import "./styles/job.css";

const job = (props) => {
	const {
		id,
		company,
		logo,
		featured,
		position,
		role,
		level,
		postedAt,
		contract,
		location,
		languages,
		tools,
	} = props.dataJob;
	const isNew = props.dataJob.new;

	const img = "manage.svg";

	return (
		<div className={`job-container ${featured ? "cyan-border" : ""}`} key={id}>
			<img
				className="job-logo"
				src={require(`../static/images/${logo}`)}
				alt="Logo"
			/>
			<div className="job-info">
				<div className="job-info__header">
					<h3>{company}</h3>
					{isNew && <span className="new">NEW!</span>}
					{featured && <span className="featured">FEATURED</span>}
				</div>
				<h2 className="job-title">{position}</h2>
				<div className="job-details">
					<span>{postedAt}</span>
					<span>{contract}</span>
					<span>{location}</span>
				</div>
			</div>
			<ul className="job-languages-list">
				<li onClick={props.onClickSkill}>
					<button className="language" name="role" value={role}>
						{role}
					</button>
				</li>
				<li onClick={props.onClickSkill}>
					<button className="language" name="level" value={level}>
						{level}
					</button>
				</li>
				{tools &&
					tools.map((tool) => {
						return (
							<li key={id + tool} onClick={props.onClickSkill}>
								<button className="language" name="tool" value={tool}>
									{tool}
								</button>
							</li>
						);
					})}
				{languages &&
					languages.map((language) => {
						return (
							<li key={id + language} onClick={props.onClickSkill}>
								<button className="language" name="language" value={language}>
									{language}
								</button>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default job;
