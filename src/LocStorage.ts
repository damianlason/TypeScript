import { Storage } from "./interfaces/Storage";

export class LocStorage implements Storage {
  localStorage = [];
  saveDocument: () => {};
  loadDocument: () => {};
  getDocuments: () => {};
}
