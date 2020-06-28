import { Field } from "../interfaces/Field.js";
import { FieldType } from "../enums/FieldType.js";

export class FieldLabel {
  field: Field;

  render: () => HTMLLabelElement = (): HTMLLabelElement => {
    let label = document.createElement("label");
    label.innerText = this.field.label;
    label.setAttribute("for", this.field.name);

    if (this.field.type === FieldType.Checkbox) {
      label.className = "form-check-label";
    }

    return label;
  };

  constructor(field: Field) {
    this.field = field;
    return this;
  }
}
