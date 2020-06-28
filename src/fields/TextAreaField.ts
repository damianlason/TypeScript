import { Field } from "../interfaces/Field.js";
import { FieldType } from "../enums/FieldType.js";
import { FieldLabel } from "./FieldLabel.js";

export class TextAreaField implements Field {
  name: string;
  label: string;
  type: FieldType.Textarea;
  value: string;

  render: () => HTMLDivElement = (): HTMLDivElement => {
    let textAreaField = document.createElement("div");
    textAreaField.className = "form-group";

    let label = new FieldLabel(this).render();

    let input = document.createElement("textarea");
    input.className = "form-control";
    input.setAttribute("rows", "5");
    input.setAttribute("name", this.name);

    textAreaField.appendChild(label);
    textAreaField.appendChild(input);

    return textAreaField;
  };

  constructor(name: string, label: string, value: string = "") {
    this.name = name;
    this.label = label;
    this.value = value;
    this.type = FieldType.Textarea;
  }
}
