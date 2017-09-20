
module.exports = class Tools {

  constructor() {
    return this;
  }

  /**
   * Get the name of a named function
   * @memberof Tools
   * @param {function} fun The function we want to get the name from
   * @return {string} The name of the fucntion
   */
  static getFunctionName(fun) {
    let name = fun.toString();

    name = name.substr('function '.length);
    name = name.substr(0, name.indexOf('('));

    return name;
  }
};