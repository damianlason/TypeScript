import { Field } from "../interfaces/Field.js";
import { FieldType } from "../enums/FieldType.js";

export class DateField implements Field {
  name: string;
  label: string;
  type: FieldType.Date;
  value: string;

  render: () => HTMLDivElement;

  constructor(name: string, label: string, value: string) {
    this.name = name;
    this.label = label;
    this.value = value;
  }
}
