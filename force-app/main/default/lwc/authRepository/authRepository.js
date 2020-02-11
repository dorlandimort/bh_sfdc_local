/**
 * Created by Giovanni Martinez - 10-03-2019
 **/

import Repository from "c/repository";
import ErrorHandler from "c/errorHandler";

export default {
  async login(payload) {
    try {
      const { username, password } = payload;
      const resource = "/login";
      const formData = new FormData();
      formData.set("username", username);
      formData.set("password", password);
      const { data } = await Repository.post(`${resource}`, formData);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async logout() {
    try {
      const resource = "/logout";
      const { data } = await Repository.post(`${resource}`);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  }
};
