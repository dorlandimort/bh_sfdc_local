/**
 * Created by Karen Velasco @ 09-17-2019
 **/

import Repository from "c/repository";
import User from "c/user";
import ErrorHandler from "c/errorHandler";
import ModelPage from "c/modelPage";

const resource = "/users";

export default {
  async get() {
    try {
      const data = await Repository.get(`${resource}`);
      return data.map(userData => new User(userData));
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async getPaged(pagedData) {
    try {
      const data = await Repository.get(`${resource}/paged`, { ...pagedData });
      return new ModelPage(data, User);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async createUser(payload) {
    try {
      console.log('PAYLOAD: '+JSON.stringify(payload));
      const data = await Repository.post(`${resource}`, { ...payload });
      //return new User(data);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async getUser(id) {
    try {
      const data = await Repository.get(`${resource}/${id}`);
      return new User(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async updateUser(id, payload) {
    try {
      const data = await Repository.put(`${resource}/${id}`, payload);
      return new User(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async deleteUser(id) {
    try {
      const data = await Repository.delete(`${resource}/${id}`);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async updateUserPassword(id, payload) {
    try {
      const data = await Repository.put(
        `${resource}/${id}/updatepassword?password=${payload.password}`
      );
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  }
};
