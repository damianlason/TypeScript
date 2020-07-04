import { Field } from "./interfaces/Field.js";
import { InputField } from "./fields/InputField.js";
import { EmailField } from "./fields/EmailField.js";
import { SelectField } from "./fields/SelectField.js";
import { CheckboxField } from "./fields/CheckboxField.js";
import { TextAreaField } from "./fields/TextAreaField.js";
import { DateField } from "./fields/DateField.js";
import { LocStorage } from "./LocStorage.js";
import { FieldType } from "./enums/FieldType.js";
import { Router } from "./Router.js";
import { FormType } from "./enums/FormType.js";

export class Form {
  storage: LocStorage;
  formContainer = document.querySelector("#form-container") as HTMLDivElement;
  allFields: Field[];
  type: FormType;
  docId: string | null;
  formId: string | null;

  constructor() {
    this.storage = new LocStorage();
    this.docId = Router.getParam("docId");
    this.formId = Router.getParam("formId");
    this.allFields = [];

    if (this.formId !== null) {
      this.type = FormType.New;
      const loadedForm = JSON.parse(this.storage.loadForm(this.formId)!);

      for (const key in loadedForm) {
        if (loadedForm.hasOwnProperty(key)) {
          const element = loadedForm[key];
          this.allFields.push(
            this.createField(element.name, element.label, element.type)
          );
        }
      }
    }

    if (this.docId !== null) {
      this.type = FormType.Edit;
      const loadedDocument = JSON.parse(this.storage.loadDocument(this.docId)!);

      this.formId = loadedDocument.formId;
      delete loadedDocument.formId;

      const loadedForm = JSON.parse(this.storage.loadForm(this.formId!)!);

      for (const key in loadedForm) {
        if (loadedForm.hasOwnProperty(key)) {
          const element = loadedForm[key];
          this.allFields.push(
            this.createField(element.name, element.label, element.type)
          );
        }
      }

      this.allFields.forEach((field) => {
        field.value = loadedDocument[field.name];
      });
    }

    this.render();
  }

  getValue = (): FormData => {
    let form: HTMLFormElement = document.querySelector(
      "form"
    ) as HTMLFormElement;
    let formData: FormData = new FormData(form);

    this.allFields.forEach((field) => {
      if (field.type === FieldType.Checkbox) {
        formData.set(field.name, <string>field.getValue());
      }
    });

    return formData;
  };

  save = (docId: string | null) => {
    const formData: FormData = this.getValue();
    if (docId !== null) {
      this.storage.editDocument(docId, formData, this.formId);
    } else {
      this.storage.saveDocument(formData, this.formId);
    }
  };

  render = () => {
    let form = document.createElement("form");

    this.allFields.forEach((field) => {
      form.appendChild(field.render());
    });

    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn btn-primary";
    submitButton.innerText = "Zapisz";

    form.appendChild(submitButton);

    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.save(this.docId);
      location.replace("document-list.html");
    });

    let backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "btn btn-outline-danger";
    backButton.innerText = "Wstecz";

    form.appendChild(backButton);

    backButton.addEventListener("click", (e: Event) => {
      e.preventDefault();
      history.back();
    });

    this.formContainer.appendChild(form);
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

let form: Form = new Form();
