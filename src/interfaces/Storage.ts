export interface Storage {
  saveDocument: (formData: any, formId: string) => string;
  loadDocument: (docId: string) => any;
  getDocuments: () => string[];
}
