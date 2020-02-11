import { BH_API_BASE_URL, BH_API_USERNAME, BH_API_PASSWORD } from "c/constants";

const baseHeaders = {
  Authorization: "Basic " + btoa(`${BH_API_USERNAME}:${BH_API_PASSWORD}`),
  Accept: "Application/json",
  "Content-Type": "application/json;charset=UTF-8"
};

export default {
  async get(uri = "", params = {}, headers = {}) {
    try {
      const url = new URL(`${BH_API_BASE_URL}${uri}`);
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );
      let data = await fetch(url, {
        method: "GET",
        headers: { ...baseHeaders, ...headers },
        credentials: "include",
        params
      });
      if (data.status === 200) return data.json();
      throw data.status;
    } catch (e) {
      throw e;
    }
  },

  async post(url = "", body = {}, headers = {}) {
    try {
      let data = await fetch(`${BH_API_BASE_URL}${url}`, {
        method: "POST",
        headers: { ...headers, ...baseHeaders },
        credentials: "include",
        body: JSON.stringify(body)
      });
      return data;
    } catch (e) {
      throw e;
    }
  },

  async put(url = "", body = {}, headers = {}) {
    let data = await fetch(`${BH_API_BASE_URL}${url}`, {
      method: "PUT",
      headers: { ...headers, ...baseHeaders },
      credentials: "include",
      body: JSON.stringify(body)
    });
    return data;
  },

  async delete(url = "", headers = {}) {
    let data = await fetch(`${BH_API_BASE_URL}${url}`, {
      method: 'delete',
      headers: { ...headers, ...baseHeaders }
    });
    return data;
  }
};
