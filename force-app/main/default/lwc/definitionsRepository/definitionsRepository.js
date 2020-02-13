import Repository from "c/repository";
import Definition from "c/definition";
import ErrorHandler from "c/errorHandler";
import ModelPage from "c/modelPage";

const resource = "/definitions";

export default {
  async get() {
    try {
      const data = await Repository.get(`${resource}`);
      return data.map(definitionData => new Definition(definitionData));
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async getPaged(pagedData) {
    try {
      const data = await Repository.get(`${resource}/paged`, { ...pagedData });
      return new ModelPage(data, Definition);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async getDefinition(id) {
    try {
      const data = await Repository.get(`${resource}/${id}`);
      return new Definition(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async createDefinition(payload) {
    try {
      const data = await Repository.post(`${resource}`, { ...payload });
      return new Definition(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async updateDefinition(id, payload) {
    try {
      const definitionData = await Repository.put(`${resource}/${id}`, {
        ...payload
      });
      return new Definition(definitionData);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async deleteDefinition(id) {
    try {
      await Repository.delete(`${resource}/${id}`);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  }
};
