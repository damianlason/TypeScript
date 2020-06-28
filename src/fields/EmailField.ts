import { Field } from "../interfaces/Field.js";
import { FieldType } from "../enums/FieldType.js";
import { FieldLabel } from "./FieldLabel.js";

export class EmailField implements Field {
  name: string;
  label: string;
  type: FieldType.Email;
  value: string;

  render: () => HTMLDivElement = (): HTMLDivElement => {
    let emailField = document.createElement("div");
    emailField.className = "form-group";

    let label = new FieldLabel(this).render();

    let input = document.createElement("input");
    input.className = "form-control";
    input.setAttribute("type", this.type);
    input.setAttribute("name", this.name);
    input.value = this.value;

    emailField.appendChild(label);
    emailField.appendChild(input);

    return emailField;
  };

  constructor(name: string, label: string, value: string = "") {
    this.name = name;
    this.label = label;
    this.value = value;
    this.type = FieldType.Email;
  }
}
