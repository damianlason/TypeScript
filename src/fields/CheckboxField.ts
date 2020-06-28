import { Field } from "../interfaces/Field.js";
import { FieldType } from "../enums/FieldType.js";

export class CheckboxField implements Field {
  name: string;
  label: string;
  type: FieldType.Checkbox;
  value: boolean;

  render: () => HTMLDivElement = (): HTMLDivElement => {
    let checkboxField = document.createElement('div');
    checkboxField.className = 'form-group form-check';

    let label = document.createElement('label');
    label.innerText = this.label;
    label.className = 'form-check-label';
    label.setAttribute('for', this.name);

    let input = document.createElement('input');
    input.className = 'form-check-input';
    input.setAttribute('type', this.type);
    input.setAttribute('name', this.name);
    input.checked = this.value;

    checkboxField.appendChild(input);
    checkboxField.appendChild(label);

    return checkboxField;
};

  constructor(name: string, label: string, value: boolean = false) {
    this.name = name;
    this.label = label;
    this.value = value;
    this.type = FieldType.Checkbox;
  }
}
