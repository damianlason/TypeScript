import { Storage } from "./interfaces/Storage.js";

export class LocStorage implements Storage {
  saveDocument = (formData: FormData): string => {
    const docId: string = this.generateStorageId();
    let formDataToSave = this.prepareFormData(formData);

    localStorage.setItem(docId, formDataToSave);

    return docId;
  };

  loadDocument = (docId: string) => {
    return localStorage.getItem(docId);
  };

  getDocuments: () => string[];

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
