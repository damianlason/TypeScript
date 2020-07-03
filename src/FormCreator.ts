import { LocStorage } from "./LocStorage.js";
import { Field } from "./interfaces/Field.js";
import { DateField } from "./fields/DateField.js";
import { FieldType } from "./enums/FieldType.js";
import { CheckboxField } from "./fields/CheckboxField.js";
import { InputField } from "./fields/InputField.js";
import { TextAreaField } from "./fields/TextAreaField.js";
import { SelectField } from "./fields/SelectField.js";
import { EmailField } from "./fields/EmailField.js";

export class FormCreator {
  formListContainer = document.querySelector(
    "#form-list-container"
  ) as HTMLDivElement;
  formAddElementContainer = document.querySelector(
    "#add-new-field-container"
  ) as HTMLDivElement;
  elementList: Field[];
  locStorage: LocStorage;
  fieldTypes: FieldType[] = [
    FieldType.Text,
    FieldType.Email,
    FieldType.Textarea,
    FieldType.Date,
    FieldType.Textarea,
    FieldType.Checkbox,
    FieldType.Select,
  ];

  constructor() {
    this.locStorage = new LocStorage();
    this.elementList = [];
    this.render();
  }

  newForm = () => {};

  saveForm = () => {
    this.locStorage.saveForm(this.elementList);
    location.replace("form-list.html");
  };

  removeElement = (field: Field) => {
    this.elementList.forEach((item, index) => {
      if (item === field) this.elementList.splice(index, 1);
    });
    this.renderFormList();
  };

  addElement = (field: Field) => {
    this.elementList.push(field);
    this.render();
  };

  render = () => {
    this.renderFormList();
    this.renderAddElementForm();
  };

  renderAddElementForm = () => {
    this.formAddElementContainer.innerHTML = "";

    let form = document.createElement("form");

    let nameField = document.createElement("div");
    nameField.className = "form-group";

    let nameFieldlabel = document.createElement("label");
    nameFieldlabel.innerText = "Nazwa pola";
    nameFieldlabel.setAttribute("for", "fieldName");

    let input = document.createElement("input");
    input.className = "form-control";
    input.setAttribute("type", FieldType.Text);
    input.setAttribute("name", "fieldName");

    nameField.appendChild(nameFieldlabel);
    nameField.appendChild(input);
    form.appendChild(nameField);

    let labelField = document.createElement("div");
    nameField.className = "form-group";

    let labelFieldlabel = document.createElement("label");
    labelFieldlabel.innerText = "Etykieta pola";
    labelFieldlabel.setAttribute("for", "fieldLabel");

    let labelInput = document.createElement("input");
    labelInput.className = "form-control";
    labelInput.setAttribute("type", FieldType.Text);
    labelInput.setAttribute("name", "fieldLabel");

    labelField.appendChild(labelFieldlabel);
    labelField.appendChild(labelInput);
    form.appendChild(labelField);

    let selectField = document.createElement("div");
    selectField.className = "form-group";

    let selectFieldlabel = document.createElement("label");
    selectFieldlabel.innerText = "Typ pola";
    selectFieldlabel.setAttribute("for", "fieldType");

    let select = document.createElement("select");
    select.className = "form-control";
    select.setAttribute("name", "fieldType");

    this.fieldTypes.forEach((optionText) => {
      let option = document.createElement("option");
      option.innerText = optionText;
      select.appendChild(option);
    });

    selectField.appendChild(selectFieldlabel);
    selectField.appendChild(select);
    form.appendChild(selectField);

    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn btn-primary";
    submitButton.innerText = "Dodaj";

    form.appendChild(submitButton);

    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const field = this.createField(
        input.value,
        labelInput.value,
        <FieldType>select.value
      );
      this.addElement(field);
    });

    this.formAddElementContainer.appendChild(form);
  };

  renderFormList = () => {
    this.formListContainer.innerHTML = "";

    let table = document.createElement("table");
    table.className = "table";

    let tableHeader = document.createElement("thead");

    let tableHeaderRecord = document.createElement("tr");
    let tableHeaderRecordContent = document.createElement("th");
    tableHeaderRecordContent.innerText = "Pole";
    tableHeaderRecord.appendChild(tableHeaderRecordContent);

    tableHeaderRecordContent = document.createElement("th");
    tableHeaderRecordContent.innerText = "Operacje";
    tableHeaderRecord.appendChild(tableHeaderRecordContent);

    tableHeader.appendChild(tableHeaderRecord);
    table.appendChild(tableHeader);

    let tableBody = document.createElement("tbody");

    this.elementList.forEach((element) => {
      let tableBodyRecord = document.createElement("tr");
      let tableRecordData = document.createElement("td");
      tableRecordData.innerText = element.name + " - " + element.type;
      tableBodyRecord.appendChild(tableRecordData);

      tableRecordData = document.createElement("td");
      let removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "btn btn-danger";
      removeButton.innerText = "Usuń";

      removeButton.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.removeElement(element);
        this.render();
      });

      tableRecordData.appendChild(removeButton);
      tableBodyRecord.appendChild(tableRecordData);

      tableBody.appendChild(tableBodyRecord);
    });

    table.appendChild(tableBody);

    this.formListContainer.appendChild(table);

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.className = "btn btn-primary";
    submitButton.innerText = "Zapisz";

    submitButton.addEventListener("click", (e: Event) => {
      e.preventDefault();
      this.saveForm();
      location.replace("form-list.html");
    });

    this.formListContainer.appendChild(submitButton);

    let backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "btn btn-outline-danger";
    backButton.innerText = "Wstecz";

    backButton.addEventListener("click", (e: Event) => {
      e.preventDefault();
      location.replace("/");
    });

    this.formListContainer.appendChild(backButton);
  };

  createField = (name: string, label: string, type: FieldType): Field => {
    switch (type) {
      case FieldType.Checkbox:
        return new CheckboxField(name, label);
      case FieldType.Date:
        return new DateField(name, label);
      case FieldType.Email:
        return new EmailField(name, label);
      case FieldType.Select:
        return new SelectField(name, label);
      case FieldType.Text:
        return new InputField(name, label);
      case FieldType.Textarea:
        return new TextAreaField(name, label);
    }
  };
}

let formCreator = new FormCreator();
