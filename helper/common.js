module.exports = {
  response: (responseMessage, responseCode, response) => {
    return {
      responseMessage,
      responseCode,
      responseStatus: responseCode ? "Success" : "Error",
      showMessage: responseCode ? true : false,
      response,
    };
  },
};
