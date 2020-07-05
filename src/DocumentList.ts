import { LocStorage } from "./LocStorage.js";

export class DocumentList {
  docListContainer = document.querySelector(
    "#doc-list-container"
  ) as HTMLDivElement;
  docList: string[];
  locStorage: LocStorage;

  constructor() {
    this.locStorage = new LocStorage();
    this.docList = this.getDocumentList();
    this.render();
  }

  getDocumentList = (): string[] => {
    return this.locStorage.getDocuments();
  };

  getDocument = (docId: string) => {
    return this.locStorage.loadDocument(docId);
  };

  removeDocument = (docId: string) => {
    this.locStorage.removeDocument(docId);
  };

  render = () => {
    let table = document.createElement("table");
    table.className = "table";

    let tableHeader = document.createElement("thead");

    let tableHeaderRecord = document.createElement("tr");
    let tableHeaderRecordContent = document.createElement("th");
    tableHeaderRecordContent.innerText = "ID dokumentu";
    tableHeaderRecord.appendChild(tableHeaderRecordContent);

    tableHeaderRecordContent = document.createElement("th");
    tableHeaderRecordContent.innerText = "Operacje";
    tableHeaderRecord.appendChild(tableHeaderRecordContent);

    tableHeader.appendChild(tableHeaderRecord);
    table.appendChild(tableHeader);

    let tableBody = document.createElement("tbody");

    this.docList.forEach((docID) => {
      let tableBodyRecord = document.createElement("tr");
      let tableRecordData = document.createElement("td");
      tableRecordData.innerText = docID;
      tableBodyRecord.appendChild(tableRecordData);

      tableRecordData = document.createElement("td");
      tableRecordData.innerHTML =
        '<a class="btn btn-primary" href="edit-document.html?docId=' +
        docID +
        '" role="button">Edytuj</a>';
      tableBodyRecord.appendChild(tableRecordData);

      tableRecordData = document.createElement("td");
      let removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "btn btn-danger";
      removeButton.innerText = "Usuń";

      removeButton.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.removeDocument(docID);
        location.reload();
      });

      tableRecordData.appendChild(removeButton);
      tableBodyRecord.appendChild(tableRecordData);

      tableBody.appendChild(tableBodyRecord);
    });

    table.appendChild(tableBody);

    this.docListContainer.appendChild(table);

    let backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "btn btn-outline-danger";
    backButton.innerText = "Wstecz";

    this.docListContainer.appendChild(backButton);

    backButton.addEventListener("click", (e: Event) => {
      e.preventDefault();
      location.replace("/");
    });
  };
}