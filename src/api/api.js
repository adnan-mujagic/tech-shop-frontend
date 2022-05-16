const getAccessToken = () =>
  localStorage.getItem("session") !== null
    ? JSON.parse(localStorage.getItem("session")).accessToken
    : "";

const Api = {
  async service(urlSuffix, body, method) {
    const url = "https://tech-shop-se-project.herokuapp.com/" + urlSuffix;
    console.log("Fetching from this url: " + url);
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authentication: getAccessToken(),
        },
      };
      if (body) {
        options["body"] = JSON.stringify(body);
      }
      const response = await fetch(url, options);
      const results = await response.json();
      return results;
    } catch (error) {
      console.log(error);
    }
  },

  async get(urlSuffix) {
    return await this.service(urlSuffix, null, "GET");
  },

  async post(urlSuffix, body) {
    return await this.service(urlSuffix, body, "POST");
  },

  async delete(urlSuffix) {
    return await this.service(urlSuffix, "DELETE");
  },

  async put(urlSuffix, body) {
    return await this.service(urlSuffix, body, "PUT");
  },
};

export default Api;
