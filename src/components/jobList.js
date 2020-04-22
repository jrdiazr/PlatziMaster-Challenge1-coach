import React from "react";
import "./styles/jobList.css";
import Job from "./job";

const jobList = (props) => {
	const jobList = props.jobList || [];

	return (
		<div className="job-list">
			{jobList.map((job) => {
				return (
					<Job
						key={job.id}
						dataJob={job}
						onClickSkill={props.onClickSkill}></Job>
				);
			})}
		</div>
	);
};

export default jobList;
