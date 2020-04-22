import React, { Component } from "react";
import "./styles/home.css";
import API from "../utils/api";
import JobList from "../components/jobList";
import Error from "../components/error";
import Loading from "../components/loading";
import Filter from "../components/filter";

class Home extends Component {
	state = {
		jobList: [],
		loading: true,
		error: null,
		filters: {
			role: [],
			level: [],
			tool: [],
			language: [],
		},
		enableFilter: false,
	};
	componentDidMount() {
		this.getData();
	}
	async getData(query, list) {
		this.setState({
			loading: true,
			error: null,
		});
		try {
			const jobList = !query
				? await API.getJobList()
				: await API.getJobListQuery(query, list);
			this.setState({
				jobList: jobList,
				loading: false,
			});
		} catch (e) {
			this.setState({
				loading: false,
				error: e,
			});
		}
	}
	handleClickSkill = (event) => {
		const skill = event.target.value;
		const filters = this.state.filters;
		console.log("filters", filters);
		if (filters[event.target.name].includes(skill)) return;
		filters[event.target.name].push(skill);
		this.setState({
			filters: filters,
			jobList: this.getData(filters, this.state.jobList),
			enableFilter: true,
		});
	};
	handleClickRemove = (event) => {
		const skill = event.target.value;
		const filters = this.state.filters;
		filters[event.target.name] =
			filters[event.target.name].filter(
				(filter) => filter.toString() !== skill.toString()
			) || [];

		if (filters[event.target.name].includes(skill)) return;
		this.setState({
			filters: filters,
			jobList: this.getData(filters),
			enableFilter:
				filters["role"].length > 0 ||
				filters["level"].length > 0 ||
				filters["language"].length > 0 ||
				filters["tool"].length > 0,
		});
	};
	handleClear = (event) => {
		this.setState({
			filters: {
				role: [],
				level: [],
				tool: [],
				language: [],
			},
			enableFilter: false,
		});
		this.getData();
	};
	render() {
		const { jobList, loading, error, filters, enableFilter } = this.state;
		if (loading) return <Loading></Loading>;
		if (error) return <Error error={error}></Error>;
		return (
			<>
				{enableFilter && (
					<Filter
						filters={filters}
						onClear={this.handleClear}
						onRemoveSkill={this.handleClickRemove}></Filter>
				)}
				<JobList
					jobList={jobList}
					onClickSkill={this.handleClickSkill}></JobList>
			</>
		);
	}
}

export default Home;
