const Promise = require('bluebird');
const IDAO = require('./IDAO.js');
const Tools = require('../utils/Tools');

/**
 * The class allowing business logic for a Model
 * @interface IService
 */
module.exports = class IService {

  constructor(transaction) {
    if (new.target === IService)
      throw new TypeError('Cannot construct Abstract instances directly');

    this.DAO = IDAO;
    this.transaction = null;
    this.isMaster = false;
    this.isEntryIdentified = false;
    this.methods = [];


    if (!transaction)
      this.isMaster = true;
    else
      this.transaction = transaction;
  }

  /**
   * Return an initialized instance of the service wanted creating transaction
   * @function getInstance
   * @memberof IService
   * @static
   * @param {Model<IService>} ModelService The service we want to instantiate, default to current
   * @return {Promise<IService>} A promise resolving the instance
   */
  static getInstance(ModelService) {
    let instance = null;

    ModelService = ModelService || this;
    instance = new ModelService();

    return instance.init();
  }

  /**
   * Initialise instance, its methods then returns it
   * @function init
   * @memberof Service
   * @return {Promise<IService>} Return the instance of the service
   */
  init() {
    let promise = Promise.resolve(this);

    if (!this.transaction) {
      promise = this._startTransaction()
        .then((transaction) => {
          this.transaction = transaction;

          return this;
        });
    }

    this.methods.forEach((method) => {
      const methodName = Tools.getFunctionName(method);

      this[methodName] = (...args) => {
        let isEntry = false;

        if (!this.isEntryIdentified) {
          isEntry = true;
          this.isEntryIdentified = true;
        }

        return this._before()
          .then(() => method.apply(this, args))
          .tap(this._after.bind(this, isEntry))
          .catch(this._break.bind(this, isEntry));
      };
    });

    return promise;
  }

  /**
   * Return an initialized instance of the service wanted passing transactions
   * @function getService
   * @memberof IService
   * @param {Model<IService>} ModelService The service we want to instantiate, default to current
   * @return {Promise<IService>} A promise resolving an instance of service
   */
  getService(ModelService) {
    let instance = null;

    ModelService = ModelService || this;
    instance = new ModelService(this.transaction);

    return instance.init();
  }

  /**
   * Return an initialized instance of the service wanted passing transactions
   * @function getDao
   * @memberof IService
   * @param {Model<DAO>} ModelDAO The service we want to instantiate, default to current
   * @return {Promise<DAO>} A promise resolving an instance of a Dao
   */
  getDao(ModelDAO) {
    let instance = null;

    ModelDAO = ModelDAO || this.DAO;
    instance = new ModelDAO(this.transaction);

    return Promise.resolve(instance);
  }

  _startTransaction() {
    return this.DAO.startTransaction();
  }

  _commitTransaction() {
    return this.DAO.commitTransaction(this.transaction);
  }

  _rollbackTransaction() {
    return this.DAO.rollbackTransaction(this.transaction);
  }

  _before() {
    return Promise.resolve();
  }

  _after(isEntry) {
    if (isEntry)
      return this._commitTransaction();

    return null;
  }

  _break(isEntry, err) {
    if (isEntry) {
      return this._rollbackTransaction()
      .then(() => {
        throw err;
      });
    }
    throw err;
  }
};