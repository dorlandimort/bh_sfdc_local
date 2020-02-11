/**
 * Created by Giovanni Martinez - 09-16-2019
 **/

import Repository from "c/repository";
import Channel from "c/channel";
import ErrorHandler from "c/errorHandler";

const resource = "/messaging";

export default {
  async get() {
    try {
      const { data } = await Repository.get(`${resource}/types`);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },
  async getTypes() {
    try {
      const { data } = await Repository.get(`${resource}/types`);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },
  async getChannel(id) {
    try {
      const { data } = await Repository.get(`${resource}/${id}`);
      return new Channel(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async createChannel(payload) {
    try {
      const { data } = await Repository.post(`${resource}`, payload);
      return new Channel(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async updateChannel(id, payload) {
    try {
      const channelData = await Repository.put(`${resource}/${id}`, payload);
      return new Channel(channelData);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async deleteChannel(id) {
    try {
      await Repository.delete(`${resource}/${id}`);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  }
};
