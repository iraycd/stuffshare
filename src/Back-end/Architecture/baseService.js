// @ts-nocheck
import UnitOfWork from "../unitOfWork.js";
import BaseRepository from "./baseRepository.js";
import ServerException from "./Exceptions/serverException.js";
import BaseDTO from "../../Shared/BaseObjects/baseDTO.js";

/**
 *
 * @export
 * @class BaseService
 */
export default class BaseService {
  /**
   * Creates an instance of BaseService.
   * @param  {{ unitOfWorkDI : UnitOfWork, repository:BaseRepository }}
   * @memberof BaseService
   */
  constructor({ unitOfWorkDI, repository }) {
    this.unitOfWorkDI = unitOfWorkDI;
    this.repository = repository;
    this.context = {
      user: {
        id: undefined,
        uid: undefined
      }
    };
  }
  async toJsonParse(response) {
    let result = await response;
    const flattenDataValues = ({ dataValues }) => {
      const flattenedObject = {};

      Object.keys(dataValues).forEach(key => {
        const dataValue = dataValues[key];

        if (
          Array.isArray(dataValue) &&
          dataValue[0] &&
          dataValue[0].dataValues &&
          typeof dataValue[0].dataValues === "object"
        ) {
          flattenedObject[key] = dataValues[key].map(flattenDataValues);
        } else if (
          dataValue &&
          dataValue.dataValues &&
          typeof dataValue.dataValues === "object"
        ) {
          flattenedObject[key] = flattenDataValues(dataValues[key]);
        } else {
          flattenedObject[key] = dataValues[key];
        }
      });

      return flattenedObject;
    };
    if (result == null) {
      return null;
    }
    return Array.isArray(result)
      ? result.map(flattenDataValues)
      : flattenDataValues(result);
  }
  get userId() {
    return this.context.user.id;
  }
  setContext(context) {
    if (context) {
      this.context = context;
      this.unitOfWorkDI.setContext({ context });
    }
    return this;
  }

  /**
   *
   * @param  {{ id:number }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async getById({ id }) {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].getById({ id }));
  }
  /**
   *
   *
   * @param {*} { uid }
   * @returns
   * @memberof BaseService
   */
  async getByGuid({ uid }) {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].getByGuid({ uid }));
  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async insert({ model }) {
    return await this.toJsonParse(this.unitOfWorkDI[this.repository].insert({ model }));
  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async update({ model }) {
    return await this.unitOfWorkDI[this.repository].update({ model });
  }

  /**
     *
     * @param  {{ model : BaseDTO }}
     * @return {Promise<any>}
     * @memberof BaseService
     */
  async upsert({ model }) {
    return await this.unitOfWorkDI[this.repository].upsert({ model });

  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseService
   */
  async delete({ model }) {
    return await this.unitOfWorkDI[this.repository].delete({ model });
  }

  async deleteByGuid({ uid, transaction }) {
    return await this.unitOfWorkDI[this.repository].deleteByGuid({ uid });
  }
}
