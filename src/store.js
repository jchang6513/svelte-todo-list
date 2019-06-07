export default class Store {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static isExist(key) {
    return localStorage.getItem(key) ? true : false;
  }
}
