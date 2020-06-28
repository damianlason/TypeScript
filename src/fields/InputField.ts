import { Field } from "../interfaces/Field.js";
import { FieldType } from "../enums/FieldType.js";
import { FieldLabel } from "./FieldLabel.js";

export class InputField implements Field {
  name: string;
  label: string;
  type: FieldType.Text;
  value: string;

  render: () => HTMLDivElement = (): HTMLDivElement => {
    let inputField = document.createElement("div");
    inputField.className = "form-group";

    let label = new FieldLabel(this).render();

    let input = document.createElement("input");
    input.className = "form-control";
    input.setAttribute("type", this.type);
    input.setAttribute("name", this.name);
    input.value = this.value;

    inputField.appendChild(label);
    inputField.appendChild(input);

    return inputField;
  };

  constructor(name: string, label: string, value: string = "") {
    this.name = name;
    this.label = label;
    this.value = value;
    this.type = FieldType.Text;
  }
}
