// @ts-nocheck

import ServerException from "./Exceptions/serverException.js";
import { Model } from "sequelize";
import BaseDTO from "../../Shared/BaseObjects/baseDTO.js";
import uuidv4 from "uuid/v4";

/**
 *
 * @export
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * Creates an instance of BaseRepository.
   * @param  {import ('sequelize').Model} entityDAO
   * @memberof BaseRepository
   */

  constructor(entityDAO) {
    this.entityDAO = entityDAO;
    this.transaction = 0;
    this.context = {
      language: '',
      user: {
        id: 0,
        uid: undefined
      }
    };
  }
  toStr(val) {
    if (val == null) {
      return null;
    } else if (val == undefined) {
      return undefined;
    } else {
      return String(val);
    }
  }
  get userId() {
    return this.context.user.id
  }
  setContext({ context }) {
    if (context) {
      this.context = context;
    }
  }

  async setTransaction({ transaction }) {
    this.transaction = transaction;
  }

  getTran({ transaction }) {
    if (transaction != null) {
      return transaction;
    } else if (this.transaction != 0) {
      return this.transaction;
    }
    return null;
  }
  /**
   *
   * @param  {{ id : number}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  getById({ id, transaction }) {
    let db = this.entityDAO;
    return db.findOne(
      { where: { id: this.toStr(id) } },
      { transaction: this.getTran({ transaction }) }
    );
  }

  /**
   *
   *
   * @param {{uid:any  }}
   * @returns
   * @memberof BaseRepository
   */
  getByGuid({ uid, transaction }) {
    return this.entityDAO.findOne({
      where: { uid: this.toStr(uid) },
      transaction: this.getTran({ transaction })
    });
  }
  deleteByGuid({ uid, transaction }) {
    return this.entityDAO.destroy({
      where: { uid: this.toStr(model.uid) },
      transaction: this.getTran({ transaction })
    });
  }
  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  insert({ model, transaction }) {
    let item = model;
    if (!model.id) {
      item.id = uuidv4();
    }
    return this.entityDAO.create(item, {
      transaction: this.getTran({ transaction })
    });
  }
  /**
   *
   * @param  {{ model : BaseDTO}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  update({ model, transaction }) {
    return this.entityDAO.update(model, {
      where: { id: this.toStr(model.id) },
      transaction: this.getTran({ transaction })
    });
  }

  /**
   *
   * @param  {{ model : BaseDTO}}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  upsert({ model, transaction }) {
    return this.entityDAO.upsert(model, {

      transaction: this.getTran({ transaction })
    });
  }

  /**
   *
   * @param  {{ model : BaseDTO }}
   * @return {Promise<any>}
   * @memberof BaseRepository
   */
  // @ts-ignore
  delete({ model, transaction }) {
    return this.entityDAO.destroy({
      where: { id: this.toStr(model.id) },
      transaction: this.getTran({ transaction })
    });
  }
}
