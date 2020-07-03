import { Field } from "../interfaces/Field.js";
import { FieldType } from "../enums/FieldType.js";
import { FieldLabel } from "./FieldLabel.js";

export class CheckboxField implements Field {
  name: string;
  label: string;
  type: FieldType.Checkbox;
  value: boolean;

  constructor(name: string, label: string, value: boolean = false) {
    this.name = name;
    this.label = label;
    this.value = value;
    this.type = FieldType.Checkbox;
  }

  getValue = (): boolean => {
    const input: HTMLInputElement = document.querySelector(
      "input[name='" + this.name + "']"
    ) as HTMLInputElement;
    this.value = input.checked;
    return this.value;
  };

  render = (): HTMLDivElement => {
    let checkboxField = document.createElement("div");
    checkboxField.className = "form-group form-check";

    let label = new FieldLabel(this).render();

    let input = document.createElement("input");
    input.className = "form-check-input";
    input.setAttribute("type", this.type);
    input.setAttribute("name", this.name);
    input.checked = this.value;

    checkboxField.appendChild(input);
    checkboxField.appendChild(label);

    return checkboxField;
  };
}
