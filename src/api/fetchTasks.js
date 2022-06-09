import axios from "axios";
import { TOKEN } from "../utilities/constants";
const url = "https://mobal-challenge.herokuapp.com/tasks";
const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${TOKEN}`,
  },
};

const getEndpoints = (start, total) => {
  const endpoints = [];
  for (let i = 0; i < total; i += 1) {
    endpoints.push(`${url}/?page=${i + start}`);
  }

  return endpoints;
};

async function fetctAll(response, handleResponse) {
  const totalTasks = response.data.count;
  const pageSize = response.data.results.length;
  const totalPageCount = Math.ceil(totalTasks / pageSize);

  const endpoints = getEndpoints(2, totalPageCount - 1);

  let tasks = response.data.results;

  Promise.allSettled(
    endpoints.map((endpoint) => axios.get(endpoint, headers))
  ).then((all) => {
    all.forEach((res) => {
      if (res.status === "fulfilled") {
        const results = res.value.data.results;
        tasks = tasks.concat(results);
      }
    });
    handleResponse(tasks);
  });
}

async function fetchTasks(handleResponse) {
  axios
    .get(url, headers)
    .then(function (response) {
      fetctAll(response, handleResponse);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

export default fetchTasks;
