import { LocStorage } from "./LocStorage.js";

export class DocumentList {
  docListContainer = document.querySelector(
    "#doc-list-container"
  ) as HTMLDivElement;
  docList: string[];

  constructor() {
    this.getDocumentList();
    this.render();
  }

  getDocumentList = (): void => {
    const locStorage: LocStorage = new LocStorage();
    this.docList = locStorage.getDocuments();
  };

  render = () => {
    let table = document.createElement("table");
    table.className = "table";

    let tableHeader = document.createElement("thead");

    let tableHeaderRecord = document.createElement("tr");
    let tableHeaderRecordContent = document.createElement("th");
    tableHeaderRecordContent.innerText = "ID dokumentu";

    tableHeaderRecord.appendChild(tableHeaderRecordContent);
    tableHeader.appendChild(tableHeaderRecord);
    table.appendChild(tableHeader);

    let tableBody = document.createElement("tbody");

    this.docList.forEach((docID) => {
      let tableBodyRecord = document.createElement("tr");
      let tableRecordData = document.createElement("td");
      tableRecordData.innerText = docID;
      tableBodyRecord.appendChild(tableRecordData);
      tableBody.appendChild(tableBodyRecord);
    });

    table.appendChild(tableBody);

    this.docListContainer.appendChild(table);
  };
}

let docList = new DocumentList();