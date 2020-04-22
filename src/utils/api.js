const BASE_URL =
	"https://my-json-server.typicode.com/jrdiazr/PlatziMaster-Challenge1-coach/db";

class API {
	async getJobList() {
		const result = await fetch(BASE_URL);
		const { data } = await result.json();
		return data;
	}
	async getJobListQuery(query, list) {
		const data = list || (await this.getJobList());

		if (query.length === 0) return await this.getJobList();

		let dataRole = data.filter((job) => query["role"].includes(job.role));
		dataRole = dataRole.length > 0 ? dataRole : data;
		console.log("dr", dataRole);

		let dataLevel = dataRole.filter((job) =>
			query["level"].includes(job.level)
		);
		dataLevel = dataLevel.length > 0 ? dataLevel : dataRole;
		console.log("dl", dataLevel);

		let dataLanguages = dataLevel.filter(
			(job) =>
				job.languages &&
				query["language"].every((lan) => job.languages.indexOf(lan) > -1)
		);
		dataLanguages =
			query["language"].length > 0 && dataLanguages.length > 0
				? dataLanguages
				: dataLevel;
		console.log("dl", dataLanguages);

		let dataTools = dataLanguages.filter(
			(job) =>
				job.tools &&
				query["tool"].length > 0 &&
				query["tool"].every((tool) => job.tools.indexOf(tool) > -1)
		);
		dataTools = dataTools.length > 0 ? dataTools : dataLanguages;
		console.log("dt", dataTools);

		return [...dataTools];
	}
}

export default new API();
