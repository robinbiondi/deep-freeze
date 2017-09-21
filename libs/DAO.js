const Promise = require('bluebird');
const tools = require('../utils/tools');

/**
 * The Class allowing to access object to a data
 * @interface DAO
 */
module.exports = class DAO {

  constructor (transaction) {
    this.transaction = transaction;
    if (new.target === DAO)
      throw new TypeError('Cannot construct Abstract instances directly');

    return this;
  }

  /**
   * Return an initialized instance of the dao wanted creating transaction
   * @function getInstance
   * @static
   * @memberof DAO
   * @param {Model<DAO>} ModelDao The dao we want to instantiate, default to current
   * @returns {DAO} DAO instan
   */
  static getInstance (ModelDao) {
    let instance = null;

    ModelDao = ModelDao || this;
    instance = new ModelDao();

    return instance.init();
  }

  /**
   * Start a transaction and return it as a promise.
   * @function startTransaction
   * @memberof DAO
   * @return  {Promise<object>} A transaction object
   */
  static startTransaction() {
    console.warn('[DEEP-FREEZE DAO.startTransaction] Function needs to be implemented in ', tools.getClassName(this));

    return Promise.resolve();
  }

  /**
   * Commit a transaction.
   * @function commitTransaction
   * @memberof DAO
   * @arg {object} transaction THe transavtion object
   * @return {Promise} Resolve or reject a promise
   */
  static commitTransaction(transaction) {
    console.warn('[DEEP-FREEZE DAO.commitTransaction] Function needs to be implemented in ', tools.getClassName(this));

    return Promise.resolve();
  }

  /**
   * Rollback a transaction.
   * @function rollbackTransaction
   * @memberof DAO
   * @arg {object} transaction THe transavtion object
   * @return {Promise} Resolve or reject a promise
   */
  static rollbackTransaction(transaction) {
    console.warn('[DEEP-FREEZE DAO.rollbackTransaction] Function needs to be implemented in ', tools.getClassName(this));

    return Promise.resolve();
  }

};