export class Router {
  constructor() {}

  static getParam(key: string) {
    const query: string = window.location.search.substr(
      0,
      window.location.search.length
    );
    const urlParams = new URLSearchParams(query);
    return urlParams.get(key);
  }
}
