import { LocStorage } from "./LocStorage.js";

export class FormList {
  formListContainer = document.querySelector(
    "#form-list-container"
  ) as HTMLDivElement;
  formList: string[];
  locStorage: LocStorage;

  constructor() {
    this.locStorage = new LocStorage();
    this.formList = this.getFormList();
    this.render();
  }

  getFormList = (): string[] => {
    return this.locStorage.getForms();
  };

  getForm = (formId: string) => {
    return this.locStorage.loadForm(formId);
  };

  removeForm = (formId: string) => {
    this.locStorage.removeForm(formId);
  };

  render = () => {
    let table = document.createElement("table");
    table.className = "table";

    let tableHeader = document.createElement("thead");

    let tableHeaderRecord = document.createElement("tr");
    let tableHeaderRecordContent = document.createElement("th");
    tableHeaderRecordContent.innerText = "ID formularza";
    tableHeaderRecord.appendChild(tableHeaderRecordContent);

    tableHeaderRecordContent = document.createElement("th");
    tableHeaderRecordContent.innerText = "Operacje";
    tableHeaderRecord.appendChild(tableHeaderRecordContent);

    tableHeader.appendChild(tableHeaderRecord);
    table.appendChild(tableHeader);

    let tableBody = document.createElement("tbody");

    this.formList.forEach((formId) => {
      let tableBodyRecord = document.createElement("tr");
      let tableRecordData = document.createElement("td");
      tableRecordData.innerText = formId;
      tableBodyRecord.appendChild(tableRecordData);

      tableRecordData = document.createElement("td");
      tableRecordData.innerHTML =
        '<a class="btn btn-primary" href="new-document.html?id=' +
        formId +
        '" role="button">Wypełnij</a>';
      tableBodyRecord.appendChild(tableRecordData);

      tableRecordData = document.createElement("td");
      let removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "btn btn-danger";
      removeButton.innerText = "Usuń";

      removeButton.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.removeForm(formId);
        location.reload();
      });

      tableRecordData.appendChild(removeButton);
      tableBodyRecord.appendChild(tableRecordData);

      tableBody.appendChild(tableBodyRecord);
    });

    table.appendChild(tableBody);

    this.formListContainer.appendChild(table);

    let backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "btn btn-outline-danger";
    backButton.innerText = "Wstecz";

    this.formListContainer.appendChild(backButton);

    backButton.addEventListener("click", (e: Event) => {
      e.preventDefault();
      location.replace("/");
    });
  };
}

let formList = new FormList();
