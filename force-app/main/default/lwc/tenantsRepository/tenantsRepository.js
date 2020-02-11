/**
 * Created by Giovanni Martinez - 09-17-2019
 **/
import Tenant from "c/tenant";
import ErrorHandler from "c/errorHandler";
import ModelPage from "c/modelPage";
import Repository from "c/repository";

const resource = "/organizations";

export default {
  async get() {
    try {
      const data = await Repository.get(resource);
      return data.map(tenantData => new Tenant(tenantData));
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async getPaged(pagedData) {
    try {
      const data = await Repository.get(`${resource}/paged`, { ...pagedData });
      return new ModelPage(data, Tenant);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async createTenant(payload) {
    try {
      const data = await Repository.post(`${resource}`, { ...payload });
      return new Tenant(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async getTenant(id) {
    try {
      const data = await Repository.get(`${resource}/${id}`);
      return new Tenant(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async updateTenant(id, payload) {
    try {
      const data = await Repository.put(`${resource}/${id}`, { ...payload });
      return new Tenant(data);
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  async deleteTenant(id) {
    try {
      const data = await Repository.delete(`${resource}/${id}`);
      return data;
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  }
};
