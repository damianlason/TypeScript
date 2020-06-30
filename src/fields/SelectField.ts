import { Field } from "../interfaces/Field.js";
import { FieldType } from "../enums/FieldType.js";
import { FieldLabel } from "./FieldLabel.js";

export class SelectField implements Field {
  name: string;
  label: string;
  type: FieldType.Select;
  value: string;
  options: string[];

  constructor(
    name: string,
    label: string,
    options: string[],
    value: string = ""
  ) {
    this.name = name;
    this.label = label;
    this.value = value;
    this.type = FieldType.Select;
    this.options = options;
  }

  getValue = (): string => {
    const input: HTMLInputElement = document.querySelector(
      "[attribute='" + this.name + "']"
    ) as HTMLInputElement;
    this.value = input.value;
    return this.value;
  };

  render: () => HTMLDivElement = (): HTMLDivElement => {
    let selectField = document.createElement("div");
    selectField.className = "form-group";

    let label = new FieldLabel(this).render();

    let select = document.createElement("select");
    select.className = "form-control";
    select.setAttribute("name", this.name);
    select.value = this.value;

    let defaultOption = document.createElement("option");
    defaultOption.innerText = "Wybierz";

    select.appendChild(defaultOption);

    this.options.forEach((optionText) => {
      let option = document.createElement("option");
      option.innerText = optionText;
      select.appendChild(option);
    });

    selectField.appendChild(label);
    selectField.appendChild(select);

    return selectField;
  };
}
