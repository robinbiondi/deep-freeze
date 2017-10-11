const Promise = require('bluebird');
const Tools = require('../utils/Tools');

/**
 * The Class allowing to access object to a data
 * @interface IDAO
 */
module.exports = class IDAO {

  constructor (transaction) {
    this.transaction = transaction;
    this.Model = null;
    if (new.target === IDAO)
      throw new TypeError('Cannot construct Abstract instances directly');

    return this;
  }

  /**
   * Return an initialized instance of the dao wanted creating transaction
   * @function getInstance
   * @static
   * @memberof IDAO
   * @param {Model<IDAO>} ModelDao The dao we want to instantiate, default to current
   * @returns {IDAO} IDAO instan
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
   * @memberof IDAO
   * @return  {Promise<object>} A transaction object
   */
  static startTransaction() {
    console.warn('[DEEP-FREEZE IDAO.startTransaction] Function needs to be implemented in ', Tools.getClassName(this));

    return Promise.resolve();
  }

  /**
   * Commit a transaction.
   * @function commitTransaction
   * @memberof IDAO
   * @arg {object} transaction THe transavtion object
   * @return {Promise} Resolve or reject a promise
   */
  static commitTransaction(transaction) {
    console.warn('[DEEP-FREEZE IDAO.commitTransaction] Function needs to be implemented in ', Tools.getClassName(this));

    return Promise.resolve();
  }

  /**
   * Rollback a transaction.
   * @function rollbackTransaction
   * @memberof IDAO
   * @arg {object} transaction THe transavtion object
   * @return {Promise} Resolve or reject a promise
   */
  static rollbackTransaction(transaction) {
    console.warn('[DEEP-FREEZE IDAO.rollbackTransaction] Function needs to be implemented in ', Tools.getClassName(this));

    return Promise.resolve();
  }

};