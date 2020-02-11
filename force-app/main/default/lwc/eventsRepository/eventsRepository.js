import Repository from "c/repository";
import Event from "c/event";
import ErrorHandler from "c/errorHandler";

const resource = "/events";

export default {
  /**
   * Returns Batch Job Record Events from a specific Batch Job Record
   * @returns {Promise<*>}
   */
  async getByBatchJobRecordId(id) {
    try {
      const data = await Repository.get(`${resource}/batchjobrecord/${id}`);
      return data.map(eventData => new Event(eventData));
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  /**
   * Returns failed Batch Job Record Events
   * @returns {Promise<*>}
   */
  async getFailedBatchJobRecordEvents() {
    try {
      const data = await Repository.get(`${resource}/failed`);
      return data.map(eventData => new Event(eventData));
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  /**
   * Returns expired Batch Job Record Events
   * @returns {Promise<*>}
   */
  async getExpiredBatchJobRecordEvents() {
    try {
      const data = await Repository.get(`${resource}/expired`);
      return data.map(eventData => new Event(eventData));
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  },

  /**
   * Returns active Batch Job Record Events
   * @returns {Promise<*>}
   */
  async getActiveBatchJobRecordEvents() {
    try {
      const data = await Repository.get(`${resource}/active`);
      return data.map(eventData => new Event(eventData));
    } catch (error) {
      throw ErrorHandler.message(error);
    }
  }
};
