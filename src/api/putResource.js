import axios from "axios";
import { TOKEN } from "../utilities/constants";

function putResource(url, params, handleResponse) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  };

  axios
    .put(url, params, headers)
    .then(function (response) {
      handleResponse({ resource: response });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      handleResponse({ resource: null, message: error.message, error });
    });
}

export default putResource;
