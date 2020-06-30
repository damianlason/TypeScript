import { Field } from "./interfaces/Field.js";
import { InputField } from "./fields/InputField.js";
import { EmailField } from "./fields/EmailField.js";
import { SelectField } from "./fields/SelectField.js";
import { CheckboxField } from "./fields/CheckboxField.js";
import { TextAreaField } from "./fields/TextAreaField.js";
import { DateField } from "./fields/DateField.js";
import { LocStorage } from "./LocStorage.js";

export class Form {
  formContainer = document.querySelector("#form-container") as HTMLDivElement;
  allFields: Field[];

  constructor() {
    this.allFields = [
      new InputField("nameField", "Imię"),
      new InputField("surnameField", "Nazwisko"),
      new EmailField("emailField", "Adres Email"),
      new SelectField("selectField", "Wybrany kierunek studiów", [
        "Kognitywistyka",
        "Logistyka",
        "Informatyka",
        "Filozofia",
      ]),
      new CheckboxField("checkboxField", "Czy preferujesz e-learning?"),
      new TextAreaField("textareaField", "Uwagi"),
      new DateField("dateField", "Data urodzin"),
    ];

    this.render();
  }

  getValue = () => {
    let form: HTMLFormElement = document.querySelector(
      "form"
    ) as HTMLFormElement;
    let formData: FormData = new FormData(form);

    const storage = new LocStorage();

    storage.saveDocument(formData);

    return formData;
  };

  render = () => {
    let form = document.createElement("form");

    this.allFields.forEach((field) => {
      form.appendChild(field.render());
    });

    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn btn-primary";
    submitButton.innerText = "Wyślij";

    form.appendChild(submitButton);

    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.getValue();
    });

    this.formContainer.appendChild(form);
  };
}

let form: Form = new Form();
