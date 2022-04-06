import axios from "axios";

const JOBS_URL = "/jobs/";

const registerJob = async (jobData) => {
  const response = await axios.post(JOBS_URL + "register", jobData);

  return response.data;
};

const getAllJobs = async () => {
  const response = await axios.get(JOBS_URL + getAllJobs);
  return response.data;
};

const jobsService = {
  registerJob,
  getAllJobs,
};

export default jobsService;
