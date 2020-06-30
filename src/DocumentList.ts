import { LocStorage } from "./LocStorage";

export class DocumentList {
  docList: string[];

  getDocumentList = (): void => {
    const locStorage: LocStorage = new LocStorage();
    this.docList = locStorage.getDocuments();
  };

  render: () => {};
}
