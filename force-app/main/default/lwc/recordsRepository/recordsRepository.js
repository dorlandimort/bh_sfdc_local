/**
 * Created by Giovanni Martinez - 09-12-2019
 **/

import Repository from "c/repository";
import Record from "c/record";
import ErrorHandler from "c/errorHandler";
import ModelPage from "c/modelPage";

const resource = "/records/failed";

export default {
  async get() {
    try {
      const data = await Repository.get(`${resource}`);
      return data.map(recordData => new Record(recordData));
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async getPaged(pagedData) {
    const resource = "/records";
    try {
      const data = await Repository.get(`${resource}/paged`, { ...pagedData });
      return new ModelPage(data, Record);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async getRecord(id) {
    try {
      const data = await Repository.get(`${resource}/${id}`);
      return new Record(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async updateRecord(id, payload) {
    try {
      const data = await Repository.put(`${resource}/${id}`, { ...payload });
      return new Record(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async deleteRecord(id) {
    try {
      const data = await Repository.delete(`${resource}/${id}`);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async submitRecord(id) {
    try {
      const data = await Repository.get(`${resource}/${id}`);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  }
};
