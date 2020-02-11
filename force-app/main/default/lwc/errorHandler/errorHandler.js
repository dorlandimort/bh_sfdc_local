export default {
  message(error) {
    if (error.response) {
      if (error.response.data !== "") {
        return (
          error.response.data.message ||
          error.response.data.error ||
          error.response.data
        );
      } else if (error.response.statusText !== "") {
        return error.response.statusText;
      }
      return "There was an error. Sorry.";
    } else if (error.request) {
      return error.request.statusText || "There was an error. Sorry.";
    }
    return error;
  }
};
