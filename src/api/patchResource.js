import axios from "axios";
import { TOKEN } from "../utilities/constants";

function patchResource(url, params, handleResponse) {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
  };

  axios
    .patch(url, params, headers)
    .then(function (response) {
      handleResponse({ resource: response });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      handleResponse({ resource: null, message: error.message });
    });
}

export default patchResource;
