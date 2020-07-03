import { Storage } from "./interfaces/Storage.js";
import { Form } from "./Form.js";
import { Field } from "./interfaces/Field.js";

export class LocStorage implements Storage {
  constructor() {
    this.initDocList();
    this.initFormList();
  }

  saveDocument = (formData: FormData): string => {
    const docId: string = this.generateStorageId();
    let formDataToSave = this.prepareFormData(formData);

    this.addToDocList(docId);
    localStorage.setItem(docId, formDataToSave);

    return docId;
  };

  saveForm = (fields: Field[]): string => {
    const formId: string = this.generateStorageId("form");
    let formToSave = this.prepareForm(fields);

    this.addToFormList(formId);
    localStorage.setItem(formId, formToSave);

    return formId;
  };

  editDocument = (docId: string, formData: FormData): string => {
    let formDataToSave = this.prepareFormData(formData);
    localStorage.setItem(docId, formDataToSave);

    return docId;
  };

  loadDocument = (docId: string) => {
    return localStorage.getItem(docId);
  };

  loadForm = (formId: string) => {
    return localStorage.getItem(formId);
  };

  getDocuments = (): string[] => {
    return JSON.parse(localStorage.getItem("docList")!);
  };

  getForms = (): string[] => {
    return JSON.parse(localStorage.getItem("formList")!);
  };

  removeDocument = (docId: string) => {
    this.removeFromDocList(docId);
    localStorage.removeItem(docId);
  };

  removeForm = (formId: string) => {
    this.removeFromFormList(formId);
    localStorage.removeItem(formId);
  };

  private addToDocList = (docId: string): void => {
    let docList: string[] = JSON.parse(localStorage.getItem("docList")!);
    docList.push(docId);
    localStorage.setItem("docList", JSON.stringify(docList));
  };

  private addToFormList = (formId: string): void => {
    let formList: string[] = JSON.parse(localStorage.getItem("formList")!);
    formList.push(formId);
    localStorage.setItem("formList", JSON.stringify(formList));
  };

  private removeFromDocList = (docId: string): void => {
    let docList: string[] = JSON.parse(localStorage.getItem("docList")!);
    this.removeFromArray(docList, docId);
    localStorage.setItem("docList", JSON.stringify(docList));
  };

  private removeFromFormList = (formId: string): void => {
    let formList: string[] = JSON.parse(localStorage.getItem("formList")!);
    this.removeFromArray(formList, formId);
    localStorage.setItem("formList", JSON.stringify(formList));
  };

  private removeFromArray = (array: string[], keyToRemove: string) => {
    array.forEach((item, index) => {
      if (item === keyToRemove) array.splice(index, 1);
    });
  };

  private initDocList = (): void => {
    if (localStorage.getItem("docList") === null) {
      localStorage.setItem("docList", JSON.stringify([]));
    }
  };

  private initFormList = (): void => {
    if (localStorage.getItem("formList") === null) {
      localStorage.setItem("formList", JSON.stringify([]));
    }
  };

  private generateStorageId = (type: string = "document"): string => {
    return type + "-" + Date.now();
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

  private prepareForm = (fields: Field[]): string => {
    let formToSave: {
      [key: string]: any;
    } = {};

    fields.forEach((value, key) => {
      formToSave[key] = value;
    });

    return JSON.stringify(formToSave);
  };
}
