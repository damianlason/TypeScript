export interface Storage {
  saveDocument: (formData: any) => string;
  loadDocument: (docId: string) => any;
  getDocuments: () => string[];
}
