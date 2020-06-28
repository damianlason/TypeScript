import { Storage } from "./interfaces/Storage.js";

export class LocStorage implements Storage {
  constructor() {
    this.initDocList();
  }

  saveDocument = (formData: FormData): string => {
    const docId: string = this.generateStorageId();
    let formDataToSave = this.prepareFormData(formData);

    this.addToDocList(docId);
    localStorage.setItem(docId, formDataToSave);

    return docId;
  };

  loadDocument = (docId: string) => {
    return localStorage.getItem(docId);
  };

  getDocuments = (): string[] => {
    return JSON.parse(localStorage.getItem("docList")!);
  };

  private addToDocList = (docId: string): void => {
    let docList: string[] = JSON.parse(localStorage.getItem("docList")!);
    docList.push(docId);
    localStorage.setItem("docList", JSON.stringify(docList));
  };

  private initDocList = (): void => {
    if (localStorage.getItem("docList") === null) {
      localStorage.setItem("docList", JSON.stringify([]));
    }
  };

  private generateStorageId = (): string => {
    return "document-" + Date.now();
  };

  private prepareFormData = (formData: FormData): string => {
    let formDataToSave: {
      [key: string]: any;
    } = {};

    formData.forEach((value, key) => {
      formDataToSave[key] = value;
    });

    return JSON.stringify(formDataToSave);
  };
}
